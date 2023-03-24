import { Box, Card, CardContent, Container, Paper } from '@material-ui/core'
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import style from './App.module.css'
import {
  user_DATA_LIST_ADDRESS,
  user_DATA_LIST_ABI,
} from './contracts/UserData'
import {
  SAVE_DATA_LIST_ADDRESS,
  SAVE_DATA_LIST_ABI
} from './contracts/SaveData'
import Add from './routes/Add'
import AddData from './routes/AddData'
import AddNakamotoData from './routes/AddNakamotoData'
import ShowData from './routes/ShowData'
import CryptoJS from 'crypto-js'
import sendToServerForSecondEncryption from './server/sendToServerForSecondEncryption'

function App() {
  const [web3, setweb3] = useState()
  const [account, setAccount] = useState('')
  const [UserDataList, setUserDataList] = useState([])
  const [UserDataContract, setUserDataContract] = useState([])
  const [saveDataContract, setSaveDataContract] = useState([])
  const [relatorioRegistros, setrelatorioRegistros] = useState([])
  const [NakamotoDataList, setNakamotoDataList] = useState([])
  const [userBio, setuserBio] = useState({
    id: '000001',
    name: 'Filipe Martins',
    birthDate: '25 jun 2002',
    phoneNumber: '(47) 99695-7685',
    _address: 'Rua José N Rocha, 29',
  })
  const [NakamotoData, setNakamotoData] = useState({
    NKMTID: 'NKMT-0001',
    tamanho: 'M',
    cor: 'Preto',
    modalidade: 'Internet',
    diseaseName: 'Camiseta',
    infos:
      'Peça autêntica Nakamoto, nova e com etiquetas.',
    diseaseStartedOn: '24 mar 2023',
  })

  useEffect(async () => {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')
    const network = await web3.eth.net.getNetworkType()
    const accounts = await web3.eth.requestAccounts()
    setAccount(accounts[0])
    console.log(accounts[0])
    const UserDataContractCopy = new web3.eth.Contract(
      user_DATA_LIST_ABI,
      user_DATA_LIST_ADDRESS,
    )
    const saveDataContractCopy = new web3.eth.Contract(
      SAVE_DATA_LIST_ABI,
      SAVE_DATA_LIST_ADDRESS,
    )
    setUserDataContract(UserDataContractCopy)
    setSaveDataContract(saveDataContractCopy)
    decryptEncryptedList(saveDataContractCopy)
    console.log(UserDataContractCopy)
    return () => {}
  }, [])

  const updateList = async (UserDataContract, acc) => {
    const senders = await UserDataContract.methods.senders(acc).call()
    let contagemRelatorios = senders.userCount

    console.log(contagemRelatorios)

    let relatorioRegistros = []

    for (let i = 0; i < contagemRelatorios; ++i) {
      console.log(await UserDataContract.methods.getusersList(i).call())
      let userBio = await UserDataContract.methods
        .getusersList(i)
        .call()
      let registroBlockchain = await UserDataContract.methods
        .nakamotoReports(parseInt(parseInt(userBio[4])))
        .call()

      let userBioMedObj = {
        name: userBio[0],
        birthDate: userBio[1],
        phoneNumber: userBio[2],
        _address: userBio[3],
        nakamotoReportNo: userBio[4],
        senderId: registroBlockchain.senderId,
        NKMTID: registroBlockchain.NKMTID,
        tamanho: registroBlockchain.tamanho,
        cor: registroBlockchain.cor,
        modalidade: registroBlockchain.modalidade,
        diseaseName: registroBlockchain.diseaseName,
        infos: registroBlockchain.infos,
        diseaseStartedOn: registroBlockchain.diseaseStartedOn,
      }
      relatorioRegistros.push(userBioMedObj)
    }
    setrelatorioRegistros(relatorioRegistros)
    console.log(senders, relatorioRegistros)
  }

  const decryptEncryptedList = async (saveDataContract) => {
    let relatorioRegistros = []

    const relatoriosTotais = await saveDataContract.methods.relatoriosTotais().call()
    for(let i = 0; i < relatoriosTotais; ++i)
    {
      const {
        hashOfOriginalDataString,
        secondTimeEncryptedString,
        sender,
        NKMTID
      } = await saveDataContract.methods.data(i).call()
      let firstCiphertext = sendToServerForSecondEncryption
              .decryptSecondCipherText(secondTimeEncryptedString, sender, NKMTID)
      let originalDataObject = JSON.parse(CryptoJS.AES.decrypt(firstCiphertext, hashOfOriginalDataString).toString(CryptoJS.enc.Utf8));
      console.log(originalDataObject)
      let rowData = {...originalDataObject.userBio, ...originalDataObject.NakamotoData}
      relatorioRegistros.push(rowData)
    }
    console.log(relatorioRegistros)
    setrelatorioRegistros(relatorioRegistros)
  }

  const addUpdateNakamotoData = () => {
    console.log(userBio, NakamotoData)

    let JSONStringData = JSON.stringify({userBio, NakamotoData})
    let hash = CryptoJS.SHA256(JSONStringData).toString(CryptoJS.enc.Hex)
    console.log(hash)
    let firstCiphertext = CryptoJS.AES.encrypt(JSONStringData, hash).toString();
    console.log(firstCiphertext)
    let secondCiphertext = sendToServerForSecondEncryption.encryptFirstCipherText(firstCiphertext, account, NakamotoData.NKMTID)
    console.log(secondCiphertext)
    saveDataContract.methods
      .saveData(secondCiphertext, hash, NakamotoData.NKMTID).send({ from: account})
      .once('receipt', receipt => {
        console.log('saved', receipt)

    setNakamotoData({...NakamotoData, NKMTID: 'NKMT0001'})
    decryptEncryptedList(saveDataContract)
      })
  }

  return (
    <Container maxWidth="md" className={style.container}>
      <Add
        userBio={userBio}
        setuserBio={(obj) => setuserBio(obj)}

        NakamotoData={NakamotoData}
        setNakamotoData={(obj) => setNakamotoData(obj)}
        addUpdateNakamotoData={addUpdateNakamotoData}
      />
      <ShowData relatorioRegistros={relatorioRegistros} />
    </Container>
  )
}

export default App

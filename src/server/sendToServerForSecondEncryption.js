import CryptoJS from 'crypto-js'

const sendToServerForSecondEncryption = {
    encryptFirstCipherText: (firstCipherText, sender, nakamotoReportId) => {
        let hash = CryptoJS.SHA256(firstCipherText).toString(CryptoJS.enc.Hex)
        let secondCipherText = CryptoJS.AES.encrypt(firstCipherText, hash).toString();
        localStorage.setItem(sender+nakamotoReportId, hash)
        return secondCipherText
    },
    decryptSecondCipherText: (secondCipherText, sender, nakamotoReportId) => {
        let hash = localStorage.getItem(sender + nakamotoReportId)
        let firstCipherText = CryptoJS.AES.decrypt(secondCipherText, hash).toString(CryptoJS.enc.Utf8);
        return firstCipherText
    }
}

export default sendToServerForSecondEncryption


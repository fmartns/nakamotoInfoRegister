export const user_DATA_LIST_ADDRESS = "0x4E631f0A4A0F19149adc12B96D8376e52F40Ea36"
export const user_DATA_LIST_ABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "contagemRelatorios",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x360d0f29"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "senders",
    "outputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "institutionName",
        "type": "string"
      },
      {
        "name": "institutionCode",
        "type": "string"
      },
      {
        "name": "userCount",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x982fb9d8"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "nakamotoReports",
    "outputs": [
      {
        "name": "senderId",
        "type": "address"
      },
      {
        "name": "NKMTID",
        "type": "string"
      },
      {
        "name": "tamanho",
        "type": "uint256"
      },
      {
        "name": "cor",
        "type": "uint256"
      },
      {
        "name": "modalidade",
        "type": "string"
      },
      {
        "name": "diseaseName",
        "type": "string"
      },
      {
        "name": "infos",
        "type": "string"
      },
      {
        "name": "diseaseStartedOn",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xa2df7d0b"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor",
    "signature": "constructor"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "userId",
        "type": "string"
      },
      {
        "name": "userName",
        "type": "string"
      },
      {
        "name": "birthDate",
        "type": "string"
      },
      {
        "name": "phoneNumber",
        "type": "string"
      },
      {
        "name": "_address",
        "type": "string"
      },
      {
        "name": "NKMTID",
        "type": "string"
      },
      {
        "name": "tamanho",
        "type": "uint256"
      },
      {
        "name": "cor",
        "type": "uint256"
      },
      {
        "name": "modalidade",
        "type": "string"
      },
      {
        "name": "diseaseName",
        "type": "string"
      },
      {
        "name": "infos",
        "type": "string"
      },
      {
        "name": "diseaseStartedOn",
        "type": "string"
      }
    ],
    "name": "addnakamotoReport",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x0060d399"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getusersList",
    "outputs": [
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xbeedbba9"
  }
]
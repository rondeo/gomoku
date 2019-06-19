import abi from './abi';
export default {
  ABI: abi,

  RPC: process.env.NODE_ENV === 'production' ?
    'https://testnet.tomochain.com' :
    'https://testnet.tomochain.com',

  RPC_READ: process.env.NODE_ENV === 'production' ?
    'https://testnet.tomochain.com' :
    'https://testnet.tomochain.com',

  RPC_READ_SOCKET: process.env.NODE_ENV === 'production' ?
    'wss://testnet.tomochain.com/ws' :
    'wss://testnet.tomochain.com/ws',

  NETWORK_ID: process.env.NODE_ENV === 'production' ? '89' : '89',
  ADDRESS: process.env.NODE_ENV === 'production' ?
    '0x6d88d78a7cb573b9f0ea23e67fee731194914c23' :
    '0x6d88d78a7cb573b9f0ea23e67fee731194914c23'
}

// export default {
//   ABI: abi,

//   RPC: process.env.NODE_ENV === 'production' ?
//     'https://rpc.tomochain.com' :
//     'https://testnet.tomochain.com',

//   RPC_READ: process.env.NODE_ENV === 'production' ?
//     'https://rpc.tomochain.com' :
//     'https://testnet.tomochain.com',

//   RPC_READ_SOCKET: process.env.NODE_ENV === 'production' ?
//     'wss://ws.tomochain.com' :
//     'wss://testnet.tomochain.com/ws',

//   NETWORK_ID: process.env.NODE_ENV === 'production' ? '88' : '89',
//   ADDRESS: process.env.NODE_ENV === 'production' ?
//     '0x305f55a3d55e01eed0b2b33fa1fd035ac5d086f7' :
//     '0xed98f0f52f2cdc14c37db8c028269f11848ba2fa'
// }

// export default {
//   ABI: abi,

//   RPC: process.env.NODE_ENV === 'production' ?
//     'https://rpc.tomochain.com' :
//     'http://localhost:8545',

//   RPC_READ: process.env.NODE_ENV === 'production' ?
//     'https://rpc.tomochain.com' :
//     'http://localhost:8545',

//   RPC_READ_SOCKET: process.env.NODE_ENV === 'production' ?
//     'wss://ws.tomochain.com' :
//     'wss://testnet.tomochain.com/ws',

//   NETWORK_ID: process.env.NODE_ENV === 'production' ? '88' : '89',
//   ADDRESS: process.env.NODE_ENV === 'production' ?
//     '0x305f55a3d55e01eed0b2b33fa1fd035ac5d086f7' :
//     '0x6d88d78a7cb573b9f0ea23e67fee731194914c23'
// }
import HDWalletProvider from 'truffle-hdwallet-provider';
import Web3 from 'web3';
import ContractGetFunctions from './contractGetFunctions';
import CONTRACT_CONFIG from './contractConfig';

var connectStatus = '';
var Contract = null;
var ContractAlias = null;
var web3 = null;
var currentNetwork = '';
var metamaskAccountInterval = '';
var address = '';
var alias = '0x0000000000000000000000000000000000000000';

function loginViaPrivateKey(privateKey, hdpath, cb) {
  if (privateKey) {
    try {
      var provider = new HDWalletProvider(privateKey, CONTRACT_CONFIG.RPC, 0, 1, false, hdpath);
      web3 = new Web3(provider);
      Contract = new web3.eth.Contract(CONTRACT_CONFIG.ABI, CONTRACT_CONFIG.ADDRESS);
      address = provider.addresses[0].toLowerCase();
      web3.eth.defaultAccount = address;
      connectStatus = 'privatekey';
      logon();
      cb && cb(null, address);
    }
    catch (ex) {
      console.log(ex);
      cb && cb('Cannot login with your private key');
    }
  }
}

function loginViaMetamask(cb) {
  if (typeof window.web3 == 'undefined') {
    return cb && cb('MetaMask is not installed')
  }

  web3 = new Web3(window.web3.currentProvider);
  Contract = new web3.eth.Contract(CONTRACT_CONFIG.ABI, CONTRACT_CONFIG.ADDRESS);

  window.web3.eth.getAccounts(function (err, accounts) {
    if (err) {
      return cb && cb('Have an error with Metamask')
    }
    else if (accounts.length === 0) {
      return cb && cb('Unlock Metamask, please')
    }
    connectStatus = 'metamask';
    address = accounts[0].toLowerCase();
    logon();
    cb && cb(null, address);

    metamaskAccountInterval = setInterval(() => {
      window.web3.eth.getAccounts((err, accounts) => {
        if (address && accounts.length > 0 && accounts[0] !== address) {
          address = accounts[0].toLowerCase()
          window.location.reload();
          logon();
          cb && cb(null, address);
        }
      });
    }, 1000);

    window.web3.version.getNetwork((err, netId) => {
      currentNetwork = netId;
      if (netId != CONTRACT_CONFIG.NETWORK_ID) {
        alert('Uknown network, change network to TomoChain, please');
      }
    });
  });
}

function loginViaTomoWallet(cb) {
  web3 = new Web3(window.web3.currentProvider);
  Contract = new web3.eth.Contract(CONTRACT_CONFIG.ABI, CONTRACT_CONFIG.ADDRESS);
  window.web3.eth.getAccounts(function (err, accounts) {
    connectStatus = 'tomowallet';
    address = accounts[0].toLowerCase();
    logon();
    cb && cb(null, address);
  });

  window.web3.version.getNetwork((err, netId) => {
    currentNetwork = netId;
    if (netId != CONTRACT_CONFIG.NETWORK_ID) {
      alert('Uknown network, change network to TomoChain, please');
    }
  });
}

function checkBeforeDoTransaction() {

  if (!address) {
    return 'Login to play plese';
  }

  if (!web3 || !Contract) {
    return 'ERROR'
  }

  if (connectStatus === 'address') {
    return "Cannot draw, login again please";
  }
  if (connectStatus === 'metamask') {
    if (currentNetwork != CONTRACT_CONFIG.NETWORK_ID) {
      return "Please change network on Metamask to TomoChain (mainnet)";
    }
  }

  if (connectStatus === 'tomowallet') {
    if (currentNetwork != CONTRACT_CONFIG.NETWORK_ID) {
      return "Please change network on TomoWallet to TomoChain (mainnet)";
    }
  }

  return "";
}

function logon() {
  console.log(address);
  var privateKey = '';
  if (localStorage.aliases) {
    var ALIASES = JSON.parse(localStorage.aliases);
    privateKey = ALIASES[address.toLowerCase()];
  }

  if (!privateKey) {
    var v = web3.eth.accounts.create();
    privateKey = v.privateKey;
    var ALIASES = JSON.parse(localStorage.aliases || '{}');
    ALIASES[address.toLowerCase()] = privateKey;
    localStorage.aliases = JSON.stringify(ALIASES);
  }
  var provider = new HDWalletProvider(privateKey.replace('0x', ''), CONTRACT_CONFIG.RPC, 0, 1, false);
  alias = provider.addresses[0];
  var alias_web3 = new Web3(provider);
  ContractAlias = new alias_web3.eth.Contract(CONTRACT_CONFIG.ABI, CONTRACT_CONFIG.ADDRESS);
}

export default {
  get: ContractGetFunctions,
  login: function (data, cb) {
    if (data.address) {
      connectStatus = 'address';
      address = data.address;
      cb && cb(null, address);
    }
    else if (data.privateKey) {
      loginViaPrivateKey(data.privateKey, data.hdpath + '/0', cb);
    }
    else if (data.metamask) {
      loginViaMetamask(cb);
    }
    else if (data.tomowallet) {
      loginViaTomoWallet(cb);
    }
  },
  logout: function () {
    address = '';
    currentNetwork = '';
    connectStatus = '';
    web3 = null;
    Contract = null;
    clearInterval(metamaskAccountInterval);
  },
  accountInfo() {
    return {
      address,
      connectStatus
    }
  },
  move: function (i, winLine, start) {
    var msg = checkBeforeDoTransaction();
    if (msg) {
      return new Promise((resolve, reject) => {
        reject(new Error(msg));
      })
    }
    else {
      return new Promise(async (resolve, reject) => {
        var ContractOfCall = Contract;
        var addressOfCall = address;
        if (alias != '0x0000000000000000000000000000000000000000') {
          var playerOfAlias = await ContractGetFunctions.alias(alias);
          if (playerOfAlias == address.toLowerCase()) {
            ContractOfCall = ContractAlias;
            addressOfCall = alias;
          }
        }
        return ContractOfCall.methods
          .move(i, winLine, start)
          .send({
            from: addressOfCall,
            to: CONTRACT_CONFIG.ADDRESS,
            gasLimit: web3.utils.toHex(1000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('0.25', 'gwei'))
          })
          .on('transactionHash', hash => resolve(hash))
          .on('error', ex => reject(ex));
      });
    }
  },
  joinGame: function(withPlayer, gameIndex, amount = 1) {
    var msg = checkBeforeDoTransaction();
    if (msg) {
      return new Promise((resolve, reject) => {
        reject(new Error(msg));
      })
    }
    else {
      return new Promise((resolve, reject) => {
        return Contract.methods
          .joinGame(alias, withPlayer, gameIndex)
          .send({
            from: address,
            to: CONTRACT_CONFIG.ADDRESS,
            value: web3.utils.toHex(web3.utils.toWei(amount.toString(), 'ether')),
            gasLimit: web3.utils.toHex(1000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('0.25', 'gwei'))
          })
          .on('transactionHash', hash => resolve(hash))
          .on('error', ex => reject(ex));
      });
    }
  },
  quitGame: function() {
    var msg = checkBeforeDoTransaction();
    if (msg) {
      return new Promise((resolve, reject) => {
        reject(new Error(msg));
      })
    }
    else {
      return new Promise((resolve, reject) => {
        return Contract.methods
          .quitGame()
          .send({
            from: address,
            to: CONTRACT_CONFIG.ADDRESS,
            gasLimit: web3.utils.toHex(1000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('0.25', 'gwei'))
          })
          .on('transactionHash', hash => resolve(hash))
          .on('error', ex => reject(ex));
      });
    }
  },
  claimFinishGame: function() {
    var msg = checkBeforeDoTransaction();
    if (msg) {
      return new Promise((resolve, reject) => {
        reject(new Error(msg));
      })
    }
    else {
      return new Promise(async (resolve, reject) => {
        var ContractOfCall = Contract;
        var addressOfCall = address;
        if (alias != '0x0000000000000000000000000000000000000000') {
          var playerOfAlias = await ContractGetFunctions.alias(alias);
          if (playerOfAlias == address.toLowerCase()) {
            ContractOfCall = ContractAlias;
            addressOfCall = alias;
          }
        }
        return ContractOfCall.methods
          .claimFinishGame()
          .send({
            from: addressOfCall,
            to: CONTRACT_CONFIG.ADDRESS,
            gasLimit: web3.utils.toHex(1000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('0.25', 'gwei'))
          })
          .on('transactionHash', hash => resolve(hash))
          .on('error', ex => reject(ex));
      });
    }
  },
  requestDrawGame: function() {
    var msg = checkBeforeDoTransaction();
    if (msg) {
      return new Promise((resolve, reject) => {
        reject(new Error(msg));
      })
    }
    else {
      return new Promise(async (resolve, reject) => {
        return Contract.methods
          .requestDrawGame()
          .send({
            from: address,
            to: CONTRACT_CONFIG.ADDRESS,
            gasLimit: web3.utils.toHex(1000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('0.25', 'gwei'))
          })
          .on('transactionHash', hash => resolve(hash))
          .on('error', ex => reject(ex));
      });
    }
  }
}
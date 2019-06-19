import Web3 from 'web3';
import CONTRACT_CONFIG from './contractConfig';
import BigNumber from 'bignumber.js';

var listener = {};
var LAST_BLOCK = null;
var listenLastBlockTimeout;

var socketEnd = () => {
  clearTimeout(listenLastBlockTimeout);
  listenNewBlock(0);
  restartReadWeb3();
}

var socketError = () => {
  restartReadWeb3();
}

var sockerConnect = () => {
  listener['SocketConnect'] = listener['SocketConnect'] || [];
  listener['SocketConnect'].forEach(f => f.func({}));
}

function setUpProvider(provider) {
  provider.on('connect', () => sockerConnect())
  provider.on('error', e => socketError(e));
  provider.on('end', e => socketEnd(e));
}

function restartReadWeb3() {
  var provider = new Web3.providers.WebsocketProvider(CONTRACT_CONFIG.RPC_READ_SOCKET);
  setUpProvider(provider);
  web3Socket.setProvider(provider);
  ContractSocket.events.allEvents().on('data', (evt) => processEvent(evt))
}

// var provider = new Web3.providers.WebsocketProvider(CONTRACT_CONFIG.RPC_READ_SOCKET);
// setUpProvider(provider);

// var web3Socket = new Web3(provider);
var web3 = new Web3(CONTRACT_CONFIG.RPC_READ);
var Contract = new web3.eth.Contract(CONTRACT_CONFIG.ABI, CONTRACT_CONFIG.ADDRESS);
// var ContractSocket = new web3Socket.eth.Contract(CONTRACT_CONFIG.ABI, CONTRACT_CONFIG.ADDRESS);
// ContractSocket.events.allEvents().on('data', (evt) => processEvent(evt))

function processEvent(e) {
  listener[e.event] = listener[e.event] || [];
  listener[e.event].forEach(f => {
    try {
      f.func(e.returnValues)
    }
    catch (ex) {
      console.log(ex);
    }
  });
}

var checkTransactionCount = {}
function checkTransactionReceipt(tx, cb) {
  checkTransactionCount[tx] = checkTransactionCount[tx] || new Date().getTime();
  if (new Date().getTime() - checkTransactionCount[tx] > 20000) {
    return cb(new Error('Timeout'));
  }
  web3.eth.getTransactionReceipt(tx, (err, v) => {
    if (err) cb(err)
    else if (v) cb(false, v);
    else if (!LAST_BLOCK) setTimeout(() => checkTransactionReceipt(tx, cb), 500);
    else {
      var timestamp = LAST_BLOCK.timestamp * 1000;
      var timeNextBlock = timestamp + 2500;
      var timeNow = new Date().getTime();
      var timeout = timeNextBlock - timeNow;
      if (timeout > 0) setTimeout(() => checkTransactionReceipt(tx, cb), timeout);
      else setTimeout(() => checkTransactionReceipt(tx, cb), 500);
    }
  });
}

async function listenNewBlock(blockNumber) {
  var block = await web3.eth.getBlock('latest');
  if (block.number > blockNumber) {
    LAST_BLOCK = block;
    processEvent({
      event: 'NEW_BLOCK',
      returnValues: block
    });
  }

  var timestamp = block.timestamp * 1000;
  var timeNextBlock = timestamp + 2500;
  var timeNow = new Date().getTime();
  var timeout = timeNextBlock - timeNow;
  if (timeout > 0) listenLastBlockTimeout = setTimeout(() => listenNewBlock(block.number), timeout);
  else listenLastBlockTimeout = setTimeout(() => listenNewBlock(block.number), 1000);
}

listenNewBlock(0);

export default {
  // Contract: ContractSocket,
  onListenEvent: function(method, func, keyFunc) {
    listener[method] = listener[method] || [];
    if (keyFunc) {
      var e = listener[method].find(e => e.keyFunc == keyFunc);
      if (e) {
        e.func = func;
      }
      else {
        listener[method].push({
          keyFunc: keyFunc,
          func: func
        });
      }
    }
    else {
      listener[method].push({
        keyFunc: listener[method].length,
        func: func
      });
    }
  },
  offListenEvent: function(method, func) {
    var keyFunc = typeof func === 'function' ? null : func;
    listener[method] = listener[method] || [];
    listener[method] = listener[method].filter(e => keyFunc ? e.keyFunc != keyFunc : e.func != func);
  },
  checkTx: function(hash) {
    return new Promise((resolve, reject) => {
      checkTransactionReceipt(hash, (error, tx) => {
        error ? reject(error) :
        (tx.status ? resolve(tx) : reject(new Error('Reverted the transaction')));
      });
    })
  },
  lastBlock: async function (fromCache) {
    if (fromCache && LAST_BLOCK) {
      return LAST_BLOCK;
    }
    else {
      return web3.eth.getBlock('latest');
    }
  },
  contractAddress() {
    return CONTRACT_CONFIG.ADDRESS;
  },
  balance: function (address) {
    return web3.eth.getBalance(address);
  },
  gameOf: function(address) {
    return Contract.methods.gameOf(address)
    .call()
    .then(game => {
      game.playerX = game.playerX.toLowerCase();
      game.playerO = game.playerO.toLowerCase();
      game.requestDraw = game.requestDraw.toLowerCase();
      game.moveOf = game.moveOf.toLowerCase();
      game.result = parseInt(game.result);
      game.movedAtBlock = parseInt(game.movedAtBlock);
      game.lastMove = parseInt(game.lastMove);
      game.index = parseInt(game.index);
      return game;
    })
  },
  alias: function(address) {
    return Contract.methods.aliasPlayer(address)
    .call()
    .then(address => address.toLowerCase())
    .catch(ex => '');
  }
}
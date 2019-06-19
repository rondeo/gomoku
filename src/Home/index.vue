<template>
  <div class="home">
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 15px;">
      <Header />
      <div v-if="address" style="text-align: right;">
        Your balance
        <div style="color: #FFC107">{{balance}} TOMO</div>
      </div>
      <div v-else>
        <button class="btn" @click="loginWithPrivateKey" style="font-size: 16px;">
          Login With Private Key
        </button>
      </div>
    </div>
    <!-- <div style="color: #F44336; font-size: 20px;">TESTNET VERSION</div> -->
    <div style="margin-top: 30px;">
      <div style="height: 150px;">
        <img src="./imgs/logo.png" width="150px" />
      </div>
    </div>
    <div style="margin-top: 20px; padding: 0 30px; color: #FFC107">Bet 1 TOMO, You will have a chance to earm 1.8 TOMO</div>
    <button @click="join" class="btn" style="margin-top: 30px;">
      Play with Other
    </button>
    <div>
      <button @click="openWithPlayerModal" class="btn-secondary">
        Play With Friend
      </button>
      <Modal v-if="showWithPlayerModal" title="Address/RoomID" @close="showWithPlayerModal = false">
        <div>
          <textarea class="txt" rows="2" v-model="withPlayer" placeholder="Enter address of your friend or RoomID" />
          <div v-if="errMsg" style="color: #F44336; padding: 5px 0;">{{errMsg}}</div>
          <button @click="joinWithFriend" class="modal-btn">
            OK, Let's Play
          </button>
          <div style="line-height: 17px; margin-top: 10px;">Leave empty if you want create a new room</div>
        </div>
      </Modal>

      <Modal v-if="!showWithPlayerModal && errMsg" title="Error" @close="errMsg = ''" :isError="true">
        <div>
          {{errMsg}}
        </div>
      </Modal>
    </div>
    <div class="chatbox">
      <div class="title" @click="scrollBottom">ChatBox</div>
      <div style="height: 300px;">
        <iframe v-if="address" :src="`https://anonymous-chat-group.herokuapp.com/gomoku-pigfarm#${address}|${address.slice(0, 5)}`" frameborder="0"></iframe>
      </div>
    </div>
  </div>
</template>

<script>

import Contract from '../contract';
import BigNumber from 'bignumber.js';
import Game from '../Game';
import Header from './Header';
import Modal from '../Modal';
import web3 from 'web3';

export default {
  name: 'App',
  components: {
    Game,
    Header,
    Modal
  },
  data() {
    return {
      balance: 0,
      address: '',
      withPlayer: '',
      errMsg: '',
      showWithPlayerModal: false,
      isJoining: false
    }
  },
  created() {
    if (Contract.accountInfo().address) {
      this.address = Contract.accountInfo().address
      this.init();
      return;
    }
    if (window.web3 && window.web3.currentProvider) {
      if (window.web3.currentProvider.isTomoWallet) {
        Contract.login({
          tomowallet: true
        }, (err, address) => {
          this.address = address;
          this.init();
        });
      }
      else if (window.web3.currentProvider.isMetaMask) {
        Contract.login({
          metamask: true
        }, (err, address) => {
          this.address = address;
          this.init();
        });
      }
    }
    else {
      var privateKey = location.search.replace('?', '');
      privateKey = privateKey || sessionStorage.privateKey;
      if (privateKey && privateKey.trim()) {
        if (privateKey.indexOf(' ') > 0) {
          Contract.login({
            privateKey,
            hdpath: "m/44'/889'/0'/0"
          }, (err, address) => {
            this.address = address;
            this.init();
          });
        }
        else {
          Contract.login({
            privateKey
          }, (err, address) => {
            this.address = address;
            this.init();
          });
        }
      }
    }
  },
  methods: {
    loginWithPrivateKey() {
      var privateKey = prompt('Enter your private key');
      if (privateKey && privateKey.trim()) {
        if (privateKey.indexOf(' ') > 0) {
          Contract.login({
            privateKey,
            hdpath: "m/44'/889'/0'/0"
          }, (err, address) => {
            this.address = address;
            sessionStorage.privateKey = privateKey;
            this.init();
          });
        }
        else {
          Contract.login({
            privateKey
          }, (err, address) => {
            this.address = address;
            this.init();
          });
        }
      }
    },
    scrollBottom() {
      window.scrollTo(0, 1000000);
    },
    openWithPlayerModal() {
      this.showWithPlayerModal = true;
      this.errMsg = '';
      this.withPlayer = ''
    },
    async getBalance() {
      var v = await Contract.get.balance(this.address)
      this.balance = BigNumber(v).div(10 ** 18).toFixed(2);
    },
    async init() {
      this.getBalance();
      var game = await Contract.get.gameOf(this.address);
      if (game.result == 0) {
        this.$router.push('/game');
      }
    },
    async joinWithFriend() {
      if (this.isJoining) return;
      try {
        var v = !this.withPlayer ? '' : this.withPlayer.trim();
        var roomId = 0;
        if (v) {
          if (!web3.utils.isAddress(v)) {
            roomId = parseInt(v);
            if (isNaN(roomId) ||
              roomId < 1 ||
              roomId.toString().length < v.length) {
                this.errMsg = "Invalid Address or RoomID";
                return;
              }
            v = '0x0000000000000000000000000000000000000000';
          }
        }
        else {
          v = '0x0000000000000000000000000000000000000001'
        }


        this.$Progress.start();
        this.showWithPlayerModal = false;
        this.isJoining = true;
        var hash = await Contract.joinGame(v, roomId, 1);
        await Contract.get.checkTx(hash);
        this.isJoining = false;
        this.$Progress.finish();
        this.$router.push('/game');
      }
      catch (ex) {
        this.isJoining = false;
        console.error(ex);
        var msg = ex.toString();
        this.$Progress.finish();

        if (msg.indexOf('timeout') >= 0) {
          window.location.reload();
          return;
        }

        if (msg.indexOf('User denied transaction signature.') == -1) {
          this.errMsg = 'Error, you can not join this game. Error details: ' + msg;
        }
      }
    },
    async join() {
      if (this.isJoining) return;
      try {
        this.$Progress.start();
        this.isJoining = true;
        var hash = await Contract.joinGame('0x0000000000000000000000000000000000000000', 0, 1);
        await Contract.get.checkTx(hash);
        this.isJoining = false;
        this.$Progress.finish();
        this.$router.push('/game');
      }
      catch (ex) {
        this.isJoining = false;
        console.error(ex);
        var msg = ex.toString();
        this.$Progress.finish();
        if (msg.indexOf('timeout') >= 0) {
          window.location.reload();
          return;
        }

        if (msg.indexOf('User denied transaction signature.') == -1) {
          this.errMsg = 'Error, you can not join this game. Error details: ' + msg;
        }
      }
    }
  }
}
</script>

<style scoped>
.home {
  background: rgba(255, 255, 255, 0.1);
}

@media(max-width: 767px) {
  .home {
    background: transparent;
  }
}
.btn {
  background: white;
  padding: 10px 20px;
  font-family: var(--font-serif);
  border-radius: 50px;
  font-size: 20px;
  color: #03A9F4;
  border: none;
  box-shadow: 1px 1px 30px rgba(0, 0, 0, 0.48);
  cursor: pointer;
  outline: none;
}

.btn:hover {
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.48);
}

.btn-secondary {
  background: transparent;
  padding: 15px 10px;
  font-family: var(--font-serif);
  border-radius: 50px;
  color: #ffffff;
  border: none;
  cursor: pointer;
  outline: none;
  font-size: 16px;
  align-items: center;
}

.btn-secondary:hover {
  text-shadow: 1px 1px 30px rgba(0, 0, 0, 0.48);
}

.txt {
  background: rgba(0, 0, 0, 0.05);
  padding: 10px;
  font-family: var(--font-serif);
  border-radius: 10px;
  font-size: 16px;
  color: #333333;
  border: 1px solid rgba(0, 0, 0, 0.2);
  outline: none;
  resize: none;
  width: 100%;
  text-align: center;
}

</style>

<template>
  <div class="move-of">
    <div style="width: 80px;" :style="{ opacity: game.moveOf == game.playerX ? 1 : 0.4 }">
      <img src="./imgs/x.svg" width="30px"/>
      <div>{{game.playerX == address ? 'You' : game.playerX == '0x0000000000000000000000000000000000000000' ? '&nbsp;' : game.playerX.slice(0, 7)}}</div>
    </div>
    <div>
      <div v-if="game.result == 0">
        <div v-if="showCountDown" class="animated flipInX">
          <div>{{status}}</div>
          <div class="count-down">{{game.countDown > 30 ? 30 : game.countDown}}s</div>
        </div>
        <div v-else class="animated status" :class="statusAnimated">{{status}}</div>
      </div>
      <div v-else class="animated bounceIn">
        <div style="font-size: 30px; line-height: 30px;">{{ game.result == 3 ? '😅' : (isWon ? '🏆' : '😭')}}</div>
        <div style="color: #00b500; font-size: 30px; line-height: 35px;">{{gameResult}}</div>
      </div>
    </div>
    <div style="width: 80px;" :style="{ opacity: game.moveOf == game.playerO ? 1 : 0.4 }">
      <img src="./imgs/o.svg" width="30px"/>
      <div>{{game.playerO == address ? 'You' : game.playerO == '0x0000000000000000000000000000000000000000' ? '&nbsp;': game.playerO.slice(0, 7)}}</div>
    </div>
  </div>
</template>

<script>
function address0(add) {
  return add == '0x0000000000000000000000000000000000000000'
};
export default {
  props: ["game", "statusAnimated", "showCountDown", 'address'],
  computed: {
    gameResult() {
      if (!address0(this.game.playerX) && !address0(this.game.playerO)) {
        switch (this.game.result) {
          case 1: return this.address == this.game.playerX ? 'You Won' : 'You Lost';
          case 2: return this.address == this.game.playerO ? 'You Won' : 'You Lost';
          case 3: return 'DRAW';
          default: '';
        }
      }
    },
    isWon() {
      if (this.game.result == 1) {
        if (this.game.playerX == this.address) {
          return true;
        }
        else {
          return false;
        }
      }
      else if (this.game.result == 2) {
        if (this.game.playerO == this.address) {
          return true;
        }
        else {
          return false;
        }
      }
    },
    status() {
      if (this.full) {
        if (this.game.moveOf == this.address) {
          return 'Your Turn';
        }
        else if (this.game.moveOf == this.game.playerX) {
          return "X's Turn";
        }
        else {
          return "O's Turn";
        }
      }
    },
    full() {
      return !address0(this.game.playerX) && !address0(this.game.playerO)
    }
  }
}
</script>

<style scoped>
  .move-of {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px 5px 20px;
    margin: 0px 5px 0px 5px;
    color: #333333;
    background: rgba(256, 256, 256, 0.8);
    border-radius: 5px 5px 0 0;
  }

  @media(max-width: 767px) {
    .move-of {
      margin: 0px 0px 0px 0px;
    }
  }

  .count-down {
    font-size: 45px;
    line-height: 35px;
    color: #00b500;
  }

  .status {
    color: #ff9800;
    font-size: 30px;
  }
</style>

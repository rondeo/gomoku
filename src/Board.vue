<template>
  <div class="board">
    <button v-for="(e, i) in board" :key="`${i}${e}`" @click="move(i)" class="square">
      <img v-if="e == 1" src="./Game/imgs/x.svg"/>
      <img v-if="e == 2" src="./Game/imgs/o.svg"/>
      <span style="font-size: 7px; position: absolute; top: 1px; left: 1px;">{{i}}</span>
    </button>
  </div>
</template>

<script>
import BigNumber from 'bignumber.js';
export default {
  data() {
    return {
      board: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  },
  methods: {
    move(i) {
      this.board[i] = 1;
      if (i - 44 >= 0) this.board[i - 44] = 2;
      this.board = [].concat(this.board);
      var v = [].concat(this.board).reverse().join('');
      console.log('0x' + BigNumber(v, 2).toString(16));
    }
  }
}
</script>

<style scoped>

.board {
  display: grid;
  grid-template-columns: repeat(15, 30px);
  grid-template-rows: repeat(15, 30px);
  margin-left: 1px;
  box-shadow: 0px 0px 10px #000000a8;
}

@media(max-width: 767px) {
  .board {
    grid-template-columns: repeat(15, calc(100vw / 15));
    grid-template-rows: repeat(15, calc(100vw / 15));
  }
}

.square {
  font-family: var(--font-mono);
  font-size: 3rem;
  font-weight: 900;
  border: none;
  border-right: 1px solid var(--color-bg);
  border-bottom: 1px solid var(--color-bg);
  background: var(--color-text);
  color: var(--color-bg);
  opacity: 0.9;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-out;
  position: relative;
}

.square img {
  width: 60%;
}

</style>

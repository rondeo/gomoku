<template>
  <!-- <div class="board"> -->
  <div class="board" :style="{
    'grid-template-columns': `repeat(${size}, 30px)`,
    'grid-template-rows': `repeat(${size}, 30px)`
  }">
    <button v-for="(e, i) in game.board" :key="`${i}${e}`" @click="() => $emit('move', i)"
      class="square" :style="{background: e && game.lastMove == i ? 'rgba(255, 255, 255, 0.8)' : ''}">
      <img v-if="e == 1" src="./imgs/x.svg"/>
      <img v-if="e == 2" src="./imgs/o.svg"/>
    </button>
  </div>
</template>

<script>
export default {
  props: ['game', 'size']
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

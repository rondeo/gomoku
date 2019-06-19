<template>
  <div class="navbar">
    <button @click="() => $emit('quit')" class="btn-back" style="">
      <img src="./imgs/left.svg" width="20px" style="margin-top: -2px;"/>&nbsp;&nbsp;<span>BACK</span>
    </button>
    <div style="color: #ffc107;">ROOM: {{game.index || 0}}</div>
    <button class="btn-chat" @click="() => $emit('chat')">
      <img src="./imgs/chat.svg" width="25px"/>
    </button>
  </div>
</template>

<script>
export default {
  props: ["game"]
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 0;
  font-size: 16px;
}

.btn-chat {
  cursor: pointer;
  padding: 5px 5px 2px 5px;
  border: none;
  background: #009688;
  border-radius: 5px;
  outline: none;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
}

.btn-back {
  background: transparent;
  padding: 15px 10px;
  font-family: var(--font-serif);
  border-radius: 50px;
  color: #ffffff;
  border: none;
  cursor: pointer;
  outline: none;
  margin-top: 0;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.btn-back:hover {
  text-shadow: 1px 1px 30px rgba(0, 0, 0, 0.48);
}
</style>

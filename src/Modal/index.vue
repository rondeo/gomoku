<template>
  <div class="modal animated fadeIn fast">
    <div class="modal-container">
      <button class="modal-close-btn" @click="() => $emit('close')" />
      <div v-if="title" class="modal-title" :style="{color: isError ? '#F44336' : ''}">
        {{title}}
      </div>
      <div class="modal-body" v-if="message">
        {{message}}
      </div>
      <div class="modal-body" v-else>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'message', 'isError']
}
</script>


<style scoped>
.modal {
  position: fixed;
  z-index: 99999;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.modal-container {
  width: 300px;
  max-width: calc(100% - 20px);
  margin: auto;
  margin-top: 150px;
  color: #333333;
  background: #ffffff;
  padding: 15px 15px;
  border-radius: 20px;
  position: relative;
}

.modal-close-btn {
  outline: none;
  position: absolute;
  top: 5px;
  right: 5px;
  border: none;
  background: transparent;
  width: 35px;
  height: 35px;
  cursor: pointer;
  opacity: 0.5;
  transition: 0.3s all;
}

.modal-close-btn::after {
  content: ' ';
  background: url(./imgs/close.svg);
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 7px;
  left: 7px;
}

.modal-close-btn:hover {
  opacity: 1;
}

.modal-title {
  color: #eeba27;
  margin-bottom: 10px;
  font-size: 25px;
}

.modal-btn {
  padding: 10px 10px;
  font-family: var(--font-serif);
  border-radius: 10px;
  color: #ffffff;
  border: none;
  cursor: pointer;
  outline: none;
  font-size: 16px;
  -webkit-box-align: center;
  width: 100%;
  background: #2196F3;
  -ms-flex-align: center;
  align-items: center;
  margin-top: 5px;
}
.modal-btn-secondary {
  padding: 10px 10px;
  font-family: var(--font-serif);
  border-radius: 10px;
  color: #333333;
  border: none;
  cursor: pointer;
  outline: none;
  font-size: 16px;
  -webkit-box-align: center;
  width: 100%;
  background: transparent;
  -ms-flex-align: center;
  align-items: center;
  margin-top: 5px;
}
</style>

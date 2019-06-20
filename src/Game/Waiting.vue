<template>
  <div :class="waitingAnimate" class="animated waiting">
    <div class="animated flip infinite" style="font-size: 50px;">🕒</div>
    <div >Wating for a player</div>
  </div>
</template>

<script>
export default {
  props: ["waitingAnimate"]
}
</script>

<style scoped>
  .waiting {
    width: 250px;
    position: fixed;
    top: 35%;
    left: calc(50% - 125px);
    background: #ffffff;
    color: #333333;
    padding: 15px;
    font-size: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
  }
</style>

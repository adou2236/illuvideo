<template>
  <transition name="fade">
    <div v-show="visible">{{message}}</div>
  </transition>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        message: ''
      }
    }
  }
</script>

<style scoped>
  div {
    white-space: nowrap;
    z-index: 3000;
    padding: 5px 20px;
    color: #fff;
    background: rgba(17, 17, 17, 0.7);
    border-radius: 5px;
    text-align: center;
    position: fixed;
    bottom: 15%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  /* vue动画过渡效果设置 */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

<template>
  <div :class="`text-base snackbar ${snackbar.color!==null ? 'snackbar_show' : ''}`" :style="`background-color: ${snackbar.color}`">
    {{snackbar.text}}
  </div>
</template>
<script>

  export default {
    computed: {
      snackbar() {
        return this.$store.getters.getSnackbar
      }
    }
  }

</script>
<style lang="scss">

.snackbar {
  position: fixed;
  right: 50px;
  bottom: 50px;
  z-index: 100;

  transition: all .5s;
  visibility: hidden;
  opacity: 0;

  border-radius: 5px;
  padding: 12px 16px;

  text-align: center;
  font-size: 18px;
  color: #fff;
}

.snackbar_show {
  visibility: visible;
  bottom: 30px;
  opacity: 1;
}

</style>

<template>
  <div id="app">
    <router-view />
    <Snackbar/>
  </div>
</template>
<script>
import Snackbar from '@/components/basic/snackbar.vue'
  export default {
    components: {
      Snackbar: Snackbar
    }
  }
</script>
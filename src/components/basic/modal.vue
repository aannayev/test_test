<template>
  <div v-if="value" @click="$emit('input', false)" class="modal">
    <div class="modal-box" @click.stop :style="`width: ${width}px; height: ${height}px;`">
      <slot/>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      value: Boolean,
      width: {
        type: String,
        default: '370'
      },
      height: {
        type: String,
        default: '300'
      },
    },
  }
</script>
<style lang="scss">
  .modal{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(1px);
    display: flex;
    align-items: center;
    justify-content: center;

    .modal-box{
      background-color: #FFFFFF;
      padding: 24px 32px 24px 32px;
      border-radius: 8px;
    }

  }
</style>
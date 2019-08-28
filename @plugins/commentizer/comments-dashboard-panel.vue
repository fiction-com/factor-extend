<template>
  <div class="comments-panel">
    Comments panel
  </div>
</template>
<script>
export default {
  props: {
    postId: { type: String, required: true },
  },
  computed: {
    post() {
      return this.$store.val(this.postId) || {}
    },
  }
}
</script>
<style lang="less">
.comments-panel {
}
</style>

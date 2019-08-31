<template>
  <div class="commentizer">
    <commentizerList :comments="comments" />
    <commentizerAdd />
  </div>
</template>

<script>
export default {
  props: {
    postId: { type: String, required: true }
  },
  computed: {
    comments () {
      return this.$store.val(this.postId) || {}
    }
  }
}
</script>

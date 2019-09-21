<template>
  <div class="commentizer">
    <commentizerList :comments="comments" />
    <commentizerEdit />
  </div>
</template>

<script>
export default {
  props: {
    postId: { type: String, required: true }
  },
  computed: {
    comments () {
      console.log(this)
      return this.$store.val(this.postId) || {}
    }
  }
}
</script>

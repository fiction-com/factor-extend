<template>
  <div class="commentizer">
    <h1>Commentizer</h1>
    <div v-if="!$lodash.isEmpty(comments)">
      {{comments}}
    </div>
    <div v-else>
      Not found.
    </div>
  </div>
</template>

<script>
export default {
  props: {
    postId: { type: String, required: true },
  },
  computed: {
    comments() {
      return this.$store.val(this.postId) || {}
    },
  },
}
</script>

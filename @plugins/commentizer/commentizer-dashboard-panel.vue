<template>
  <div class="commentizer-dashboard-panel">
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
      // return this.$store.val(this.postId) || {}
      return this.$commentizer
    },
  },
  mounted() {
    console.log(this);
  }
}
</script>

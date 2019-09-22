<template>
  <div class="commentizer">
    <commentizerList :comments="comments" />
    <commentizerAdd :linked-post-id="postId" />
  </div>
</template>

<script>
export default {
  props: {
    postId: { type: String, required: true }
  },
  data () {
    return {
      comments: {}
    }
  },
  async created() {
    this.comments = await this.$post.getPostIndex({
      field: "linkedPostId",
      permalink: this.postId,
      postType: "commentizer"
    }) || {}
  },
}
</script>

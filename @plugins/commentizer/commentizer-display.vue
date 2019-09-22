<template>
  <div>
    <h2 v-text="$setting.get('commentizer.displayText')" />
    <div v-if="!$lodash.isEmpty(comments)">
      <div v-for="(comment, i) in comments.posts" :key="`comment-${i}`">
        <div class="commentizer-content" v-text="comment.content" />
        <a :href="`mailto:${comment.email}`" v-text="comment.name" />
      </div>
    </div>
    <div v-else class="commentizer">
      <div class="commentizer-content">No comments yet.</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    postId: { type: String, required: true },
  },
  data: () => {
    return {
      comments: []
    }
  },
  computed: {
    post() {
      return this.$store.val(this.postId) || {}
    },
    // comments() {
    //   return this.post.commentizerComments
    // }
  },
  mounted() {
    this.comments = this.post.commentizerComments.map(async id => {
      return await this.$post.getPostById({ postType: "commentizer", _id: id })
    })
    console.log(this.comments)
  }
}
</script>

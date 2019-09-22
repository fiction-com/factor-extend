<template>
  <dashboard-pane>
    <!-- TODO: manipulate checked state -->
    <!-- <dashboard-input
    input="factor-input-checkbox"
    format="horizontal"
    label="Enabled"
    :checked="commentizerEnabled"
    @change="commentizerEnabled = commentizerEnabled"
    /> -->
    <label for="Enabled">Enabled</label>
    <input
      type="checkbox"
      name="Enabled"
      :checked="commentizerEnabled"
      @change="commentizerEnabled = !commentizerEnabled"
    >
    <commentizerDashboardList v-show="commentizerEnabled" :comments="comments" />
  </dashboard-pane>
</template>
<script>
export default {
  props: {
    postId: { type: String, required: true }
  },
  data () {
    return {
      commentizerEnabled: false,
      comments: {}
    }
  },
  computed: {
    post () {
      return this.$store.val(this.postId) || {}
    }
  },
  watch: {
    async commentizerEnabled(state) {
      this.post.commentizer.enabled = state
    },
  },
  async created() {
    this.commentizerEnabled = this.post.commentizer.enabled ? this.post.commentizer.enabled : false
    this.comments = await this.$post.getPostIndex({
      field: "linkedPostId",
      permalink: this.postId,
      postType: "commentizer"
    }) || {}
  },
}
</script>

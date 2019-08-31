<template>
  <!-- <dashboard-pane> -->
  <div>
    <dashboard-input v-model="commentizerEnabled" input="factor-input-checkbox" format="horizontal" label="Enabled" />
    <commentizerDashboardList v-if="commentizerEnabled" :list="comments" :meta="meta"/>
  </div>
  <!-- </dashboard-pane> -->
</template>
<script>
export default {
  props: {
    postId: { type: String, required: true },
  },
  data() {
    return {
      commentizerPost: null,
      commentizerEnabled: false,
      meta: {},
    }
  },
  computed: {
    comments() {
      return this.commentizerPost ? this.commentizerPost.settings.comments : []
    }
  },
  watch: {
    async commentizerEnabled(enabled) {
      // If no commentizer post exists for this postId, create one
      if (enabled && !this.commentizerPost) {
        this.commentizerPost = await this.$commentizer.save({
          enabled: true,
          linkedPostId: this.postId,
          comments: []
        })
        console.log('create', this.commentizerPost.settings)
      } else {
        this.commentizerPost = await this.$commentizer.save({
          _id: this.postId,
          enabled: false,
          linkedPostId: this.postId,
          comments: this.commentizerPost.settings.comments
        })
        console.log('update', this.commentizerPost.settings)
      }
    }
  },
  async mounted() {
    // Check if comments have been enabled
    this.commentizerPost = await this.$post.getSinglePost({ field: "settings.linkedPostId", permalink: this.postId })
    if (this.commentizerPost) {
      this.commentizerEnabled = this.commentizerPost.settings.enabled
    } else {
      this.commentizerEnabled = false
    }
  }
}
</script>

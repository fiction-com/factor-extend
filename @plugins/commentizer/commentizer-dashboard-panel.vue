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
    <commentizerDashboardList
      v-show="commentizerEnabled"
      :list="commentizerComments"
      :meta="meta"
    />
  </dashboard-pane>
</template>
<script>
export default {
  props: {
    postId: { type: String, required: true },
  },
  data() {
    return {
      commentizerComments: [],
      commentizerEnabled: false,
      commentizerPost: null,
      meta: {},
    }
  },
  watch: {
    async commentizerEnabled(state) {
      if (!this.commentizerPost) {
        this.commentizerPost = await this.createCommentizerPost()
      }

      if (this.commentizerPost.settings && this.commentizerPost.settings.enabled !== state) {
        // TODO: update post instead of create
        // await this.updateCommentizerPost({ enabled: state })
        this.commentizerPost.settings.enabled = false
      }
    },
    commentizerPost(post) {
      if (post && post.settings && post.settings.enabled) {
        this.commentizerEnabled = true
        this.commentizerComments = post.settings.comments || []
      }
    }
  },
  async mounted() {
    this.commentizerPost = await this.$post.getSinglePost({ field: "settings.linkedPostId", permalink: this.postId })
  },
  methods: {
    async createCommentizerPost() {
      this.commentizerPost = await this.$commentizer.save({
        postType: this.$commentizer.postType,
        post: {
          settings: {
            comments: [],
            enabled: true,
            linkedPostId: this.postId,
          }
        }
      })
    },
    async updateCommentizerPost(newSettings) {
      const oldSettings = this.commentizerPost ? this.commentizerPost.settings : {}
      const postId = { postId: oldSettings.postId }

      // TODO: update post instead of create
      // this.commentizerPost = await this.$commentizer.save({
      //   postType: this.$commentizer.postType,
      //   ...postId,
      //   post: {
      //     settings: {
      //       ...oldSettings,
      //       ...newSettings
      //     }
      //   },
      // })
    }
  },
}
</script>

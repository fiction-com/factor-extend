<template>
  <div class="single-entry">
    insert comment list here
    <!-- <div v-if="!$lodash.isEmpty(post)">
      <component
        :is="$setting.get(`blog.components.${comp}`)"
        v-for="(comp, i) in $setting.get('blog.layout.single')"
        :key="i"
        :post-id="post._id"
      />
    </div>
    <error-404 v-else /> -->
  </div>
</template>

<script>
export default {
  props: {
    postId: { type: String, required: true },
  },
  data() {
    return {}
  },
  mounted() {
    console.log(this.props)
  },
  computed: {
    post() {
      return this.$store.val(this.postId) || {}
    }
  },
}
</script>

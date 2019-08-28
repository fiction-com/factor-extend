<template>
  <div class="single-entry">
    add comment component
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
  computed: {
    post() {
      return this.$store.val(this.postId) || {}
    }
  },
}
</script>

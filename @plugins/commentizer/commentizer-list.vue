<template>
  <div>
    <h2 v-text="$setting.get('commentizer.listText')" />
    <div v-if="!$lodash.isEmpty(comments)">
      <pre v-for="(comment, i) in comments.posts" :key="`comment-${i}`">
        {{ comment.comment }},
        {{ comment.name }} - {{ comment.email }}
      </pre>
    </div>
    <div v-else>
      No comments yet.
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comments: { type: Object, required: true },
  }
}
</script>

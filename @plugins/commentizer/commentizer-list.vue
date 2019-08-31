<template>
  <div>
    <h2 v-text="$setting.get('commentizer.listText')" />
    <div v-if="!$lodash.isEmpty(comments)">
      <pre>
        {{ comments }}
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

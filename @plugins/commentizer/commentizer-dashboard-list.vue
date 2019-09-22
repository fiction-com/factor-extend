<template>
  <div>
    <dashboard-grid-controls>
      <dashboard-grid-actions :actions="controlActions" :loading="sending" @action="handleAction($event)" />
      <dashboard-grid-filter filter-id="status" :filter-tabs="tabs" />
    </dashboard-grid-controls>

    <dashboard-grid :structure="grid()" :rows="comments.posts" @select-all="selectAll($event)">
      <template #select="{value, row}">
        <input v-model="selected" type="checkbox" class="checkbox" label :value="row._id">
      </template>
      <template #listId="{row}">
        <factor-link :path="`${$route.path}/edit`" :query="{_id: row._id}">
          {{ row.title }}
        </factor-link>
      </template>
      <template #emailCount="{row}">
        {{ row.comments.posts.length }} / {{ row.comments.posts.filter(_ => _.verified).length }}
      </template>
    </dashboard-grid>
  </div>
</template>
<script>
export default {
  props: {
    postId: { type: String, required: true },
    postType: { type: String, default: "page" },
    loading: { type: Boolean, default: false },
    sending: { type: Boolean, default: false }
  },
  data() {
    return {
      loadingAction: false,
      selected: []
    }
  },
  computed: {
    post() {
      return this.$store.val(this.postId) || {}
    },
    comments() {
      return this.post.commentizerComments || []
    },
    meta() {
      return this.comments.meta || { total: 0 }
    },
    tableList() {
      return this.comments.posts.map(({ _id, createdAt, settings, content, email, name }) => {
        return {
          ...settings,
          content,
          createdAt,
          email,
          name,
          _id
        }
      })
    },
    tabs() {
      return [`all`, `trash`].map(key => {
        const count =
          key == "all" ?
          this.meta.total :
          this.$post.getStatusCount({ meta: this.meta, key })

        return {
          name: this.$utils.toLabel(key),
          value: key == "all" ? "" : key,
          count
        }
      })
    },
    controlActions() {
      return [
        { value: "trash", name: "Move to Trash" },
        { value: "delete", name: "Permanently Delete" }
      ].filter(_ => {
        return _.value != this.$route.query.status
      })
    }
  },
  methods: {
    handleAction(action) {
      this.$emit("action", {
        action,
        selected: this.selected
      })
    },
    selectAll(val) {
      this.selected = !val ? [] : this.comments.posts.map(_ => _._id)
    },
    fields(item, type) {
      const {
        _id,
        createdAt,
        content,
        email,
        name,
        ...rest
      } = item
      return Object.entries(rest).filter(([key, value]) => value)
    },
    postlink(postType, permalink, root = true) {
      return this.$post.getPermalink({
        postType,
        permalink,
        root
      })
    },
    grid() {
      return [{
          _id: "select",
          width: "40px"
        },
        {
          _id: "comment",
          name: "comment",
          width: "minmax(100px, 1fr)"
        },
        {
          _id: "name",
          name: "name",
          width: "170px"
        },
        {
          _id: "email",
          name: "email",
          width: "170px"
        }
      ]
    }
  }
}
</script>
<style lang="less">
.commentizer-dashboard-list-table {
  .dbt-body-row {
    font-size: 0.85em;
    .message {
      line-height: 1.4;
    }
    .contact-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 10px;
      .dat {
        strong {
          display: block;
        }
      }
    }
  }
}
</style>

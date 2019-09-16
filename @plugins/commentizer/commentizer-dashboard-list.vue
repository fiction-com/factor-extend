<template>
  <div>
    <dashboard-grid-controls>
      <dashboard-grid-actions
        :actions="controlActions"
        :loading="sending"
        @action="handleAction($event)"
      />
      <dashboard-grid-filter filter-id="status" :filter-tabs="tabs" />
    </dashboard-grid-controls>

    <dashboard-grid :structure="grid()" :rows="list" @select-all="selectAll($event)">
      <template #select="{value, row}">
        <input v-model="selected" type="checkbox" class="checkbox" label :value="row._id" >
      </template>
      <template #listId="{row}">
        <factor-link :path="`${$route.path}/edit`" :query="{_id: row._id}">{{ row.title }}</factor-link>
      </template>
      <template #emailCount="{row}">
        {{ row.list.length }} / {{ row.list.filter(_ => _.verified).length }}
      </template>
    </dashboard-grid>
  </div>
</template>
<script>
export default {
  props: {
    postType: { type: String, default: "page" },
    list: { type: Array, default: () => [] },
    meta: { type: Object, default: () => {} },
    loading: { type: Boolean, default: false },
    sending: { type: Boolean, default: false }
  },
  data() {
    return {
      loadingAction: false,
      selected: [],
    }
  },
  computed: {
    tableList() {
      return this.list.map(({ _id, createdAt, settings }) => {
        return {
          ...settings,
          createdAt,
          _id
        }
      })
    },
    tabs() {
      return [`all`, `trash`].map(key => {
        const count =
          key == "all"
            ? this.meta.total
            : this.$post.getStatusCount({
                meta: this.meta,
                key
              })

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
      this.$emit("action", { action, selected: this.selected })
    },
    selectAll(val) {
      this.selected = !val ? [] : this.list.map(_ => _._id)
    },
    fields(item, type) {
      const { message, createdAt, _id, ...rest } = item
      return Object.entries(rest).filter(([key, value]) => value)
    },
    postlink(postType, permalink, root = true) {
      return this.$post.getPermalink({ postType, permalink, root })
    },
    grid() {
      return [
        {
          _id: "select",
          width: "40px"
        },
        {
          id: "message",
          name: "message",
          width: "minmax(100px, 1fr)"
        },
        {
          _id: "info",
          name: "info",
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

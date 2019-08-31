<template>
  <div>
    <dashboard-table-controls
      v-bind="$attrs"
      :tabs="tabs"
      filter="status"
      :post-type="$commentizer.postType"
      :meta="meta"
      :actions="controlActions"
      :loading="sending"
      @action="$emit('action', { action: $event, selected })"
    />
    <dashboard-table
      class="commentizer-dashboard-list-table"
      :structure="tableStructure()"
      :row-items="tableList"
      @select-all="selectAll($event)"
    />
  </div>
</template>
<script>
export default {
  props: {
    list: { type: Array, default: () => [] },
    meta: { type: Object, default: () => {} },
  },
  data() {
    return {
      loading: false,
      loadingAction: false,
      selected: [],
      sending: false,
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
    tableStructure() {
      return [
        {
          column: "select",
          class: "col-fixed-40",
          mobile: "mcol-1"
        },
        {
          column: "message",
          class: "col-7",
          mobile: "mco-7"
        },
        {
          column: "info",
          class: "col-6",
          mobile: "mcol-8"
        },
        {
          column: "created",
          class: "col-2",
          mobile: "mcol-8"
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

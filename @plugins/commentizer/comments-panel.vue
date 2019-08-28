<template>
  <div class="edit-post-seo">
    Comments panel
    <!-- <dashboard-table-controls
      v-bind="$attrs"
      :tabs="tabs"
      filter="status"
      :post-type="$commentizer.postType"
      :meta="meta"
      :actions="controlActions"
      :loading="sending"
      @action="$emit('action',{action: $event, selected})"
    />
    <dashboard-table
      class="commentizer-table"
      :structure="tableStructure()"
      :row-items="tableList"
      @select-all="selectAll($event)"
    >
      <template slot-scope="{column, item, row}">
        <div v-if="column == 'select'">
          <input v-model="selected" type="checkbox" class="checkbox" label :value="row._id" >
        </div>
        <div v-if="column == 'info'" class="commentizer-info">
          <div v-for="([key, value], i) in fields(row, column)" :key="i" class="dat">
            <strong>{{ $utils.toLabel(key) }}:</strong>
            <i>{{ value }}</i>
          </div>
        </div>
        <div v-if="column == 'message'" class="commentizer-message">{{ row.message }}</div>

        <div v-if="column == 'created'" class="meta">{{ $time.niceFormat(row.createdAt) }}</div>
      </template>
    </dashboard-table> -->
  </div>
</template>
<script>
export default {
  // model: {
  //   prop: "post",
  //   event: "change"
  // },
  props: {
    postId: { type: String, required: true },
    title: { type: String, default: "" },
    list: { type: Array, default: () => [] },
    meta: { type: Object, default: () => {} },
    loading: { type: Boolean, default: false },
    sending: { type: Boolean, default: false }
  },
  data() {
    return {
      selected: [],
      loadingAction: false
    }
  },
  computed: {
    // post() {
    //   return this.$
    // },
    tableList() {
      console.log(this);
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
        // const count =
        //   key == "all"
        //     ? this.meta.total
        //     : this.$post.getStatusCount({
        //         meta: this.meta,
        //         key
        //       })

        return {
          name: this.$utils.toLabel(key),
          value: key == "all" ? "" : key,
          count: 0
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
.edit-post-seo {
  .search-preview {
    line-height: 1.5;
    padding: 0em 0 2em;
    .sup {
      opacity: 0.3;
      margin-bottom: 1em;
    }
    .headline {
      line-height: 1.3;
      color: #1b1ba8;
      font-size: 1.3em;
    }
    .desc {
      opacity: 0.7;
    }
    .plink {
      color: #0a6524;
    }
  }
}
</style>

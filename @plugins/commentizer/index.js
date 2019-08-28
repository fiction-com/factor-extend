export default Factor => {
  return new (class {
    constructor() {
      this.postType = "comments"
      this.filters()
    }

    filters() {
      // Factor.$filters.add("post-types", _ => {
      //   _.push({
      //     postType: this.postType,
      //     nameIndex: "Commentizer",
      //     nameSingle: "Comment",
      //     namePlural: "Comments",
      //     // listTemplate: () => import("./dashboard-list.vue"),
      //     add: false
      //   })
      //
      //   return _
      // })

      // Factor.$filters.add("post-schema", _ => {
      //   return {
      //     ..._,
      //     comments: { type: Factor.$mongo.objectIdType(), ref: "comments" }
      //   }
      // })

      // Factor.$filters.add("post-populated-fields", _ => {
      //   _.push({ field: "comments", depth: 20 })
      //   return _
      // })

      // global components
      Factor.$filters.add("components", components => {
        components["comments-list"] = () => import("./comments-list.vue")
        components["comment-add"] = () => import("./comment-add.vue")
        return components
      })

      // dashboard panel component
      Factor.$filters.add("post-edit-components", _ => {
        _.push({
          name: "Comments",
          component: () => import("./comments-dashboard-panel.vue")
        })

        return _
      })
    }

    async save(comments) {
      const post = { settings: comments }
      const saved = await Factor.$post.save({ post, postType: this.postType })
      return saved
    }

  })()
}

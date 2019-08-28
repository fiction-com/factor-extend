export default Factor => {
  return new (class {
    constructor() {
      this.postType = "comments"

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

      Factor.$filters.add("components", components => {
        components["comments-list"] = () => import("./comments-list.vue")
        return components
      })

      Factor.$filters.add("post-schema", _ => {
        return {
          ..._,
          comments: { type: Factor.$mongo.objectIdType(), ref: "comments" }
        }
      })

      Factor.$filters.add("post-edit-components", _ => {
        _.push({
          name: "Comments",
          component: () => import("./comments-panel.vue")
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

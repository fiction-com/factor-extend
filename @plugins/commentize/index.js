export default Factor => {
  return new (class {
    constructor() {
      this.postType = "comments"
      this.filters()
    }

    filters() {
      Factor.$filters.add("post-types", _ => {
        _.push({
          postType: this.postType,
          nameIndex: "Commentizer",
          nameSingle: "Comment",
          namePlural: "Comments",
          listTemplate: () => import("./dashboard-list.vue"),
          add: false
        })

        return _
      })

      Factor.$filters.add("post-schema", _ => {
        return {
          ..._,
          comments: { type: Factor.$mongo.objectIdType(), ref: "comments" }
        }
      })
    }

    async save(comments) {
      const post = { settings: comments }
      const saved = await Factor.$post.save({ post, postType: this.postType })
      return saved
    }

  })()
}

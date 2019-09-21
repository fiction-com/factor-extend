export default Factor => {
  return new(class {
    constructor() {
      // Add commentizer post type
      Factor.$filters.push("post-types", {
        postType: "commentizer",
        nameIndex: "Commentizer",
        nameSingle: "Comment",
        namePlural: "Comments",
        // showAdmin: false,
        add: false,
      })

      // Add dashboard component
      Factor.$setting.get("commentizer.postTypes").forEach(postType => {
        Factor.$filters.add("post-edit-components", components => {
          components.push({
            name: "commentizerDashboardPanel",
            component: Factor.$setting.get("commentizer.components.commentizerDashboardPanel"),
            postType: postType
          })
          return components
        })
      })

      // Add global components
      Factor.$filters.add("components", components => {
        components["commentizer"] = Factor.$setting.get("commentizer.components.commentizer")
        components["commentizerList"] = Factor.$setting.get("commentizer.components.commentizerList")
        components["commentizerEdit"] = Factor.$setting.get("commentizer.components.commentizerEdit")
        components["commentizerDashboardList"] = Factor.$setting.get("commentizer.components.commentizerDashboardList")
        return components
      })

      const comment = this.createComment({
        name: "foo",
        email: "foo@bar.com",
        comment: "foo was here!",
        postId: "5d85e0e1fb9be524ffefd609"
      })
    }

    async createComment(commentData) {
      return await Factor.$post.save({
        postType: "commentizer",
        post: {
          name: commentData.name || "",
          email: commentData.email || "",
          comment: commentData.comment || "",
          linkedPostId: commentData.postId
        }
      })
    }

  })()
}

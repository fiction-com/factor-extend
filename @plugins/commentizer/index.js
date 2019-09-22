export default Factor => {
  return new(class {
    constructor() {
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
        components["commentizerAdd"] = Factor.$setting.get("commentizer.components.commentizerAdd")
        components["commentizerDisplay"] = Factor.$setting.get("commentizer.components.commentizerDisplay")
        components["commentizerDashboardList"] = Factor.$setting.get("commentizer.components.commentizerDashboardList")
        return components
      })
    }

    async createComment(commentData) {
      return await Factor.$post.save({
        postType: "commentizer",
        post: {
          name: commentData.name || "",
          email: commentData.email || "",
          content: commentData.content || ""
        }
      })
    }
  })()
}

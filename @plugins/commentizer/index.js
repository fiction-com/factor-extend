export default Factor => {
  return new (class {
    constructor() {
      this.filters()
    }

    filters() {
      // Add commentizer post type
      Factor.$filters.push("post-types", {
        postType: "commentizer",
        nameIndex: "Commentizer",
        nameSingle: "Comments",
        namePlural: "All Comments",
        listTemplate: Factor.$setting.get("commentizer.components.commentizerDashboardList"),
        editTemplate: Factor.$setting.get("commentizer.components.commentizerDashboardEdit"),
        add: false,
        showAdmin: false
      })

      // Modify the schema for commentizer post types
      Factor.$filters.push("data-schemas", {
        name: "commentizer",
        schema: {
          email: { type: String, trim: true },
          name: { type: String, trim: true },
          body: { type: String }
        }
      })

      // Extend data schema for all post types to include a commentizer post type
      Factor.$filters.push("data-schemas", {
        name: Factor.$setting.get("commentizer.postTypes"),
        schema: {
          commentizer: [{ type: Factor.$mongo.objectIdType(), ref: "commentizer" }],
        },
        populatedFields: [
          { field: "commentizer", depth: 10 }
        ],
      })

      // Add Dashboard components
      Factor.$filters.add("post-edit-components", components => {
        components.push({
          name: "commentizerDashboardPanel",
          component: Factor.$setting.get("commentizer.components.commentizerDashboardPanel"),
          postType: Factor.$setting.get("commentizer.postTypes")
        })

        return components
      })

      // Add global components
      Factor.$filters.add("components", components => {
        components["commentizer"] = Factor.$setting.get("commentizer.components.commentizer")

        return components
      })
    }
  })()
}

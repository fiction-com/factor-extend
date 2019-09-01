export default Factor => {
  return new (class {
    constructor () {
      this.postType = "commentizer"
      this.filters()
    }

    filters () {
      // Add commentizer post type
      Factor.$filters.push("post-types", {
        postType: this.postType,
        nameIndex: "Commentizer",
        nameSingle: "Comments",
        namePlural: "All Comments",
        add: false,
        showAdmin: false
        // schema: {
        //   enabled: { type: Boolean },
        //   linkedPostId: { type: String, trim: true },
        //   comments: [{
        //     email: { type: String, trim: true },
        //     name: { type: String, trim: true },
        //     comment: { type: String }
        //   }]
        // },
      })

      // Extend data schema postTypes (in factor-settings.js) to include a commentizer post type
      // Factor.$filters.push("data-schemas", {
      //   name: Factor.$setting.get("commentizer.postTypes"),
      //   callback: schema => {
      //     schema.pre("save", async function (next) {
      //       const myPost = this
      //       this.settings = {}
      //       next()
      //     })
      //   },
      //   schema: {
      //     commentizer: { type: Factor.$mongo.objectIdType(), ref: "commentizer" }
      //   },
      //   populatedFields: [
      //     { field: "commentizer", depth: 10 }
      //   ]
      // })

      // Add Dashboard components
      Factor.$filters.add("post-edit-components", components => {
        components.push({
          name: "Comments",
          component: Factor.$setting.get("commentizer.components.commentizerDashboardPanel"),
          postType: Factor.$setting.get("commentizer.postTypes")
        })

        return components
      })

      // Add global components
      Factor.$filters.add("components", components => {
        components["commentizer"] = Factor.$setting.get("commentizer.components.commentizer")
        components["commentizerList"] = Factor.$setting.get("commentizer.components.commentizerList")
        components["commentizerEdit"] = Factor.$setting.get("commentizer.components.commentizerEdit")
        components["commentizerDashboardList"] = Factor.$setting.get("commentizer.components.commentizerDashboardList")

        return components
      })
    }

    async save (postData) {
      return await Factor.$post.save(postData)
    }
  })()
}

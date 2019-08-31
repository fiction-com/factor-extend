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
        // listTemplate: Factor.$setting.get("commentizer.components.commentizerDashboardList"),
        // editTemplate: Factor.$setting.get("commentizer.components.commentizerDashboardEdit"),
        add: false,
        // showAdmin: false
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

      // Factor.$filters.add('data-schema-page', schemaConfig => {
      //   // Add to schema
      //   schemaConfig.schema = {
      //     ...schemaConfig.schema,
      //     commentizer: {
      //       foo: "bar",
      //       comments: [],
      //     }
      //   }
      //
      //   // Add callback hooks (don't forget to call the original)
      //   const originalCallback = schemaConfig.callback
      //   schemaConfig.callback = _schema => {
      //     originalCallback(_schema)
      //     schema.pre("save", async function(next) {
      //       const myPost = this
      //       // modify document 'this' before it is saved (mongoose 'hook')
      //       next()
      //     })
      //
      //   }
      //
      //   return schemaConfig
      // })

      // Extend data schema postTypes (in factor-settings.js) to include a commentizer post type
      Factor.$filters.push("data-schemas", {
        name: Factor.$setting.get("commentizer.postTypes"),
        callback: schema => {
          schema.pre("save", async function (next) {
            const myPost = this
            this.settings = {}
            // this.settings = {
            //   enabled: true,
            //   linkedPostId: this.postId,
            //   comments: [{
            //     email: "foo@bar.baz",
            //     name: "Foo",
            //     comment: "Foo BAR Baz!"
            //   }]
            // }
            console.log(this)
            // modify document "this" before it is saved (mongoose "hook")
            next()
          })
        },
        schema: {
          commentizer: { type: Factor.$mongo.objectIdType(), ref: "commentizer" }
        },
        populatedFields: [
          { field: "commentizer", depth: 10 }
        ]
      })

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
        components["commentizerAdd"] = Factor.$setting.get("commentizer.components.commentizerAdd")
        components["commentizerDashboardList"] = Factor.$setting.get("commentizer.components.commentizerDashboardList")

        return components
      })

    }

    async save (postData) {
      const post = { settings: postData }
      const saved = await Factor.$post.save({ post, postType: this.postType })

      return saved
    }

    // async getComentizerByPostId(postId) {
    // }
  })()
}

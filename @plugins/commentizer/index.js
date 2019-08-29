export default Factor => {
  return new (class {
    constructor() {
      this.postType = "comments"
      this.filters()
    }

    filters() {
      // Factor.$filters.add("post-types", _ => {
      //   _.push({
      //     postType: "commentize",
      //     nameIndex: "Commentize",
      //     nameSingle: "Comment",
      //     namePlural: "Comments",
      //     add: true
      //   })
      //
      //   return _
      // })
      //
      // // Register a new data schema
      // Factor.$filters.push("data-schemas", {
      //    // Post Type Name: url friendly
      //   name: "page",
      //   // Mongoose Middleware/hooks https://mongoosejs.com/docs/middleware.html
      //   callback: schema => {
      //     // Mongoose hooks belong here. Actions that take place on save, update, etc.
      //     schema.pre("save", async function(next) {
      //       const myPost = this
      //       this.commentize = ["isPissingMeOff"]
      //       // modify document 'this' before it is saved (mongoose 'hook')
      //       next()
      //     })
      //   },
      //   // Mongoose Schema: https://mongoosejs.com/docs/guide.html
      //   schema: {
      //     commentize: [{ type: Factor.$mongo.objectIdType(), ref: "commentize" }],
      //   },
      //   // Schema options: https://mongoosejs.com/docs/guide.html#options
      //   options: {},
      //   populatedFields: [
      //     // List the schema reference fields that should be populated in addition to the post
      //     // For example, if your post connects with a "company" post type, it would retrieve those posts as well
      //     // the depth value helps Factor determine when to populate: 0 for no population, 100 for all. Default 20
      //     { field: "commentize", depth: 10 }
      //   ],
      // })

      // dashboard panel component
      Factor.$filters.add("post-edit-components", _ => {
        _.push({
          name: "Comments",
          component: () => import("./commentizer-dashboard-panel.vue")
        })

        return _
      })

      // global component
      Factor.$filters.add("components", components => {
        components["commentizer"] = () => import("./commentizer.vue")
        return components
      })
    }

    // async save(comments) {
    //   const post = { settings: comments }
    //   const saved = await Factor.$post.save({ post, postType: this.postType })
    //   return saved
    // }

  })()
}

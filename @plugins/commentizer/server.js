export default Factor => {
  return new(class {
    constructor() {
      // Add a new commentizer post type schema - NOT WORKING YET!
      Factor.$filters.push("data-schemas", {
        name: "commentizer",
        schema: {
          name: { type: String, trim: true },
          email: { type: String, trim: true },
          comment: { type: String, trim: true },
          linkedPostId: { type: String, trim: true }
        }
      })

      // Extend all postTypes from factor-settings to include a commentizer object
      Factor.$setting.get("commentizer.postTypes").forEach(postType => {
        Factor.$filters.add(`data-schema-${postType}`, schemaConfig => {
          schemaConfig.schema = {
            ...schemaConfig.schema,
            commentizer: {
              enabled: { type: Boolean, default: false },
              comments: [{
                type: Factor.$mongo.objectIdType(),
                ref: "commentizer"
              }]
            }
          }

          schemaConfig.populatedFields = [{ field: "commentizer.comments", depth: 10 }]

          return schemaConfig
        })
      })
    }
  })()
}

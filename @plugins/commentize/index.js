export default Factor => {
  return new (class {
    constructor() {
      Factor.$filters.add("post-types", _ => {
        _.push({
          postType: this.postType,
          nameIndex: "Comments",
          nameSingle: "Comment",
          namePlural: "Comments",
          // listTemplate: () => import("./dashboard-list.vue"),
          add: false
        })

        return _
      })
    }
  })()
}

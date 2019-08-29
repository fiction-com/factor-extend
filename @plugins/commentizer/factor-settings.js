module.exports.default = Factor => {
  return {
    commentizer: {
      components: {
        commentizer: () => import("./commentizer.vue")
      }
    }
  }
}

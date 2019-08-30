module.exports.default = Factor => {
  return {
    commentizer: {
      postTypes: ["page", "user"],
      components: {
        commentizer: () => import("./commentizer.vue"),
        commentizerDashboardPanel: () => import("./commentizer-dashboard-panel.vue"),
        commentizerDashboardList: () => import("./commentizer-dashboard-list.vue"),
        commentizerDashboardEdit: () => import("./commentizer-dashboard-edit.vue")
      }
    }
  }
}

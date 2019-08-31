module.exports.default = Factor => {
  return {
    commentizer: {
      postTypes: ["page"],
      components: {
        commentizer: () => import("./commentizer.vue"),
        commentizerList: () => import("./commentizer-list.vue"),
        commentizerAdd: () => import("./commentizer-add.vue"),
        commentizerDashboardPanel: () => import("./commentizer-dashboard-panel.vue"),
        commentizerDashboardList: () => import("./commentizer-dashboard-list.vue"),
        commentizerDashboardEdit: () => import("./commentizer-dashboard-edit.vue")
      },
      confirm: {
        title: "Comment Added",
        subTitle: "Thank you for submitting a comment."
      },
      inputFormat: "horizontal",
      listText: "Comments",
      submitText: "Submit Comment",
      layout: [
        {
          label: "Name",
          _id: "name",
          inputType: "text",
          required: true
        },
        {
          label: "Email",
          _id: "email",
          inputType: "email",
          required: true
        },
        {
          label: "Comment",
          _id: "comment",
          inputType: "textarea",
          required: true
        }
      ]
    }
  }
}

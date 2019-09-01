module.exports.default = Factor => {
  return {
    commentizer: {
      postTypes: ["page"],
      components: {
        commentizer: () => import("./commentizer"),
        commentizerList: () => import("./commentizer-list"),
        commentizerEdit: () => import("./commentizer-edit"),
        commentizerDashboardPanel: () => import("./commentizer-dashboard-panel"),
        commentizerDashboardList: () => import("./commentizer-dashboard-list"),
        commentizerDashboardEdit: () => import("./commentizer-dashboard-edit")
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

module.exports.default = Factor => {
  return {
    commentizer: {
      submitText: "Add Comment",
      inputFormat: "horizontal",
      confirm: {
        title: "Comment Added",
        subTitle: "Thank you for posting a comment."
      },
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
          label: "Message",
          _id: "message",
          inputType: "textarea"
        }
      ],
      components: {
        commentsList: () => import("./comments-list"),
        commentAdd: () => import("./comment-add")
      }
    }
  }
}

// This is the standard format for a Factor extension
// Use this file to add routes, global components, config, etc.
export default Factor => {
  return new (class {
    constructor() {
      // Here is where you can add routes/pages
      // Or use filters to control anything in your app

      Factor.$filters.push("content-routes", {
        path: "/",
        component: () => import("./index")
      })

      // TODO: override default page template (without a theme)
      // Factor.$filters.add("page-templates", _ => {
      //   return _.concat([
      //     {
      //       name: "Default",
      //       value: "default",
      //       component: () => import("./tpl-default")
      //     }
      //   ])
      // })

      // Factor.$filters.add("page-templates", _ => {
      //   return _.concat([
      //     {
      //       name: "Default",
      //       value: "default",
      //       component: () => import("./page-template-default")
      //     }
      //   ])
      // })
    }
  })()
}

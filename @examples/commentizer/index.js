export default Factor => {
  return new (class {
    constructor() {
      Factor.$filters.push("content-routes", {
        path: "/",
        component: () => import("./index.vue")
      })
    }
  })()
}

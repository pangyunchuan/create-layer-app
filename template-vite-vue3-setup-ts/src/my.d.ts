import 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
    // 是可选的
    redirectToIndex?: boolean
    // 每个路由都必须声明
    whiteList?: boolean
  }
}

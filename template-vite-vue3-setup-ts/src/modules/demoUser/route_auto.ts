import { RouteRecordRaw, RouterView } from "vue-router";

export default <RouteRecordRaw[]>[
  {
    name: "示例用户列表",
    path: "/demoUser/list",
    component: () => import("@/modules/demoUser/DemoUserList.vue")
  }
];

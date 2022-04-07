import { RouteRecordRaw } from "vue-router";

export default <RouteRecordRaw[]>[
  {
    name: "数据集列表_UI升级版",
    path: "/dataset/old/list",
    component: () => import("./List.vue"),
    children: [
      {
        name: "数据集编辑_UI升级版",
        path: "/dataset/old/edit",
        component: () => import("./edit/Index.vue")
      },
      {
        name: "数据集查看_UI升级版",
        path: "/dataset/old/show",
        component: () => import("./show/Index.vue")
      }
    ]
  }
];

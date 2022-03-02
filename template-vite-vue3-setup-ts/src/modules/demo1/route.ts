import {RouteRecordRaw, RouterView} from "vue-router";

export default <RouteRecordRaw[]>[
    {
        path: "/demo",
        name: "demoPageRoot",
        component: RouterView,
        children: [
            {
                path: 'list',
                name: "demoList",
                component: () => import("@/modules/demo1/views/List.vue")
            }
        ]

    }
]

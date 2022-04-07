import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { BaseRequest } from "layer-app";

const autoRouteFileMap = import.meta.globEager('/**/route_auto.ts')
const autoRoutes:RouteRecordRaw[] = []
for (const index in autoRouteFileMap) {
    autoRoutes.push(...autoRouteFileMap[index].default)
}

let router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [{
        path:'',
        redirect:{name:"数据集列表_UI升级版"}
    },...autoRoutes]
})

router.beforeEach(async (to, from, next) => {
    //取消上个路由未完成请求
    BaseRequest.cancelByMark();
    next();
})

export default router


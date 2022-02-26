import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import {BaseRequest} from "layer-app";

//路由拆分方案，统一查找所有路由文件，要求所有文件内容，从根路径开始定义
const autoRouteFileMap = import.meta.globEager('/**/route.ts')
const autoRoutes: RouteRecordRaw[] = []
for (const index in autoRouteFileMap) {
    autoRoutes.push(...autoRouteFileMap[index].default)
}

let router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [...autoRoutes]
})

router.beforeEach(async (to, from, next) => {
    //取消上个路由未完成请求
    BaseRequest.cancelByMark('default');
    next();
})

export default router


import ElPlusLoading from "./ElPlusLoading";
import VantToastLoading from "./VantToastLoading";
import {setLoadingMap, setRequestMap, setLoadingConfig} from "layer-app";
import MyRequest from "@/request/MyRequest";
//demoModel 仅供参考,不应再  layerAppStart中调用.
//这里配置项仅供参考,不符合要求,就删掉或自定义。


//设置 element-plus 加载类 默认配置设置,使用前,需要安装element-plus
ElPlusLoading.setDefaultConfig({
    target: 'body',
    text: '加载中',
    // lock: true,
    spinner: "el-icon-loading",
    // background: "transparent"
    background: "rgba(50, 50, 50, 0.5)"
})
//设置 vant.toast 加载类 默认配置设置,使用前,需要安装vant
VantToastLoading.setDefaultConfig({
    message: '加载中'
})

/**
 * 加载类配置，在请求类中被使用时，传入键名确定加载类，具体使用后续介绍
 * default 必须设置,其他可删除
 * 请注意 这两种ui加载效果，使用前需要安装ui库
 */
const loadingClassMap = {
    default: ElPlusLoading,
    vantToast: VantToastLoading,
    elPlus: ElPlusLoading
}
setLoadingMap(loadingClassMap)

//配置默认情况是否使用加载功能
setLoadingConfig({use: true})


/**
 * 请求类配置，在模型类中被使用时，传入键名确定请求类
 * default 必须设置,其他可删除
 */
const requestClassMap = {
    default: MyRequest
}
setRequestMap(requestClassMap)


//用于ts类型提示,使用ts时,必备。
export type loadingClassMapType = typeof loadingClassMap
export type requestClassMapType = typeof requestClassMap

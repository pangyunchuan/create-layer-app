import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver, VantResolver } from "unplugin-vue-components/resolvers";

//使用时,会导致 dev 启动耗时很久,暂不是使用
//自动导入 ui组件,使用前安装上面的 npm包
//注意 仅 会自动导入 template 中用到的 指定和 组件,但仅在ts/js 使用 需要手动引入样式,如下:
// import {ElLoading} from "element-plus";
// import "element-plus/es/components/loading/style/css"
// ElLoading.service();

export default [
    Components({
        dts: true,
        dirs:["empty"],
        resolvers: [ElementPlusResolver(),VantResolver()],
    })
]

import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import "../layerAppStart"
import "reset-css";
import "@/style/index.scss";

import * as ElIconComponents from '@element-plus/icons-vue'


const app = createApp(App).use(router)
app.mount("#app");


// 统一注册Icon图标
for (const componentName in ElIconComponents) {
    if (Reflect.has(ElIconComponents, componentName)) {
        app.component(componentName, (<any>ElIconComponents)[componentName])
    }
}

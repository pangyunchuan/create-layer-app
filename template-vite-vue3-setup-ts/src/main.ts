import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElPlus from "element-plus";
import 'element-plus/dist/index.css'
import "../layerAppStart";
import "@/assets/style/index";

const app = createApp(App).use(router).use(ElPlus);

import * as ElIconComponents from '@element-plus/icons-vue'
// 统一注册Icon图标
for (const componentName in ElIconComponents) {
  if (Reflect.has(ElIconComponents, componentName)) {
    app.component(componentName, (<any>ElIconComponents)[componentName])
  }
}

app.mount("#app");

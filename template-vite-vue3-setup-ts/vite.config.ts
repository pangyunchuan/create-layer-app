import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import dayjs from "dayjs";
import vitePluginZipDist from "vite-plugin-dist-zip";
import vitePluginMockjsServer from "vite-plugin-mockjs-server";


import { name } from "./package.json";

const daytime = dayjs().format("YYMMDD_HHmm");

const assetsDir = `${name}${daytime}`;

export default defineConfig(({ mode }) => {
  let env = loadEnv(mode, "");
  return {
    plugins: [
      vue({ reactivityTransform: true }),
      vitePluginMockjsServer({ mockDir: "mock" }),
      vitePluginZipDist({ zipName: name }),
    ],
    // 配置别名
    resolve: {
      alias: [
        {
          find: "root/",
          replacement: "/"
        },
        {
          find: "@/",
          replacement: "/src/"
        }
      ],
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
    },
    build: {
      assetsDir: assetsDir,
      // sourcemap:true,
      rollupOptions: {
        output: {
          assetFileNames: `${assetsDir}/[ext]/[name]-[hash][extname]`,
          chunkFileNames: `${assetsDir}/js/[name]-[hash].js`,
          //分解打包文件 根据需求设置
          // manualChunks: {
          //   vue: ["vue", "vue-router", "vuex"],
          //   echarts: ["echarts"],
          //   echartsGl: ["echarts-gl"]
          // }
        }
      }
    }
  };
});

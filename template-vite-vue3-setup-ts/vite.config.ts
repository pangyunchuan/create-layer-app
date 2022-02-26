import {defineConfig, loadEnv} from "vite";
import vue from "@vitejs/plugin-vue";

import VitePluginsAutoImport from "./buildConfig/VitePluginsAutoImport";
import VitePluginGzip from "./buildConfig/VitePluginGzip";
import dayjs from "dayjs";
import {name} from "./package.json";
import vitePluginZipDist from "vite-plugin-dist-zip";
import vitePluginMockjsServer from 'vite-plugin-mockjs-server'

const daytime = dayjs().format("YYMMDD_HHmm")
const assetsDir = `${name}${daytime}`;

export default defineConfig(({mode}) => {
    let env = loadEnv(mode, "");
    return {
        plugins: [
            vue({reactivityTransform: true}),
            //插件功能,不需要可自行删除
            vitePluginMockjsServer({mockDir: 'mock'}),
            vitePluginZipDist({zipName: name}),
            //gzip压缩
            // VitePluginGzip,
            ...VitePluginsAutoImport,


            //ie 11 支持，如需支持ie11 ，需要引入包 npm install @vitejs/plugin-legacy
            // legacy({
            //     targets: ['ie >= 11'],
            //     additionalLegacyPolyfills: ['regenerator-runtime/runtime']
            // })

        ],
        base: "",
        server: {
            host: "0.0.0.0",
            // proxy: {
            //     "^test/": {
            //         target: env.VITE_proxy,
            //         changeOrigin: true
            //     }
            // }
        },
        // 配置别名
        resolve: {
            alias: [
                {
                    find: "@/",
                    replacement: "/src/"
                },
                {
                    find: 'root/',
                    replacement: "/"
                },{
                    find: 'layerAppStart',
                    replacement: "/layerAppStart/"
                }
            ],
            extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
        },
        // css: {
        //   preprocessorOptions: {
        //     scss: {
        //       additionalData: `@import "@/assets/scss/base.scss";`
        //     }
        //   }
        // },
        build: {
            assetsDir: assetsDir,
            // sourcemap:true,
            rollupOptions: {
                output: {
                    assetFileNames: `${assetsDir}/[ext]/[name]-[hash][extname]`,
                    chunkFileNames: `${assetsDir}/js/[name]-[hash].js`,
                    //分解打包文件
                    manualChunks: {
                        vue: ["vue", "vue-router"],
                        dayjs: ["dayjs"]
                    }
                }
            }
        }
    };
});

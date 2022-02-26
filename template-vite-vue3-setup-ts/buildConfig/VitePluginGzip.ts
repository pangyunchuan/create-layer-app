import viteCompression from "vite-plugin-compression";

//生成gzip文件,默认不压缩
export default viteCompression({
    filter: /\.(js|mjs|json|css|png|jpg|jpeg)$/i, //要压缩的文件
    threshold: 5 * 1024, //超过该值得才压缩 （字节）
    disable: false, //是否停用压缩
    deleteOriginFile: false //压缩后是否删除源文件
})

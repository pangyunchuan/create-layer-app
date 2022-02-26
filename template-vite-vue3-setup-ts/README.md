## npm 项目准备
```text
1.执行如下命令将npm镜像源设置为淘宝
  npm config set registry https://registry.npm.taobao.org
2.安装项目依赖
  npm install  
```


### 项目 命令介绍
```text
1.启动开发无服务器     npm run dev
2.打包代码            npm run build
3.预览打包后的代码     npm run preview
```

########### 目录结构参考
```text
index.html   vite 入口文件 
vite.config.ts vite配置文件
mock  模拟接口 文件
buildConfig    vite打包配置拆分文件
layerAppStart   layer-app 启动文件  
public
src  项目文件
-- main.ts 入口文件
-- App.vue vue根组件
-- components  通用 ui 组件
-- router  路由
-- models 通用模型设置
-- modules  模块目录 一个模块是一个业务功能集合, 模块中可含有路由,模型,页面,组件等任意模块相关内容,甚至可以含有子模块
---- module1
------ components  模块通用组件
------ route.ts 模块路由
------ controllers  模块控制器
------ models  模块模型
------ services 模块服务层,根据情况增加
------ views 模块页面
------ helpers 模块辅助函数
-------- module1-1 子模块
----- module2 模块2



目录层级越高的,说明通用性越强
```







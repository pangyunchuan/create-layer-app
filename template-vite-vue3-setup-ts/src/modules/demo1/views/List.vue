<style lang="scss" scoped>
</style>
<template>
  <van-button type="primary">test</van-button>
  <el-icon color="red">
    <edit></edit>
  </el-icon>
  <el-table :data="c.list">
    <el-table-column label="ID" prop="id"></el-table-column>
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column label="创建日期" prop="created"></el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import Demo1Controller from "@/modules/demo1/controllers/Demo1Controller";
import {onBeforeRouteUpdate} from "vue-router";
import {BaseRequest} from "layer-app";


let c = $(Demo1Controller.use());
c.getList();

//在当前页注销时,解绑 控制器实例,以便于内存回收
//只在入口页面使用
//当多次调用时,仅在首次调用生效
c.destroyOnBeforeUnmount();


onBeforeRouteUpdate(() => {
  //取消 给定标记的未完成请求
  BaseRequest.cancelByMark('nowPageReqMark');
})

</script>


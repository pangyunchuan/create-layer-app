<style lang="scss" scoped>
</style>
<template>
  <van-button type="primary">test</van-button>
  <el-icon :size="size" color="red">
    <edit></edit>
  </el-icon>
  <el-table :data="c.list">
    <el-table-column label="ID" prop="id"></el-table-column>
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column label="创建日期" prop="created"></el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import DemoController from "@/modules/demo/controllers/DemoController";


let c = $(DemoController.use());
c.getList();

</script>


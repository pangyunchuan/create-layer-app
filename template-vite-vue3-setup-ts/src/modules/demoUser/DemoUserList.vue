<style lang="scss" scoped>

</style>
<template>
  <div>
    <div>
      <el-input v-model="demoUserListPage.params.keyword"></el-input>
      <el-button type="primary" @click="demoUserListPage.getData()"> 搜索</el-button>
    </div>
    <el-table :data="demoUserListPage.list">
      <el-table-column v-for="item in headers" :label="item" :prop="'data.'+item"/>
    </el-table>

    <el-pagination
        :total="demoUserListPage.total"
        v-model:current-page="demoUserListPage.params.page"
        :page-size="demoUserListPage.params.rows"
        layout="total,prev, pager, next, jumper"
        @current-change="demoUserListPage.getData"
        background
    />
  </div>

</template>

<script lang="ts" setup>
import demoUserListPage from "@/modules/demoUser/demoUserListPage";
import {computed} from "vue";
import DemoUserModel from "@/modules/demoUser/DemoUserModel";

function getData(p = demoUserListPage.params) {
  DemoUserModel.getList(p).then((r) => {
    demoUserListPage.list = r.models;
    demoUserListPage.total = r.total;
  })
}

// demoUserListPage.getData();
getData();

const headers = computed(() => {
  if (!demoUserListPage.list[0]) {
    return [];
  }
  return Object.keys(demoUserListPage.list[0].data)
})
</script>


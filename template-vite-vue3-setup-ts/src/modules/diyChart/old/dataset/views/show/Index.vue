<style lang="scss" scoped>

</style>
<template>
  <EditOrLookLayout
      :step="step"
      no-control
  >
    <template #title>数据集查看</template>
    <template #buttons>
      <el-button-group>
<!--        <el-button icon="collection" type="primary" @click="save">保存</el-button>-->
        <el-button icon="close" type="primary" @click="$router.back()">关闭</el-button>
      </el-button-group>
    </template>
  </EditOrLookLayout>
</template>

<script lang="ts" setup>
import EditOrLookLayout from "@/modules/diyChart/components/EditOrLookLayout.vue";
import datasetShowPage from "@/modules/diyChart/old/dataset/views/show/datasetShowPage";
import { markRaw, toRefs } from "vue";
import BaseInfo from "@/modules/diyChart/old/dataset/views/show/BaseInfo.vue";
import FieldInfo from "@/modules/diyChart/old/dataset/views/show/FieldInfo.vue";
import WhereInfo from "@/modules/diyChart/old/dataset/views/show/WhereInfo.vue";
import { useRoute } from "vue-router";

datasetShowPage.resetWhenUnmount();
const { step } = toRefs(datasetShowPage);
let stepV = $(step);
stepV.setNotShowState();

stepV.setItems(
    { text: "基础信息", icon: "document", component: markRaw(BaseInfo) },
    { text: "字段信息", icon: "setting", component: markRaw(FieldInfo) },
    { text: "过滤信息", icon: "filter", component: markRaw(WhereInfo) },
    // { text: "数据查询", icon: "list", component: markRaw(DataSearch) },
);

let id = <string | undefined>useRoute().query.id;

if (id) {
  datasetShowPage.setDatasetModel(id);
}
</script>


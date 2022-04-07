<style lang="scss" scoped>
</style>
<template>
  <EditOrLookLayout
      :step="step"
  >
    <template #title>数据集创建</template>
    <template #buttons>
      <el-button-group>
        <el-button icon="collection" type="primary" @click="save">保存</el-button>
        <el-button icon="close" type="primary" @click="back">关闭</el-button>
      </el-button-group>
    </template>
  </EditOrLookLayout>
</template>

<script lang="ts" setup>
import "@/assets/fonts/YouSheBiaoTiHei/ft_yhbth.css";
import { markRaw, toRefs, watch } from "vue";
import SetBaseInfo from "@/modules/diyChart/old/dataset/views/edit/SetBaseInfo.vue";
import SetTable from "@/modules/diyChart/old/dataset/views/edit/SetTable.vue";
import SetField from "@/modules/diyChart/old/dataset/views/edit/SetField.vue";
import SetDataFilter from "@/modules/diyChart/old/dataset/views/edit/SetDataFilter.vue";
import LookTable from "@/modules/diyChart/old/dataset/views/edit/LookTable.vue";
import dataSetEditPage from "@/modules/diyChart/old/dataset/views/edit/dataSetEditPage";
import { useRoute, useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import EditOrLookLayout from "@/modules/diyChart/components/EditOrLookLayout.vue";

dataSetEditPage.resetWhenUnmount();

const { step } = toRefs(dataSetEditPage);
let datasetModel = $toRef(dataSetEditPage, "datasetModel");
let stepV = $(step);

stepV.setItems(
    { text: "基础信息", icon: "document", component: markRaw(SetBaseInfo) },
    { text: "选择数据表", icon: "set-up", component: markRaw(SetTable) },
    { text: "字段设置", icon: "setting", component: markRaw(SetField) },
    { text: "数据过滤", icon: "filter", component: markRaw(SetDataFilter) },
    { text: "结果概览", icon: "list", component: markRaw(LookTable) }
);

const router = useRouter();
let id = <string | undefined>useRoute().query.id;

if (id) {
  dataSetEditPage.setDatasetModel(id).then(() => {
    dataSetEditPage.isModify = false;
  });
}

watch($$(datasetModel), () => {
  dataSetEditPage.isModify = true;
}, { deep: true });

function back() {
  if (!dataSetEditPage.isModify) {
    router.back();
    return;
  }
  ElMessageBox.confirm("确定放弃编辑?", {
    cancelButtonText: "取消",
    confirmButtonText: "确定放弃"
  }).then(() => {
    router.back();
  }).catch(() => {
  });
}

async function save() {
  if (!dataSetEditPage.isModify) {
    ElMessage.info({ message: "无修改,无需保存", showClose: true });
    return;
  }

  if (await stepV.checkAll()) {
    return dataSetEditPage.save().then(() => {
      ElMessage.success("数据已保存");
    });
  }
}

</script>


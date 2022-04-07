<style lang="scss" scoped>

</style>
<template>
  <DefaulTable height="100%" width="100%" :table-header="previewData.header" :table-data="previewData.rows" />
</template>

<script lang="ts" setup>
import dataSetEditPage from "@/modules/diyChart/old/dataset/views/edit/dataSetEditPage";
import {  reactive, toRefs, watchEffect } from "vue";
import { PreviewDataType } from "@/modules/diyChart/old/dataset/models/DatasetModel";
import DefaulTable from "@/modules/components/table/defaulTable.vue";
import { ElMessageBox } from "element-plus";
import { StepItem } from "@/modules/diyChart/components/step/StepMan";

const props = defineProps<{
  stepItem: StepItem
}>();

let { stepItem } = $(toRefs(props));

let previewData = reactive<PreviewDataType>({ header: [], rows: [] });
//查看当前步骤,且 已修改,且通过检测,提示确认保存数据
watchEffect(async () => {
  if (stepItem.isCurrent && dataSetEditPage.isModify && await dataSetEditPage.step.checkAll()) {
    ElMessageBox.confirm("预览数据前会保存修改,是否确认预览?", {
      confirmButtonText: "确认预览",
      cancelButtonText: "放弃预览"
    }).then(() => {
      dataSetEditPage.save()
    }).catch(() => {
      dataSetEditPage.step.backStep();
    });
  }
});

//修改后,清空数据
watchEffect(()=>{
  if(dataSetEditPage.isModify){
    previewData.rows = []
    previewData.header = []
  }
})

//查看该步骤且数据集存在且无修改 且 未获取预览数据  则获取数据
watchEffect(()=>{
  if(stepItem.isCurrent && dataSetEditPage.datasetId && !dataSetEditPage.isModify && !previewData.header.length ){
    dataSetEditPage.datasetModel.getPreviewData().then(r => {
      previewData.header = r.header;
      previewData.rows = r.rows;
    });
  }
})


</script>


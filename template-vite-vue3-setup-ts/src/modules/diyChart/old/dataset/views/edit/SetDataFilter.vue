<style lang="scss" scoped>
</style>
<template>
  <Scroll class="whereBox">
    <SqlWhere
        :sql-where-man="sqlWhereMan"
    />
  </Scroll>
</template>

<script lang="ts" setup>
import dataSetEditPage from "@/modules/diyChart/old/dataset/views/edit/dataSetEditPage";
import { reactive, toRef, toRefs, watchEffect } from "vue";
import Scroll from "@/modules/components/scroll/scroll.vue";
import { StepItem } from "@/modules/diyChart/components/step/StepMan";
import { ElMessage } from "element-plus";
import SqlWhere from "@/modules/diyChart/old/dataset/components/sqlWhere/SqlWhere.vue";
import SqlWhereMan from "@/modules/diyChart/old/dataset/components/sqlWhere/SqlWhereMan";

let datasetModel = $(toRef(dataSetEditPage, "datasetModel"));
const sqlWhereMan = reactive(new SqlWhereMan());
watchEffect(() => {
  sqlWhereMan.setMustInfo(datasetModel.datasetId, datasetModel.processLogic.filterWhere, datasetModel.ext.fieldConfigure);
});


const props = defineProps<{
  stepItem: StepItem
}>();

let { stepItem } = $(toRefs(props));
watchEffect(() => {
  if (stepItem.isCurrent) {
    if (!datasetModel.processLogic.processLogicDefined.realityTableName) {
      ElMessage.error({
        message: "需要先选择数据表",
        showClose: true
      });
      stepItem.parent.backStep();
    }
  }
});

stepItem.setCheckFun(async () => {
  if (sqlWhereMan.deepCheckWhere()) {
    ElMessage.error({
      message: "请设置筛选项",
      showClose: true
    });
    return false;
  }
  return true;
});

</script>


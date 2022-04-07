<style lang="scss" scoped>
</style>
<template>
  <Scroll>
    <SqlWhere
        :sqlWhereMan="sqlWhereMan"
    />
  </Scroll>
</template>

<script lang="ts" setup>
import Scroll from "@/modules/components/scroll/scroll.vue";
import SqlWhere from "@/modules/diyChart/old/dataset/components/sqlWhere/SqlWhere.vue";
import datasetShowPage from "@/modules/diyChart/old/dataset/views/show/datasetShowPage";
import SqlWhereMan from "@/modules/diyChart/old/dataset/components/sqlWhere/SqlWhereMan";
import { reactive, toRef,  watchEffect } from "vue";

let datasetModel = $(toRef(datasetShowPage, "datasetModel"));
const sqlWhereMan = reactive(new SqlWhereMan())
watchEffect(()=>{
  sqlWhereMan.setMustInfo(datasetModel.datasetId,datasetModel.processLogic.filterWhere,datasetModel.ext.fieldConfigure,false)
})
</script>


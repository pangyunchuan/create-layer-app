<style lang="scss" scoped>

</style>
<template>
  <el-table :data="datasetModel.ext.fieldConfigure" height="100%" width="100%" stripe border>
    <el-table-column
        label="字段"
        prop="name"
        align="center"
    ></el-table-column>
    <el-table-column label="字段别名" prop="alias" align="center">
    </el-table-column>
    <el-table-column label="名称" prop="meaning" align="center">
    </el-table-column>
    <el-table-column label="字段属性" prop="propertyType" align="center">
      <template #default="scope">
        <span>{{ dataTypeOptionsMapByMask[rowType(scope.row).propertyType] }}</span>
      </template>
    </el-table-column>
    <el-table-column label="字段属性值" prop="propertyValue" align="center">
      <template #default="scope">
        <span
            v-if="rowType(scope.row).propertyType === 'DATE'"
        >
          {{ dataTypeValueOptionsByField[rowType(scope.row).propertyValue] }}
        </span>
      </template>
    </el-table-column>
    <el-table-column label="可见性" prop="visible" align="center">
      <template #default="scope">
        <el-switch
            v-model="rowType(scope.row).visible"
            disabled
            :active-value="'1'"
            :inactive-value="'0'"
            active-color="#13ce66"
            inactive-color="#3E3E3E"
        />
      </template>
    </el-table-column>
    <el-table-column label="脱敏规则" prop="maskingRule" align="center">
      <template #default="scope">
       <span> {{filterRuleMapByCode[rowType(scope.row).maskingRule]}}</span>
      </template>
    </el-table-column>
    <el-table-column label="排序" prop="ord" align="center">
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from "vue";
import DatasetExtModel, { IDatasetField, IFilterRule } from "@/modules/diyChart/old/dataset/models/DatasetExtModel";
import datasetShowPage from "@/modules/diyChart/old/dataset/views/show/datasetShowPage";
import { dataTypeOptions, dataTypeValueOptions } from "@/modules/diyChart/old/dataset/models/DatasetType";

const {datasetModel} = toRefs(datasetShowPage)

let filterRuleMapByCode = reactive<Record<string, string>>({})

DatasetExtModel.getFilterRules().then(r => {
  for (const iFilterRule of r) {
    filterRuleMapByCode[iFilterRule.ruleCode] = iFilterRule.ruleName
  }
});

function rowType(row: IDatasetField): IDatasetField {
  return row;
}

let dataTypeOptionsMapByMask:Record<string, string> = {}
for (const item of dataTypeOptions) {
  dataTypeOptionsMapByMask[item.mask] = item.name;
}

let dataTypeValueOptionsByField:Record<string, string> = {}
for (const type in dataTypeValueOptions) {
  for (const item of dataTypeValueOptions[type]) {
    dataTypeValueOptionsByField[item.field] = item.name;
  }
}
</script>


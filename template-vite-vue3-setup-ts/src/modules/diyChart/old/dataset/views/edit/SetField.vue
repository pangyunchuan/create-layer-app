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
      <template v-if="!datasetModel.isUsed" #default="scope">
        <el-input
            v-if="rowType(scope.row).propertyType === 'KPI'"
            v-model="rowType(scope.row).alias"
        >
        </el-input>
        <span v-else>{{ rowType(scope.row).alias }}</span>
      </template>
    </el-table-column>
    <el-table-column label="名称" prop="meaning" align="center">
      <template v-if="!datasetModel.isUsed" #default="scope">
        <el-input v-model="rowType(scope.row).meaning"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="字段属性" prop="propertyType" align="center">
      <template v-if="!datasetModel.isUsed" #default="scope">
        <el-select
            v-model="rowType(scope.row).propertyType"
            @change="changePropertyType(scope.row)"
        >
          <el-option
              v-for="dtOp in dataTypeOptions"
              :key="dtOp.mask"
              :label="dtOp.name"
              :value="dtOp.mask"
          ></el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="字段属性值" prop="propertyValue" align="center">
      <template v-if="!datasetModel.isUsed" #default="scope">
        <el-select
            v-if="rowType(scope.row).propertyType === 'DATE'"
            v-model="rowType(scope.row).propertyValue"
            @change="rowType(scope.row).alias = rowType(scope.row).propertyValue"
        >
          <el-option
              v-for="dtValueOp in dataTypeValueOptions[rowType(scope.row).propertyType]"
              :key="dtValueOp.field"
              :label="dtValueOp.name"
              :value="dtValueOp.field"
          ></el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="可见性" prop="visible" align="center">
      <template #default="scope">
        <el-switch
            v-model="rowType(scope.row).visible"
            :disabled="datasetModel.isUsed || rowType(scope.row).propertyType !== 'KPI'"
            :active-value="'1'"
            :inactive-value="'0'"
            active-color="#13ce66"
            inactive-color="#3E3E3E"
            @change="changeVisible(scope.row)"
        />
      </template>
    </el-table-column>
    <el-table-column label="脱敏规则" prop="maskingRule" align="center">
      <template #default="scope">
        <!--          非维度，且可见才能设置脱敏-->
        <el-select
            v-if="rowType(scope.row).propertyType === 'KPI'  && rowType(scope.row).visible === '1'"
            :disabled="datasetModel.isUsed"
            clearable
            v-model="rowType(scope.row).maskingRule"
        >
          <el-option v-for="item in filterRules" :value="item.ruleCode" :label="item.ruleName" />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="排序" prop="ord" align="center">
      <template v-if="!datasetModel.isUsed" #default="scope">
        <el-input v-model="rowType(scope.row).ord"></el-input>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import dataSetEditPage from "@/modules/diyChart/old/dataset/views/edit/dataSetEditPage";
import {  reactive, toRefs, watchEffect } from "vue";
import DatasetExtModel, { IDatasetField, IFilterRule } from "@/modules/diyChart/old/dataset/models/DatasetExtModel";
import { StepItem } from "@/modules/diyChart/components/step/StepMan";
import { ElMessage } from "element-plus";
import { $toRef } from "vue/macros";
import { dataTypeOptions, dataTypeValueOptions } from "@/modules/diyChart/old/dataset/models/DatasetType";

const props = defineProps<{
  stepItem: StepItem
}>();

let { stepItem } = $(toRefs(props));

let datasetModel = $toRef(dataSetEditPage, "datasetModel");
//必要条件检查
watchEffect(()=>{
  if(stepItem.isCurrent){
    if (!datasetModel.processLogic.processLogicDefined.realityTableName) {
      ElMessage.error(messageShowClose('需要先选择数据表'));
      stepItem.parent.backStep();
    }
  }
})

let filterRules = reactive<IFilterRule[]>([]);

DatasetExtModel.getFilterRules().then(r => {
  filterRules.push(...r);
});

function rowType(row: IDatasetField): IDatasetField {
  return row;
}


stepItem.setCheckFun(async () => {
  return checkField(datasetModel.ext.fieldConfigure, datasetModel.datasetType);
});

function messageShowClose(message:string) {
  return {
    message,
    showClose:true
  }
}

function checkField(fieldConfig: IDatasetField[] = [], datasetType: string) {
  if (!fieldConfig.length) {
    // ElMessage.error({
    //   message:"无字段可能有异常",
    //   showClose:true
    // });
    return true;
  }
  let dateFieldNumber = 0;
  // let areaTypeValueNumberMap = {};//地域重复检查
  let fieldAliasNumMap: Record<string, number> = {}; //字段别名 重复检查
  let fieldNameNumMap: Record<string, number> = {}; //字段名称 重复检查
  let areaFieldNumber = 0;
  for (let field of fieldConfig) {
    if (!field.propertyType) {
      ElMessage.warning(messageShowClose("请选择字段属性"));
      return false;
    }
    if (field.propertyType === "DATE") {
      dateFieldNumber++;
    }
    if (dateFieldNumber > 1) {
      ElMessage.warning(messageShowClose("日期字段属性只能设置一个"));
      return false;
    }
    if (field.propertyType === "DATE" && !field.propertyValue) {
      ElMessage.warning(messageShowClose('请设置字段属性值'));
      return false;
    }

    if (field.propertyType === "AREA") {
      areaFieldNumber++;
    }
    if (areaFieldNumber > 1) {
      ElMessage.warning(messageShowClose('地域字段属性只能设置一个'));
      return false;
    }

    if (!field.meaning) {
      ElMessage.warning(messageShowClose('请设置字段名称'));
      return false;
    }

    //中文名称不允许重复
    if (fieldNameNumMap[field.meaning]) {
      fieldNameNumMap[field.meaning]++;
    } else {
      fieldNameNumMap[field.meaning] = 1;
    }

    if (fieldNameNumMap[field.meaning] > 1) {
      ElMessage.warning(messageShowClose('名称不能为空或重复'));
      return false;
    }

    if (!/[A-Za-z_]/.test(field.alias)) {
      ElMessage.warning(messageShowClose('字段别名只能为下划线或字母'));
      return false;
    }

    if (fieldAliasNumMap[field.alias.toLowerCase()]) {
      fieldAliasNumMap[field.alias.toLowerCase()]++;
    } else {
      fieldAliasNumMap[field.alias.toLowerCase()] = 1;
    }

    if (fieldAliasNumMap[field.alias.toLowerCase()] > 1) {
      ElMessage.warning(messageShowClose('字段别名不能为空或重复'));
      return false;
    }
  }
  if (!dateFieldNumber && datasetType === "report_service") {
    ElMessage.warning(messageShowClose('请指定日期字段属性'));
    return false;
  } else if (!areaFieldNumber) {
    ElMessage.warning(messageShowClose('请指定地域字段属性'));
    return false;
  }
  return true;
}



function changePropertyType(row: IDatasetField) {
  row.propertyValue = "";
  if (row.propertyType === "AREA") {
    row.alias = "CHL_ID";
    row.propertyValue = "CHL_ID";
  }
  if (row.propertyType === "KPI") {
    row.alias = row.name;
  } else {
    //维度不让设置脱敏且一定要可见
    row.maskingRule = "";
    row.visible = "1";
  }
}

function changeVisible(row: IDatasetField) {
  if (row.visible === "0") {
    row.maskingRule = "";
  }
}
</script>


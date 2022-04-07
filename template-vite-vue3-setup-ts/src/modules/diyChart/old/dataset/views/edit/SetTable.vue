<style lang="scss" scoped>
.setTableBox {
  height: 100%;

  .database {
    height: 45px;
    border: 1px solid #4D4D4D;
    display: flex;
    align-items: center;
    justify-content: center;

    .label {
      font-weight: 400;
      font-size: 14px;
      color: #fff;
      opacity: 0.6;
      margin-right: 10px;
    }
  }

  .tableListBox {
    height: calc(100% - 135px);
  }

  .tableList {
    display: flex;
    flex-wrap: wrap;
    background-image: linear-gradient(#3e3e3e 50%, #373737 0);
    background-size: auto 60px;

    > .item {
      width: 25%;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      border: 1px solid #4d4d4d;
      font-weight: 400;
      font-size: 12px;
      text-align: left;
      color: rgba(#fff, 0.6);
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;

      &.active {
        cursor: default;
        background-color: #409eff;
        color: #fff;
      }
    }
  }


}
</style>
<template>
  <div class="setTableBox">
    <div class="database">
      <span class="label">选择数据库</span>
      <el-select v-model="datasetModel.processLogic.datasourceId" filterable @change="changeSource">
        <el-option
            v-for="d in databaseList"
            :label="`${d.datasourceName} (${d.databaseName})`"
            :value="d.datasourceId"
        />
      </el-select>
    </div>
    <div class="database">
      <span class="label">搜索数据表</span>
      <el-input style="width: 200px" v-model="tableSearchKey" placeholder="请输入表名搜索" clearable />
      <el-button type="primary" @click="getTables">搜索</el-button>
    </div>
    <div class="database">
      <span class="label">已选数据表：{{ datasetModel.processLogic.processLogicDefined.realityTableName }}</span>
    </div>
    <Scroll class="tableListBox">
      <div class="tableList">
        <div
            v-for="t in tableList"
            class="item"
            :class="{active:t.tableName === datasetModel.processLogic.processLogicDefined.realityTableName}"
            :key="t.tableName"
            :title="t.tableName"
            @click="changeTable(t.tableName)"
        >
          {{ t.tableName }}
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script lang="ts" setup>
import dataSetEditPage from "@/modules/diyChart/old/dataset/views/edit/dataSetEditPage";
import { reactive, toRefs, watch, watchEffect } from "vue";
import Scroll from "@/modules/components/scroll/scroll.vue";
import Database, { IDatabase } from "@/modules/diyChart/old/dataset/models/Database";
import DatabaseTable, { ITable } from "@/modules/diyChart/old/dataset/models/DatabaseTable";
import { ElMessage, ElMessageBox } from "element-plus";
import { StepItem } from "@/modules/diyChart/components/step/StepMan";
import { useRoute, useRouter } from "vue-router";
import { $toRef } from "vue/macros";

const router = useRouter();
const route = useRoute();


const props = defineProps<{
  stepItem: StepItem
}>();

let { stepItem } = $(toRefs(props));

const databaseList = reactive<IDatabase[]>([]);

Database.getAll().then(r => {
  databaseList.length = 0;
  databaseList.push(...r);
});

let datasetModel = $toRef(dataSetEditPage, "datasetModel");


let tableSearchKey = $ref("");
const stop = watchEffect(() => {
  if (props.stepItem.isCurrent && !dataSetEditPage.isModify && datasetModel.processLogic.processLogicDefined.realityTableName && !tableSearchKey) {
    tableSearchKey = datasetModel.processLogic.processLogicDefined.realityTableName;
    getTables();
    stop();
  }
});

//进入步骤的必要条件检测
watchEffect(() => {
  if (props.stepItem.isCurrent) {
    if (dataSetEditPage.datasetId && datasetModel.datasetId === "") {
      ElMessage.error({
        message: "请等待信息获取",
        showClose: true
      });
      stepItem.parent.backStep();
    }
  }
});


let tableList = reactive<ITable[]>([]);

//todo 变更数据库,弹出提示
function changeSource() {
  datasetModel.processLogic.processLogicDefined.realityTableName = "";
  getTables();
}

function getTables() {
  if (!datasetModel.processLogic.datasourceId) {
    return;
  }
  tableList.length = 0;
  DatabaseTable.getList(datasetModel.processLogic.datasourceId, tableSearchKey).then(r => {
    tableList.push(...r);
  });
}

function changeTable(tableName: string) {
  if (!datasetModel.datasetName) {
    ElMessage.error("请先设置数据集基础信息");
  }
  if (tableName === datasetModel.processLogic.processLogicDefined.realityTableName) {
    return;
  }
  ElMessageBox.confirm("需要重新配置，确认变更？", {
    title: "变更数据表",
    confirmButtonText: "确定",
    cancelButtonText: "取消"
  }).then(() => {
    datasetModel.processLogic.processLogicDefined.realityTableName = tableName;
    datasetModel.save(true).then(r => {
      //todo 检查 replace情况
      if(datasetModel.datasetId){
        router.replace({
          ...route,
          query: {
            id: datasetModel.datasetId
          }
        });
      }
    });
  });
}


stepItem.setCheckFun(async () => {
  if (!datasetModel.processLogic.datasourceId) {
    ElMessage.error({ message: "未选择数据源", showClose: true });
    return false;
  }
  if (!datasetModel.processLogic.processLogicDefined.realityTableName) {
    ElMessage.error({ message: "未选择数据表", showClose: true });
    return false;
  }
  return true;
});


</script>


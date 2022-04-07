<style lang="scss" scoped>
.baseInfoBox {
  height: 100%;

  //考虑不要header
  padding-top: 40px;
  color: rgba(#fff, 0.6);

  .header {
    height: 40px;
    border: 1px solid #4d4d4d;
    font-weight: 400;
    font-size: 14px;
    line-height: 40px;
    color: #fff;
    padding: 0 20px;
    margin-bottom: 40px;
  }

  .form {
    width: 55%;
    margin: 0 auto;
  }

}
</style>
<template>
  <div class="baseInfoBox">
    <el-form
        v-model="datasetModel"
        class="form"
        label-width="100px"
    >
      <el-form-item label="数据集名称" prop="datasetName">
        {{ datasetModel.datasetName }}
      </el-form-item>
      <el-form-item label="用途" prop="datasetName">
        <span>{{ datasetModel.datasetTypeText }}</span>
      </el-form-item>
      <el-form-item label="数据库ID">
        <span>{{ datasetModel.processLogic.datasourceId }}</span>
      </el-form-item>
      <el-form-item label="使用数据表">
        <span>{{ datasetModel.processLogic.processLogicDefined.realityTableName }}</span>
      </el-form-item>
      <el-form-item label="使用视图">
        <span>{{ datasetModel.processLogic.datasetView }}</span>
      </el-form-item>
      <el-form-item label="口径描述">
        {{ datasetModel.ext.datasetNote.notetext }}
      </el-form-item>
      <el-form-item label="口径文件">
        <el-button v-if="datasetModel.ext.datasetNote.notfilepath" type="primary" size="small"
                   @click="window.open(datasetModel.ext.datasetNote.notfilepath)">下载口径文件
        </el-button>
        <span v-else>无口径文件</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";
import datasetShowPage from "@/modules/diyChart/old/dataset/views/show/datasetShowPage";

const { datasetModel } = toRefs(datasetShowPage);

</script>


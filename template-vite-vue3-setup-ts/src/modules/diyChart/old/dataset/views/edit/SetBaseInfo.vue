<style lang="scss" scoped>
.baseInfoBox {
  height: 100%;
  padding-top: 40px;

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
        :model="datasetModel"
        :rules="rules"
        ref="ruleForm"
        class="form"
        label-width="100px"
    >
      <el-form-item label="数据集名称" prop="datasetName">
        <el-input
            v-model.trim="datasetModel.datasetName"
            placeholder="请输入名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="用途" prop="datasetName">
        <el-radio-group v-model="datasetModel.datasetType">
          <el-radio-button title="选择该项才可用于制作组合报表" label="report_service">组合报表</el-radio-button>
          <el-radio-button title="选择该项只能用与公共数据集查看" label="customer_fetch">自定义筛选</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="口径描述">
        <el-input
            type="textarea"
            v-model.trim="datasetModel.ext.datasetNote.notetext"
            placeholder="请输入口径描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="口径文件">
        <el-upload
            action=""
            :multiple="false"
            :show-file-list="false"
            accept=".xls,.xlsx"
            :http-request="uploadExcel"
            auto-upload
        >
          <el-input
              :model-value="datasetModel.ext.datasetNote.notfilepath"
              placeholder="请选择口径文件"
          ></el-input>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { StepItem } from "@/modules/diyChart/components/step/StepMan";
import dataSetEditPage from "@/modules/diyChart/old/dataset/views/edit/dataSetEditPage";
import { UploadRequestOptions } from "element-plus/es/components/upload/src/upload";
import { ElForm } from "element-plus";
import Scroll from "@/modules/components/scroll/scroll.vue";

const props = defineProps<{
  stepItem: StepItem
}>();

let datasetModel = $toRef(dataSetEditPage, "datasetModel");

function uploadExcel({ file }: ElUploadRequestOptions) {
  return datasetModel.ext.upNoteFile(file);
}

const rules: typeof ElForm["rules"] = {
  datasetName: [{ required: true, message: "未设置", trigger: "blur" }],
  datasetType: [{ required: true, message: "未设置", trigger: "blur" }]
};
const ruleForm = $ref<InstanceType<typeof ElForm>>();
props.stepItem.setCheckFun(async () => {
  let res: boolean | undefined = false;
  ruleForm.validate(v => {
    res = v;
  });
  return res;
});

</script>


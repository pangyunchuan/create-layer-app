<template>
  <el-select
      :modelValue="modelValue"
      @update:modelValue="updateModelValue"
      filterable
      allow-create
      remote
      :key="multiple"
      :multiple="multiple"
      reserve-keyword
      clearable
      collapse-tags
      placeholder="请输入筛选"
      :remote-method="remoteMethod"
      :loading="loading"
      @focus="init"
  >
    <el-option
        v-for="val in options"
        :key="val"
        :label="`${val}`"
        :value="`${val}`"
    >
    </el-option>
    <el-option disabled value="_no_data___fenYe">
      <template #default>
        <el-pagination
            v-model:current-page="page"
            layout="prev, pager, next,total"
            :total="total"
            :page-size="rows"
            @current-change="getOptions"
        />
      </template>
    </el-option>
  </el-select>
</template>

<script lang="ts" setup>
import ExtractdataactionApi from "./ExtractdataactionApi";
import { defineEmits, toRefs, watch } from "vue";


type modelValueType = string | number | boolean | object


const props = withDefaults(defineProps<{
  modelValue: modelValueType,
  datasetId: string,
  fieldName: string,
  multiple?: boolean
}>(), {
  multiple: false
});


let { datasetId, multiple, fieldName } = $(toRefs(props));

const emit = defineEmits(["update:modelValue", "change"]);

let options = $ref([]);
let loading = $ref(false);
let keyWord = $ref("");
let page = $ref(1);
let rows = $ref(20);
let total = $ref(1);

function remoteMethod(str: string) {
  keyWord = str;
  page = 1;
  total = 1;
  getOptions();
}


function getOptions() {
  loading = true;
  ExtractdataactionApi.getFieldValuesByKeyWord({
    datasetId, fieldName, keyWord, page, rows
  }).then(res => {
    options = res.data || [];
    total = res.total;
    loading = false;
  }).catch(() => {
    loading = false;
  });
}


watch([$$(datasetId), $$(fieldName)], () => {
  page = 1;
  total = 1;
  keyWord = "";
  updateModelValue(multiple ? [] : "");
  remoteMethod("");
});

function updateModelValue(val: modelValueType) {
  emit("update:modelValue", val);
}

function init() {
  if (!options.length) {
    remoteMethod("");
  }
}


</script>
<style lang="scss" scoped></style>

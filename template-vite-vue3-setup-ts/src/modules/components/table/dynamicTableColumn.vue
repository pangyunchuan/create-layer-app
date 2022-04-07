<template>
  <el-table-column
      :minWidth="minWidth"
      :fixed="col[fieldConfig.fixed]"
      :prop="col[fieldConfig.field]"
      :label="col[fieldConfig.name]"
      :sortable="col[fieldConfig.sort] && (!col[fieldConfig.child] || !col[fieldConfig.child].length)"
      :sort-method="(a, b) => sortMethod(a, b, col[fieldConfig.field])"
      align="center"
      :class-name="className()"
  >
    <template v-if="col[fieldConfig.child] && col[fieldConfig.child].length" #default="scope">
      <dynamicTableColumn
          v-for="(item, index) in col[fieldConfig.child]"
          :key="index"
          :col="item"
          :selectedField="selectedField"
          :active="isActive(col[fieldConfig.field],col.kpiId)"
          :field-config="fieldConfig"
      ></dynamicTableColumn>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: "dynamicTableColumn",
  props: {
    minWidth: String,
    col: Object,
    selectedField: String, //选中字段
    active: Boolean,
    fieldConfig: {
      type: Object,
      default() {
        return {
          field: "field",//字段
          name: "name",//展示名称
          sort: "sort",//排序
          child: "child",//后代
          fixed: "fixed"//固定列
        };
      }
    }
  },
  methods: {
    isActive(field) {
      return this.active || field == this.selectedField;
    },
    sortMethod(a, b, c) {
      let aValue = a[c].toString().replace(/[^\+\-\.\d]/g, "");
      let bValue = b[c].toString().replace(/[^\+\-\.\d]/g, "");
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
      return aValue - bValue;
    },
    className() {
      let className = "";
      className = className + " " + (this.isActive(this.col[this.fieldConfig.field]) ? "active" : "");
      //todo 提取 入参
      // className = className + " " + (this.col.property.columntype ? "notHeader" : "");
      return className;
    }
  }
};
</script>
<style lang="scss" scoped></style>

<template>
  <el-table
    :data="tableData"
    :default-sort="defaultSort"
  >
    <el-table-column
      v-for="(item, index) in tableHeader"
      :key="index"
      :label="item.name"
      :prop="item.field"
      align="center"
      :sort-orders="['ascending', 'descending']"
      :sortable="item.sort"
      :sort-method="(a, b) => sortMethod(a, b, item.field)"
    >
      <template #default="scope">
        <span v-html="scope.row[item.field]"></span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    tableHeader: Array,
    tableData: Array,
  },
  data() {
    return {};
  },
  computed: {
    defaultSort() {
      let defaultSort = {};
      for (const temp of this.tableHeader) {
        if (temp.defaultSort) {
          defaultSort.prop = temp.field;
          defaultSort.order =
            temp.defaultSort == "asc" ? "ascending" : "descending";
          break;
        }
      }
      return defaultSort;
    },
  },
  methods: {
    sortMethod(a, b, c) {
      let aValue = a[c].toString().replace(/[^\+\-\.\d]/g, "");
      let bValue = b[c].toString().replace(/[^\+\-\.\d]/g, "");
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);

      return aValue - bValue;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>

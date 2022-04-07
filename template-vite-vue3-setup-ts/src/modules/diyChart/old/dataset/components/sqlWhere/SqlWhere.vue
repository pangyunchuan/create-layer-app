<style lang="scss" scoped>
.dataFilter {
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;

  .treeBox {
    min-width: 50%;

    .tree {
      :deep {
        .el-tree-node__content {
          margin-bottom: 5px;
        }
      }

      .treeNode {
        display: flex;
        align-items: center;

        .touMing {
          opacity: 0;
          cursor: default;
          pointer-events: none;
        }

        .item {
          display: inline-block;
          margin-right: 5px;
        }

        .addChild {
          color: #b2b2b2;
          font-weight: bold;
        }

        .short {
          width: 100px;
        }

        .mid {
          width: 150px;
        }

        .long {
          width: 200px;
        }
      }
    }

    .add {
      margin-top: 20px;
    }
  }

  .sqlPreview {
    max-width: 30%;
    padding-left: 30px;
    word-break: break-word;
    line-height: 1.5;
    color: rgba(#fff, 0.6);
  }
}
</style>
<template>
  <div class="dataFilter">
    <div class="treeBox">
      <el-tree
          class="tree"
          :data="wheres"
          :props="{ children: 'child' }"
          :expand-on-click-node="false"
          :default-expand-all="true"
      >
        <template #default="{ node, data }">
          <div class="treeNode">
            <template v-if="sqlWhereMan.isEdit">
              <el-icon
                  class="item addChild"
                  @click.stop="addItem(node)"
              >
                <circle-plus />
              </el-icon>
              <el-icon
                  class="item addChild"
                  @click.stop="removeItem(node)"
              >
                <remove />
              </el-icon>
            </template>
            <el-select
                class="item short"
                :disabled="!sqlWhereMan.isEdit"
                v-model="data.operator"
                placeholder="选择逻辑运算"
            >
              <el-option label="并且" value="and" />
              <el-option label="或者" value="or" />
            </el-select>
            <el-select
                class="item mid"
                v-if="!data.child.length"
                :disabled="!sqlWhereMan.isEdit"
                v-model="data.field"
                placeholder="选择字段"
                @change="changeField(data)"
            >
              <el-option
                  v-for="item in sqlWhereMan.fieldList"
                  :key="`${item.table}.${item.alias}`"
                  :label="`${item.meaning}(${item.table}${item.alias})`"
                  :value="`${item.table}.${item.alias}`"
              />
            </el-select>
            <el-select
                class="item short"
                v-if="!data.child.length"
                :disabled="!sqlWhereMan.isEdit"
                v-model="data.op"
                @change="changeRelationOp(data)"
                placeholder="选择关系运算"
            >
              <el-option label="等于(=)" value="=" />
              <el-option label="大于(>)" value=">" />
              <el-option label="大于等于(>=)" value=">=" />
              <el-option label="小于(<)" value="<" />
              <el-option label="小于等于(<=)" value="<=" />
              <el-option label="不等于(!=)" value="!=" />
              <el-option label="模糊(like)" value="like" />
              <el-option label="包含(in)" value="in" />
              <el-option label="不包含(not in)" value="not in" />
              <el-option label="null(is null)" value="is null" />
              <el-option label="not null(is not null)" value="is not null" />
            </el-select>

            <div class="item" v-if="canSetVal(data)">
              <el-input
                  class="long"
                  :modelValue="isArrayValue(data) ? data.val.join(',') : data.val"
                  placeholder="已设置"
              />
              <FieldValuesSelect
                  class="long"
                  v-if="sqlWhereMan.isEdit"
                  v-model="data.val"
                  :dataset-id="sqlWhereMan.datasetId"
                  :field-name="data.field"
                  :multiple="isArrayValue(data)"
              />
            </div>
          </div>
        </template>
      </el-tree>
      <el-button v-if="sqlWhereMan.isEdit" class="add" type="primary" icon="plus" @click="addItem()">新建过滤条件</el-button>
    </div>
    <div class="sqlPreview">
      预览sql<br />
      {{ sqlPreview(wheres) }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import FieldValuesSelect from "@/modules/components/FieldValuesSelect.vue";
import type Node from "element-plus/es/components/tree/src/model/node";
import { TreeNodeData } from "element-plus/es/components/tree/src/tree.type";
import { trim } from "lodash-es";
import SqlWhereMan, { IWhereItem } from "@/modules/diyChart/old/dataset/components/sqlWhere/SqlWhereMan";
import { UnwrapNestedRefs } from "@vue/reactivity";

const props = defineProps<{
  sqlWhereMan: UnwrapNestedRefs<SqlWhereMan>
}>();

const wheres = $computed<IWhereItem[]>(() => {
  return props.sqlWhereMan.wheres;
});

function isArrayValue(item: IWhereItem) {
  return item.op.includes("in");
}

//改变关系运算符
function changeRelationOp(item: IWhereItem) {
  item.val = "";
  if (isArrayValue(item)) {
    item.val = [];
  }
}

function changeField(item: IWhereItem) {
  item.op = "";
  item.val = "";
}

function addItem(node?: Node) {
  let newWhereItem: IWhereItem = {
    operator: "",
    field: "",
    op: "",
    val: "",
    child: []
  };
  if (node) {
    const { data } = node;
    data.field = "";
    data.op = "";
    data.val = "";
    data.child.push(newWhereItem);
    node.initialize();
  } else {
    wheres.push(newWhereItem);
  }
}

function removeItem(node: Node) {
  const parentNode = node.parent;
  const children: TreeNodeData[] = parentNode.data.child || parentNode.data;
  const index = children.findIndex(
      d => d.$treeNodeId === node.data.$treeNodeId
  );
  children.splice(index, 1);
  node.parent.initialize();
}


function canSetVal(data: IWhereItem) {
  return !data.child.length && data.op && data.field && !data.op.includes("null");
}

//sql预览
function sqlPreview(wheres: IWhereItem[]) {
  let str = "";
  for (const where of wheres) {
    if (!where.child.length) {
      str += `${where.operator} ${where.field} ${where.op} ${v(where)} `;
    } else {
      str += `${where.operator} ( ${sqlPreview(where.child)} )`;
    }
  }
  str = trim(str, "and");
  str = trim(str, "or");
  return str;
}

function v(where: IWhereItem) {
  if (where.op === "like") {
    return `%${where.val}%`;
  }
  if (isArrayValue(where)) {
    return `('${(<[]>where.val).join("','")}')`;
  }
  if (where.op.includes("null")) {
    return "";
  }
  return `'${where.val}'`;

}
</script>


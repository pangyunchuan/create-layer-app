<style lang="scss" scoped>

</style>

<template>
  <IndexListManPage>
    <TitleBox>
      数据集
      <template #right>
        <el-button icon="plus" type="primary" @click="toOtherPage('edit')">新建</el-button>
      </template>
    </TitleBox>
    <FilterBox>
      <FilterBoxItem name="类型">
        <el-select v-model="params.type">
          <el-option label="公共数据集" value="extract-release" />
          <el-option label="我的数据集" value="extract-create" />
        </el-select>
      </FilterBoxItem>
      <FilterBoxItem v-if="showDirFilter" name="目录">
        <el-cascader
            v-model="params.directoryId"
            clearable
            :options="cascaderOptions"
            :show-all-levels="false"
            :props="cascaderProps"
        />
      </FilterBoxItem>
      <FilterBoxItem name="名称">
        <el-input
            v-model="params.keyword"
            placeholder="输入关键字"
            suffix-icon="search"
        ></el-input>
      </FilterBoxItem>
      <el-button-group>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="info" @click="resetParams">重置</el-button>
      </el-button-group>
    </FilterBox>
    <!--    table-->
    <el-table :data="list" border>
      <el-table-column label="名称" prop="name" align="center" />
      <el-table-column label="归属地" prop="chlName" align="center" />
      <el-table-column label="状态" prop="stateText" align="center">
        <template #default="scope">
          <el-tag :type="getTagType(scope.row)" effect="dark">{{ scope.row.stateText }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="用途" prop="datasetTypeText" align="center" />
      <el-table-column label="创建人" prop="userName" align="center" />
      <el-table-column label="创建人账号" prop="creator" align="center" />
      <el-table-column label="创建时间" prop="createTime" align="center" />
      <el-table-column label="操作" align="center" width="200px">
        <template #default="scope">
          <el-button-group>
            <el-button v-if="scope.row.isMy" type="primary" @click="toOtherPage('edit',scope.row)">编辑</el-button>
            <el-button v-if="scope.row.isCanUse" type="primary" @click="toOtherPage('look',scope.row)">查看</el-button>
          </el-button-group>
          <el-dropdown v-if="scope.row.isMy">
            <el-button type="primary">
              ...
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-if="scope.row.isCanPublish" @click="publishFinish(scope.row)">
                  发布
                </el-dropdown-item>
                <el-dropdown-item v-if="scope.row.isCanBuildReport">制作报表</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.isMyPublish" @click="scope.row.revoke()">撤销发布</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.isCanDel" @click="del(scope.row)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!--    page-->
    <el-pagination
        :total="total"
        v-model:current-page="params.page"
        :page-size="params.rows"
        layout="total,prev, pager, next, jumper"
        @current-change="getData"
        background
    />
    <router-view />

  </IndexListManPage>
</template>


<script lang="ts" setup>
import IndexListManPage from "@/modules/components/layout/IndexListManPage.vue";
import FilterBox from "@/modules/components/layout/FilterBox.vue";
import FilterBoxItem from "@/modules/components/layout/FilterBoxItem.vue";
import DatasetListItemModel, {
  getListParamsType,
  IDatasetListItem
} from "@/modules/diyChart/old/dataset/models/DatasetListItemModel";
import { CascaderProps, ElMessageBox } from "element-plus";
import { computed, reactive, watchEffect } from "vue";
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import TitleBox from "@/modules/components/layout/TitleBox.vue";
import { TagProps } from "element-plus/es/components/tag/src/tag";

type ModelWithData = DatasetListItemModel & IDatasetListItem;

let total = $ref(0);

const paramsOrg: getListParamsType = {
  type: "extract-release",
  page: 1,
  rows: 20,
  keyword: "",
  directoryId: ""
};
let params = $ref({ ...paramsOrg });
watchEffect(() => {
  // clear 目录时,重置为空字符
  params.directoryId = params.directoryId ?? "";
});

const showDirFilter = computed(() => {
  return params.type === "extract-release";
});

function resetParams() {
  params = { ...paramsOrg };
}


let cascaderOptions = $ref<any[]>([]);
const cascaderProps: CascaderProps = {
  label: "directoryName",
  value: "directoryId",
  checkStrictly: true,
  emitPath: false
};

DatasetListItemModel.dirTree(params.type).then(r => {
  cascaderOptions = r;
});


//请求数据
let list = $ref<ModelWithData[]>([]);

function getData() {
  DatasetListItemModel.getList(params).then(r => {
    list = r.models;
    total = r.total;
  });
}

getData();

function search() {
  params.page = 1;
  getData();
}


//删除
function del(datasetModel: DatasetListItemModel) {
  ElMessageBox.confirm("确定删除", { confirmButtonText: "确定", cancelButtonText: "取消" }).then(() => {
    datasetModel.del().then(() => {
      getData();
    });
  });
}



function publishFinish(datasetModel: ModelWithData) {
  datasetModel.state = 1;
  datasetModel.isRevoke = false;
}


const router = useRouter();

function toOtherPage(target: "edit" | "look", datasetModel?: ModelWithData) {
  router.push({
    name: { "look": "数据集查看_UI升级版", "edit": "数据集编辑_UI升级版" }[target],
    query: {
      id: datasetModel?.id
    }
  });
}


function getTagType(datasetModel: ModelWithData) {
  return ({ "-1": "danger", "0": "info", "1": "success" } as Record<string, TagProps["type"]>)
      [datasetModel.state];
}


onBeforeRouteUpdate((to, from, next) => {
  if (to.name === "数据集列表_UI升级版") {
    getData();
  }
  next();
});


</script>

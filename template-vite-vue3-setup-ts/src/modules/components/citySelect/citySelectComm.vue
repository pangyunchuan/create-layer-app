<template>
  <div class="block">
    <el-cascader
        ref="cascader"
        :modelValue="chlId"
        @update:modelValue="updateChlId($event)"
        :options="options"
        :show-all-levels="false"
        @change="handleChange(null)"
        :props="prop"
        :placeholder="chlId ? elChlname : '请选择'"
        :clearable="clearable"
    >
      <template #default="{ node, data }">
        <span @click="handleChange(data)">{{ data.chlName }}</span>
      </template>
    </el-cascader>
  </div>
</template>

<script>
import componentApi from "@/modules/api/basic/componentApi.js";
import branchAssessApi from "@/modules/special/branchAssess/branchAssessApi.js";
import { mapMutations, mapState } from "vuex";

export default {
  props: {
    attributionMode: {
      type: String,
      default: ""
    },
    defaultSelect: {
      // 无值时，默认选中
      type: Boolean,
      default: true
    },
    maxLevel: Number, //展示的最大层级
    chlId: String,
    initSelectedContent: String,
    clearable: Boolean,
    branchAssessApi: Boolean //使用分局专题接口
  },
  data() {
    return {
      elChlname: "",
      options: [],
      prop: {
        label: "chlName",
        value: "chlId",
        expandTrigger: "hover",
        checkStrictly: true,
        emitPath: false,
        lazy: true,
        lazyLoad: (node, resolve) => {
          let parentId = node.data ? node.data.chlId : "";
          if (this.maxLevel && node.level && node.level >= this.maxLevel) {
            resolve([]);
            return;
          }
          let apiParams = [
            this.pageIsAreaLimit,
            parentId,
            this.attributionMode
          ];
          let chlApiFun = () => {
            if (this.branchAssessApi) {
              return branchAssessApi.getSubjectChlDropDownOptions(...apiParams);
            } else {
              return componentApi.getChlDropDownOptions(...apiParams);
            }
          };

          chlApiFun().then(res => {
            resolve(res);
            //默认取第一个
            if (!parentId && res.length && !this.chlId && this.defaultSelect) {
              let data = res[0];
              this.handleChange(data);
            }
          });
        }
      }
    };
  },
  computed: {
    ...mapState("pcCityStore", ["pageIsAreaLimit"])
  },
  emits: ["update:chlId", "change"],
  created() {
    this.elChlname = this.initSelectedContent;
    // this.start();
  },
  watch: {
    initSelectedContent() {
      this.elChlname = this.initSelectedContent;
    }
  },
  methods: {
    ...mapMutations("pcCityStore", ["setSelectChlInfo"]),
    handleChange(data = null) {
      let currentArr = this.$refs.cascader.getCheckedNodes();
      if (!data && Array.isArray(currentArr) && currentArr[0]) {
        data = currentArr[0].data;
      }
      if (!data) {
        data = {
          chlId: "",
          chlName: "",
          chlLvl: 0
        };
      }

      this.updateChlId(data.chlId);
      this.elChlname = data.chlName;
      this.setSelectChlInfo(data);
      //todo 是否要使用vuex
      this.$emit("change", data.chlId, data.chlLvl, data.chlName);
    },
    updateChlId(chlId) {
      this.$emit("update:chlId", chlId);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

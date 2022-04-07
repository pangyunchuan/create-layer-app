<style lang="scss" scoped>
.datasetEdit {
  > .header {
    width: 100%;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    border-bottom: 1px solid #4d4d4d;
    margin-bottom: 15px;

    > .title {
      font-family: "YouSheBiaoTiHei";
      font-weight: 400;
      font-size: 28.84px;
      color: #fff;
    }
  }

  $contentWidth: calc(100% - 40px);

  > .content {
    border: 1px solid #4d4d4d;
    position: relative;
    //去掉
    height: calc(100% - 60px - 30px - 70px);
    width: $contentWidth;
    margin: 0 auto;
    //background-color: red;
    border-bottom: 1px solid #4d4d4d;
    background: #323232;

    &.noControl {
      height: calc(100% - 60px - 30px);
    }
  }

  > .control {
    background: #323232;
    margin: 0 auto;
    height: 70px;
    padding: 20px 20px 0 20px;
    width: $contentWidth;
    border: 1px solid #4d4d4d;
    border-bottom: 1px solid #4d4d4d;
    display: flex;
    justify-content: space-between;
  }
}
</style>
<template>
  <FullPage class="datasetEdit">
    <div class="header">
      <div class="title">
        <slot name="title"></slot>
      </div>
      <Steps :step="step"></Steps>
      <slot name="buttons">
        <div></div>
      </slot>
    </div>
    <div class="content" :class="{noControl:noControl}">
      <component
          v-for="stepItem in step.items"
          v-show="stepItem.isCurrent"
          :stepItem="stepItem"
          :is="stepItem.component"
      />
    </div>
    <div v-if="!noControl" class="control">
      <el-button v-if="step.canPre" icon="arrow-left" @click="step.preItem()" type="primary">上一步</el-button>
      <div>
        <!--        占用用,防止右边滑到左边-->
      </div>
      <el-button v-if="step.canNext" @click="step.nextItem()" type="primary">
        下一步
        <el-icon class="el-icon--right">
          <arrow-right />
        </el-icon>
      </el-button>
    </div>
  </FullPage>
</template>

<script lang="ts" setup>
import "@/assets/fonts/YouSheBiaoTiHei/ft_yhbth.css";
import FullPage from "@/modules/components/layout/FullPage.vue";
import Steps from "@/modules/diyChart/components/step/Steps.vue";
import { Ref, toRefs } from "vue";
import StepMan from "@/modules/diyChart/components/step/StepMan";
import { UnwrapNestedRefs } from "@vue/reactivity";

const props = withDefaults(defineProps<{
  step: UnwrapNestedRefs<StepMan>,
  noControl?: boolean
}>(), {
  noControl: false
});

let { step } = $(toRefs(props));


// const router = useRouter();


// function back() {
//   if (!dataSetEditPage.isModify) {
//     router.back();
//     return;
//   }
//   ElMessageBox.confirm("确定放弃编辑?", {
//     cancelButtonText: "取消",
//     confirmButtonText: "确定放弃"
//   }).then(() => {
//     router.back();
//   }).catch(() => {
//   });
// }


</script>


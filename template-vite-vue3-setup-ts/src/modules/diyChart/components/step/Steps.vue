<style lang="scss" scoped>

</style>
<template>
  <el-button-group>
    <el-button
        v-for="(stepItem,i) in step.items"
        :key="stepItem.text"
        :icon="stepItem.icon"
        :type="stepItem.buttonType"
        @click="step.setCurrent(i)"
    >
      {{ stepItem.text }}
      <el-icon v-if="!step.isStepNotShowState" class="el-icon--right">
        <ArrowRight v-show="stepItem.isWait && i !== step.items.length - 1" />
        <close v-show="stepItem.isError" />
        <check v-show="stepItem.isSuccess" />
      </el-icon>
    </el-button>
  </el-button-group>
</template>

<script lang="ts" setup>
import StepMan from "@/modules/diyChart/components/step/StepMan";
import { UnwrapNestedRefs } from "@vue/reactivity";

const props = defineProps<{
  step: UnwrapNestedRefs<StepMan>
}>();

</script>


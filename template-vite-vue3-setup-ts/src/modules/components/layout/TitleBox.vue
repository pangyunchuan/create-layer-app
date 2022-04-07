<style lang="scss" scoped>
.titleBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;

  h3 {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.8);
    display: block;
    position: relative;
  }

  .right {
    display: flex;
    justify-content: flex-end;
    align-self: flex-start;
    flex: 1;

    > :deep * {
      margin: 5px;
    }
  }
}
</style>

<template>
  <div>
    <div class="titleBox" v-bind="$attrs">
      <h3 v-if="slots.default">
        <slot></slot>
      </h3>
      <slot v-if="slots.left" name="left"></slot>
      <div v-if="slots.right" class="right">
        <slot name="right"></slot>
      </div>
    </div>
    <el-divider style="margin:5px 0;border-color: #4D4D4D" />
  </div>
</template>
<script lang="ts" setup>
import { useSlots } from "vue";

const slots = useSlots();
</script>


<style lang="scss" scoped>
.optionBox11 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 10px;

  .left {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    > :deep * {
      margin: 5px;
    }
  }

  .right {
    display: flex;
    //flex-wrap: wrap;
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
  <div class="optionBox11">
    <div class="left">
      <slot></slot>
    </div>
    <div v-if="slots.right" class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSlots } from "vue";

const slots = useSlots();
</script>


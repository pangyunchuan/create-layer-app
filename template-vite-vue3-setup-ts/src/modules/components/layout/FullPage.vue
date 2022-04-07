<style lang="scss" scoped>
.fullPage {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: v-bind(backgroundColor);
}
</style>
<template>
  <div class="fullPage">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  backgroundColor?: string
}>(), {
  backgroundColor: "#2b2b2b"
});
</script>


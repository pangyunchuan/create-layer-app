<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;

  .name {
    margin-right: 5px;
  }

  .content {
    width: 165px;
  }
}
</style>
<template>
  <div class="item">
    <span v-if="name" class="name"> {{ name }} </span>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  name?: string
}>();

</script>


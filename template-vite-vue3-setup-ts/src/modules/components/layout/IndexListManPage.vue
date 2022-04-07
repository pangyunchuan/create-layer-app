<style lang="scss" scoped>
.listManPage {
  padding: 10px 10px 20px 10px;
  display: flex;
  flex-direction: column;

  > :deep * {
    margin-bottom: 10px;
  }
}


</style>

<template>
  <div class="listManPage">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
</script>


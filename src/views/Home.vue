<script setup lang="ts">
</script>

<template>
  <div class="main_content">
    <h1 class="main_content__title">Home</h1>
  </div>
</template>

<style scoped lang="scss">
  @import "../variables.scss";

  .main_content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 100svh;
    background-color: $bg-color;

    &__title {
      color: $text-color-white;
    }
  }

</style>
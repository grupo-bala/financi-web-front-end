<script setup lang="ts">

const props = defineProps<{
  text: string,
}>();

</script>
<template>
  <div class="container">
    {{ props.text }}
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";

  .container {
    display: flex;
    width: 172px;
    height: 32px;
    border-radius: 5px;
    background-color: $child-card-bg-color;
    color: $text-button-color;
    font-weight: bold;
    font-size: 15px;
    letter-spacing: 0.08em;
    justify-content: center;
    align-items: center;
    color: $text-color-white;
  }
</style>
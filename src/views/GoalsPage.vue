<script setup lang="ts">
import GoalsList from "../components/GoalsList.vue";
</script>

<template>
  <GoalsList
    :quantity="2"
    :show-load-more="true"
  />
</template>

<style scoped lang="scss">
@import "../variables.scss";
</style>
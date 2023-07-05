<script setup lang="ts">
import PieChart, { PieChartData } from "./PieChart.vue";

const props = defineProps<{
  entries: PieChartData,
  outs: PieChartData,
}>();

</script>

<template>
  <div class="categories_chart">
    <PieChart
      title="Entradas por categoria"
      :data="props.entries"
    />
    <PieChart
      title="Saídas por categoria"
      :data="props.outs"
    />
  </div>
</template>

<style scoped lang="scss">
.categories_chart {
  display: flex;
  flex-direction: column;
  gap: 5rem;

  @media (min-width: 800px) {
    & {
      flex-direction: row;
      justify-content: space-around;
    }
  }
}
</style>
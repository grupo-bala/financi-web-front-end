<script setup lang="ts">
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";

export interface PieChartData {
  labels: string[],
  datasets: {
    label?: string,
    backgroundColor: string[],
    data: number[],
  }[],
}

const props = defineProps<{
  data: PieChartData,
  title?: string,
}>();

Chart.register(ArcElement, Tooltip, Legend);
</script>

<template>
  <div class="pie_chart">
    <h2 class="pie_chart__title">
      {{ props.title }}
    </h2>
    <Pie
      :options="{
        responsive: true,
        maintainAspectRatio: false,
        color: '#ffffff',
        font: {
          family: 'Montserrat'
        },
        borderColor: 'transparent'
      }"
      :data="props.data"
    />
  </div>
</template>

<style scoped lang="scss">
.pie_chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 300px;

  &__title {
    font-weight: bold;
  }
}
</style>
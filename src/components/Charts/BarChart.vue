<script setup lang="ts">
import { Bar } from "vue-chartjs";
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

export interface BarChartData {
  labels: string[],
  datasets: {
    label?: string,
    backgroundColor: string,
    data: number[],
  }[],
}

const props = defineProps<{
  data: BarChartData,
  xAxis: string,
}>();

Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
</script>

<template>
  <div class="bar_chart">
    <Bar
      :options="{
        responsive: true,
        maintainAspectRatio: false,
        color: '#ffffff',
        font: {
          family: 'Montserrat',
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (tooltip) => {
                return `R$ ${tooltip.parsed.y.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                })}`;
              }
            }
          }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Total'
            }
          },
          x: {
            title: {
              display: true,
              text: props.xAxis,
            }
          }
        }
      }"
      :data="props.data"
      :style="{
        height: '100%'
      }"
    />
  </div>
</template>

<style scoped lang="scss">
.bar_chart {
  width: 100%;
  height: 40vh;
  margin-bottom: 2rem;

  @media (min-width: 800px) {
    width: auto;
    height: 500px;
  }
}
</style>
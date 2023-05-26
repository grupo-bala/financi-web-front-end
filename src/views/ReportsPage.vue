<script setup lang="ts">
import { ref, watch } from "vue";
import InputField from "../components/InputField.vue";
import BarChart, { BarChartData } from "../components/Charts/BarChart.vue";
import CategoriesChart from "../components/Charts/CategoriesChart.vue";
import axios, { AxiosError } from "axios";
import { displayDate } from "../utils/Dates";
import { PieChartData } from "../components/Charts/PieChart.vue";

interface TransactionsByPeriod {
  data: {
    date: number,
    entries_sum: number,
    outs_sum: number,
  }[],
}

interface CategoriesByPeriod {
  data: {
    category: string,
    entries_sum: number,
    outs_sum: number,
  }[],
}

interface ErrorResponse {
  msg: string,
}

const baseURL = import.meta.env.VITE_API_URL;
const viewToAxis = {
  "Day": "Dias",
  "Week": "Semanas",
  "Month": "Meses",
};

const initDate = ref("");
const endDate = ref("");
const view = ref<"Day" | "Week" | "Month">("Day");
const isLoadingTransactions = ref(false);
const isLoadingCategories = ref(false);
const isFirstLoad = ref(true);
const error = ref("");
const transactionsData = ref<BarChartData>({
  labels: [],
  datasets: [
    {
      label: "Entradas",
      backgroundColor: "#49AD5A",
      data: [],
    },
    {
      label: "Saídas",
      backgroundColor: "#EF5350",
      data: [],
    },
  ],
});

const categoriesInData = ref<PieChartData>({
  labels: [],
  datasets: [
    {
      backgroundColor: [],
      data: [],
    },
  ],
});

const categoriesOutData = ref<PieChartData>({
  labels: [],
  datasets: [
    {
      backgroundColor: [],
      data: [],
    },
  ],
});

function loadTransactions() {
  isLoadingTransactions.value = true;
  isLoadingCategories.value = true;
  error.value = "";

  axios.get<TransactionsByPeriod>(
    `${baseURL}/stats/get-transactions-by-period?
      view=${view.value}&
      initDate=${initDate.value}&
      endDate=${endDate.value}
    `.replaceAll(/^\s+|\n/gm, ""),
  ).then((res) => {
    const newChartData: BarChartData = {
      labels: [],
      datasets: [
        {
          label: "Entradas",
          backgroundColor: "#49AD5A",
          data: [],
        },
        {
          label: "Saídas",
          backgroundColor: "#EF5350",
          data: [],
        },
      ],
    };

    res.data.data.forEach((column) => {
      newChartData.labels.push(formatDate(column.date.toString()));
      newChartData.datasets[0].data.push(column.entries_sum);
      newChartData.datasets[1].data.push(column.outs_sum);
    });

    transactionsData.value = newChartData;
    isLoadingTransactions.value = false;
    isFirstLoad.value = false;
  }).catch((e) => {
    const axiosError = e as AxiosError;
    const response = axiosError.response?.data as ErrorResponse;
    error.value = response.msg;
    isLoadingTransactions.value = false;
  });
}

function loadCategories() {
  axios.get<CategoriesByPeriod>(
    `${baseURL}/stats/get-categories-by-period?
      initDate=${initDate.value}&
      endDate=${endDate.value}
    `.replaceAll(/^\s+|\n/gm, ""),
  ).then((res) => {
    const colors = [
      "#49AD5A",
      "#168CC0",
      "#E99CBB",
      "#FF9800",
      "#A1887F",
      "#FFEE58",
      "#B39DDB",
      "#EF5350",
    ];

    const newCategoriesInData: PieChartData = {
      labels: [],
      datasets: [
        {
          backgroundColor: colors,
          data: [],
        },
      ],
    };

    const newCategoriesOutData: PieChartData = {
      labels: [],
      datasets: [
        {
          backgroundColor: colors,
          data: [],
        },
      ],
    };

    res.data.data.forEach((item) => {
      newCategoriesInData.labels.push(item.category);
      newCategoriesInData.datasets[0].data.push(item.entries_sum);
      newCategoriesOutData.labels.push(item.category);
      newCategoriesOutData.datasets[0].data.push(item.outs_sum);
    });

    categoriesInData.value = newCategoriesInData;
    categoriesOutData.value = newCategoriesOutData;
    isLoadingCategories.value = false;
    isFirstLoad.value = false;
  }).catch((e) => {
    const axiosError = e as AxiosError;
    const response = axiosError.response?.data as ErrorResponse;
    error.value = response.msg;
    isLoadingCategories.value = false;
  });
}

async function loadData() {
  loadTransactions();
  loadCategories();
}

function formatDate(date: string): string {
  if (view.value === "Day") {
    return displayDate(date);
  } else {
    const [left, year] = date.split("/");
    const leftDigits = 2;
    return `${left.padStart(leftDigits, "0")}/${year}`;
  }
}

watch(view, () => {
  loadTransactions();
});
</script>

<template>
  <div class="reports">
    <div class="reports__container">
      <div class="reports__container__header">
        <h1>Relatório financeiro</h1>
        <form class="reports__container__header__form">
          <InputField
            v-model="initDate"
            type="Date"
            label="Data de início"
            placeholder="Data de início"
            :required="false"
            :numeric="false"
          />
          <InputField
            v-model="endDate"
            type="Date"
            label="Data final"
            placeholder="Data final"
            :required="false"
            :numeric="false"
          />
          <p
            v-if="error.length > 0"
            class="reports__container__header__form__error"
          >
            {{ error }}
          </p>
          <button
            class="reports__container__header__form__button"
            @click.prevent="loadData"
          >
            <h4>Gerar análise</h4>
          </button>
        </form>
      </div>
      <div class="reports__container__charts">
        <div
          v-if="!isFirstLoad"
          class="reports__container__charts__bar"
        >
          <div class="reports__container__charts__bar__info">
            <h2>Entradas e saídas</h2>
            <div>
              <button
                class="reports__container__charts__bar__info__button"
                @click="view = 'Day'"
              >
                Dia
              </button>
              <button
                class="reports__container__charts__bar__info__button"
                @click="view = 'Week'"
              >
                Semana
              </button>
              <button
                class="reports__container__charts__bar__info__button"
                @click="view = 'Month'"
              >
                Mês
              </button>
            </div>
          </div>
          <BarChart
            title="Entradas e saídas por período"
            :data="transactionsData"
            :x-axis="viewToAxis[view]"
          />
        </div>
        <hr v-if="!isFirstLoad">
        <CategoriesChart
          v-if="!isFirstLoad"
          :entries="categoriesInData"
          :outs="categoriesOutData"
        />
        <h3
          v-if="isFirstLoad"
        >
          Selecione um período para gerar a visualização
        </h3>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";

.reports {
  min-height: 100dvh;
  width: 100%;
  color: $text-color-white;
  padding: 5rem 2rem;
  display: flex;
  justify-content: center;

  &__container {
    width: 100%;
    max-width: 1000px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    &__header {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;

      &__form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;

        &__error {
          color: $financi-red;
          font-size: .8em;
          grid-column: 1 / 3;
        }

        button {
          height: 2rem;
          border-radius: $border-radius;
          text-align: center;
          background-color: $financi-green;
          color: $text-color-white;
          margin-top: 1rem;
          border: none;
          cursor: pointer;
          grid-column: 1 / 3;
        }
      }
    }

    &__charts {
      display: flex;
      flex-direction: column;

      hr {
        opacity: .5;
        margin-bottom: 2rem;

        @media (max-width: 800px) {
          display: none;
        }
      }

      &__bar {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        &__info {
          display: flex;
          justify-content: space-between;
          align-items: center;

          h2 {
            font-size: 1.2em;
          }

          &__button {
            background-color: transparent;
            color: $text-color-white;
            border-radius: 10px;
            padding: .5rem;
            border: 1px solid $financi-green;
            outline: none;
            margin-left: 5px;
            cursor: pointer;
            transition: background-color .1s;
            font-weight: bold;
            font-size: .6em;

            &:hover {
              background-color: $financi-green;
              color: $bg-color;
            }
          }
        }
      }
    }
  }
}

@media (min-width: 800px) {
  .reports {
    &__container {
      background-color: $card-bg-color;
      border-radius: $border-radius;
      box-shadow: $box-shadow;
      padding: 3rem;

      &__charts {
        margin-bottom: 2rem;
      }

      &__header {
        h1 {
          align-self: flex-start;
        }
      }
    }
  }
}
</style>
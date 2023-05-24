<script setup lang="ts">
import { computed, ref } from "vue";
import axios from "axios";
import { Categories } from "../types/Category";
import { displayDate } from "../utils/Dates";
import router from "../router/index";
import SuspenseBox from "./Suspense/SuspenseBox.vue";

type Transaction = {
  value: string,
  categoryId: number,
  title: string,
  isEntry: boolean,
  date: string,
  id: number,
};

type SuccesfulReponse = {
  data: Transaction[],
  pages: number,
};

const props = defineProps<{
  quantity: number,
  showDates?: boolean,
  showLoadMore?: boolean,
}>();

const baseURL = import.meta.env.VITE_API_URL as string;
const initialPage = 0;
const isLoading = ref(true);
const page = ref(initialPage);
const totalPages = ref(initialPage);
const transactions = ref<Transaction[]>([]);
const dates = computed(() => {
  if (!transactions.value.length) {
    return [];
  }

  const initialIndex = 0;
  const uniqueDates = [transactions.value[initialIndex].date];
  const unitOffset = 1;

  for (let i = 1; i < transactions.value.length; i++) {
    const currentDate = transactions.value[i].date;
    const previousDate = transactions.value[i - unitOffset].date;

    if (
      displayDate(currentDate) !==
      displayDate(previousDate)
    ) {
      uniqueDates.push(transactions.value[i].date);
    }
  }

  return uniqueDates;
});

const categoryToIcon = {
  "Saúde": "fa-briefcase-medical",
  "Alimentação": "md-foodbank-round",
  "Educação": "md-school-round",
  "Entretenimento": "gi-popcorn",
  "Vestuário": "gi-clothes",
  "Cuidados pessoais": "gi-comb",
};

async function getTransactions() {
  isLoading.value = true;
  try {
    page.value++;
    const res = await axios.get<SuccesfulReponse>(
      `${baseURL}/get-all-transactions-preview?
        page=${page.value}&
        size=${props.quantity}
      `.replaceAll(/^\s+|\n/gm, ""),
    );

    transactions.value = transactions.value.concat(res.data.data);
    totalPages.value = res.data.pages;
    isLoading.value = false;
  } catch (e) {
    router.push("/ops");
  }
}

function getFormatedDate(date: string) {
  return displayDate(date);
}

function getNumberAsCurrency(value: string) {
  return Number(value)
    .toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}

function getIconNameFromCategoryId(id: number) {
  return categoryToIcon[
    Categories[id as keyof typeof Categories] as keyof typeof categoryToIcon
  ];
}

function getDateCardFormat(date: string) {
  const dateString = displayDate(date);
  const dateDay = Number(dateString.split("/")[0]);
  const today = new Date().getDate();
  const prefixText = dateDay === today ? "Hoje - " : "";

  return prefixText + dateString;
}

getTransactions();
</script>

<template>
  <div>
    <SuspenseBox
      :is-loading="isLoading && page === 1"
      loading-width="100%"
      loading-height="70px"
      :quantity="props.quantity"
    >
      <ul
        v-for="date of dates"
        :key="date"
        class="transactions_list"
      >
        <li
          v-if="props.showDates"
          class="transactions_list__date"
        >
          {{ getDateCardFormat(date) }}
        </li>
        <li
          v-for="transaction of transactions.filter(t => t.date === date)"
          :key="transaction.id"
          class="transactions_list__item"
        >
          <div class="transactions_list__item__left">
            <v-icon
              :name="getIconNameFromCategoryId(transaction.categoryId)"
              scale="2"
            />
            <div class="transactions_list__item__left__info">
              <span class="transactions_list__item__left__info__title">
                {{ transaction.title }}
              </span>
              <span class="transactions_list__item__left__info__date">
                {{ getFormatedDate(transaction.date) }}
              </span>
            </div>
          </div>
          <div
            v-if="transaction.isEntry"
            class="transactions_list__item__right--in"
          >
            + R$ {{ getNumberAsCurrency(transaction.value) }}
          </div>
          <div
            v-else
            class="transactions_list__item__right--out"
          >
            - R$ {{ getNumberAsCurrency(transaction.value) }}
          </div>
        </li>
      </ul>
    </SuspenseBox>
    <SuspenseBox
      :is-loading="isLoading && page > 1"
      loading-width="100%"
      loading-height="70px"
      :quantity="props.quantity"
    />
    <button
      v-if="props.showLoadMore && totalPages !== page"
      :disabled="isLoading"
      @click="getTransactions()"
    >
      <h4>VER MAIS</h4>
    </button>
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";
.transactions_list {
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;

  &__date {
    padding: .5rem;
    background-color: rgba($small-card, .2);
    width: fit-content;
    border-radius: $border-radius;
    font-weight: 500;
  }

  &__item {
    background-color: $card-bg-color;
    padding: 1rem;
    border-radius: $border-radius;
    box-shadow: $box-shadow;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__left {
      display: flex;
      align-items: center;
      gap: .5rem;

      &__info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: 40vw;

        &__title {
          font-weight: bold;
          font-size: .8em;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        &__date {
          font-size: .8em;
          opacity: .5;
        }
      }
    }

    &__right {
      &--in {
        color: $financi-green;
      }

      &--out {
        color: $financi-red;
      }

      &--in, &--out {
        font-weight: bold;
        white-space: nowrap;
        font-size: .8em;
      }
    }
  }
}

button {
  width: 100%;
  height: 2rem;
  border-radius: $border-radius;
  text-align: center;
  background-color: $financi-green;
  color: $text-color-white;
  margin-top: 1rem;
  border: none;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: .2;
  }
}

@media (min-width: 800px) {
  .transactions_list {
    &__item {
      background-color: $child-card-bg-color;
    }
  }
}
</style>
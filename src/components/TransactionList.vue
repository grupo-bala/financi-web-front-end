<script setup lang="ts">
import { computed, ref, watch } from "vue";
import axios from "axios";
import { displayDate } from "../utils/Dates";
import SuspenseBox from "./Suspense/SuspenseBox.vue";
import { Transaction } from "../types/Transaction";
import { useTransactionsStore } from "../stores/transactionsStore";
import { useDebounceFn } from "@vueuse/core";
import TransactionCard from "./TransactionCard.vue";

type SuccesfulReponse = {
  data: Transaction[],
  pages: number,
};

const props = defineProps<{
  quantity?: number,
  showDates?: boolean,
  showLoadMore?: boolean,
  search?: string,
  forceReload?: boolean,
}>();

const baseURL = import.meta.env.VITE_API_URL as string;
const isLoading = ref(true);
const transactions = useTransactionsStore();
const isEntry = ref(false);
const popupIsOpen = ref(false);
const currentTransaction = ref<Transaction>();

const transactionsList = computed(() => {
  const empty = 0;
  return props.showLoadMore
    ? transactions.data
    : transactions.get(props.quantity ?? empty);
});

const dates = computed(() => {
  if (!transactionsList.value.length) {
    return [];
  }

  const initialIndex = 0;
  const uniqueDates = [transactionsList.value[initialIndex].date];
  const unitOffset = 1;

  for (let i = 1; i < transactionsList.value.length; i++) {
    const currentDate = transactionsList.value[i].date;
    const previousDate = transactionsList.value[i - unitOffset].date;

    if (
      displayDate(currentDate) !==
      displayDate(previousDate)
    ) {
      uniqueDates.push(transactionsList.value[i].date);
    }
  }

  return uniqueDates;
});

async function getTransactions() {
  isLoading.value = true;

  if (props.forceReload) {
    transactions.clear();
  }

  if (props.search !== undefined && props.search !== transactions.search) {
    transactions.search = props.search;
    transactions.clear();
  } else if (transactions.page >= transactions.total && transactions.total) {
    isLoading.value = false;
    return;
  }

  const res = await axios.get<SuccesfulReponse>(
    `${baseURL}/get-all-transactions-preview?
      page=${transactions.page}&
      size=10&
      search=${props.search ?? ""}
    `.replaceAll(/^\s+|\n/gm, ""),
  );

  const initIndex = 0;
  const endIndex = 10;

  transactions.concat(res.data.data.map((t) => {
    return {
      ...t,
      date: t.date.slice(initIndex, endIndex),
    };
  }));
  transactions.nextPage();
  transactions.setTotalPages(res.data.pages);

  isLoading.value = false;
}

const delay = 500;
const debounceFetch = useDebounceFn(
  getTransactions,
  delay,
);

function getDateCardFormat(date: string) {
  const dateString = displayDate(date);
  const dateDay = Number(dateString.split("/")[0]);
  const today = new Date().getDate();
  const prefixText = dateDay === today ? "Hoje - " : "";

  return prefixText + dateString;
}

watch(() => props.search, () => {
  debounceFetch();
});

getTransactions();
</script>

<template>
  <div>
    <div v-if="isLoading || !isLoading && transactions.data.length > 0">
      <SuspenseBox
        :is-loading="isLoading"
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
            v-for="transaction of transactionsList.filter(t => t.date === date)"
            :key="transaction.id"
            @click="[
              popupIsOpen = true,
              isEntry = transaction.isEntry,
              currentTransaction = transaction
            ]"
          >
            <TransactionCard
              :transaction="transaction"
            />
          </li>
        </ul>
      </SuspenseBox>
      <button
        v-if="props.showLoadMore && transactions.total > transactions.page"
        aria-label="ver mais transações"
        class="transactions_list__see_more"
        :disabled="isLoading"
        @click="getTransactions()"
      >
        <h4>VER MAIS</h4>
      </button>
    </div>
    <div
      v-else
      class="transacions_list"
    >
      <h3>Ainda não há transações</h3>
    </div>
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

  &:not(:nth-child(1)) {
    margin-top: 1rem;
  }

  &__date {
    padding: .5rem;
    background-color: rgba($small-card, .2);
    width: fit-content;
    border-radius: $border-radius;
    font-weight: 500;
  }

  &__see_more {
    width: 100%;
    height: 2rem;
    border-radius: $border-radius;
    text-align: center;
    background-color: $financi-green;
    color: $text-color-black;
    margin-top: 1rem;
    border: none;
    cursor: pointer;

    h4 {
      letter-spacing: 0.08rem;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: .2;
    }
  }
}
</style>
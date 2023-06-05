<script setup lang="ts">
import { computed, ref, watch } from "vue";
import axios from "axios";
import { Categories } from "../types/Category";
import { displayDate } from "../utils/Dates";
import SuspenseBox from "./Suspense/SuspenseBox.vue";
import InfoPopup from "./Popup/InfoOperationPopup.vue";
import { Transaction } from "../types/Transaction";
import { useTransactionsStore } from "../stores/transactionsStore";
import { useDebounceFn } from "@vueuse/core";

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

function operationType(isEntry: boolean): "Income" | "Out" {
  if (isEntry) {
    return "Income";
  }

  return "Out";
}

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

  transactions.concat(res.data.data);
  transactions.nextPage();
  transactions.setTotalPages(res.data.pages);

  isLoading.value = false;
}
const delay = 500;
const debounceFetch = useDebounceFn(
  getTransactions,
  delay,
);

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

watch(() => props.search, () => {
  debounceFetch();
});

getTransactions();
</script>

<template>
  <div>
    <div v-if="transactions.data.length > 0">
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
            class="transactions_list__item"
            @click="[
              popupIsOpen = true,
              isEntry = transaction.isEntry,
              currentTransaction = transaction
            ]"
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
        <InfoPopup
          v-if="popupIsOpen"
          :operation="currentTransaction!"
          :type="operationType(isEntry)"
          @close="popupIsOpen = false"
        />
      </SuspenseBox>
      <SuspenseBox
        :is-loading="isLoading && page > 1"
        loading-width="100%"
        loading-height="70px"
        :quantity="props.quantity"
      />
      <button
        v-if="props.showLoadMore && transactions.total > transactions.page"
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

  &__item {
    background-color: $card-bg-color;
    padding: 1rem;
    border-radius: $border-radius;
    box-shadow: $box-shadow;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    &__left {
      display: flex;
      align-items: center;
      gap: .5rem;
      flex-grow: 1;
      overflow: hidden;

      &__info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        flex-grow: 1;

        &__title {
          font-weight: bold;
          font-size: .8em;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          max-width: 80%;
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
        justify-self: end;
        align-self: center;
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
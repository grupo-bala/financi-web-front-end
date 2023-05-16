<script setup lang="ts">

import { ref } from "vue";
import Transaction from "../components/TransactionComponent.vue";
import Logo from "../components/LogoFinanci.vue";
import Filter from "../components/FilterButton.vue";
import TextBox from "../components/TextBox.vue";
//import axios, { AxiosError } from "axios";
import axios from "axios";

const envUrl = import.meta.env.VITE_API_URL!;
const page = 1;
const currentPage = ref(page);

interface TransactionsPreview {
    titleTransaction: string;
    publishDate: string;
    imgCategory: string;
    valueAmount: number;
}

const transactions = ref<TransactionsPreview[]>([]);
const howManyPages = ref<number>();

async function getAllTransaction() {
  const response = await axios.get(
    `${envUrl}/get-all-transactions-preview?page=${currentPage.value}
      &size=10`);
  const json = await response.data;
  howManyPages.value = json.pages;
  transactions.value = json.data;
}

function seeMore() {
  currentPage.value++;
  getAllTransaction();
}

getAllTransaction();

</script>

<template>
  <div class="main_container">
    <div class="main_container__transactions_box">
      <div class="main_container__transactions_box__title_filter">
        <h1 class="main_container__transactions_box__title_filter__text">
          Histórico de transações
        </h1>
        <Filter
          class="main_container__transactions_box__title_filter__filter"
        />
      </div>
      <div class="main_container__transactions_box__display">
        <TextBox
          class="main_container__transactions_box__display__textBox"
          text="Recentes"
        />
        <li
          v-for="{
            valueAmount,
            titleTransaction,
            publishDate,
            imgCategory} in transactions"
          :key="valueAmount"
          class="main_container__transactions_box__display__transactions-list"
        >
          <Transaction
            :title="titleTransaction"
            :date="publishDate"
            :category="imgCategory"
            :value="valueAmount"
          />
        </li>
        <Transaction
          title="Mensalidade Estácio"
          date="2 de Julho, 2022"
          category="Payments"
          :value="2000.00"
        />
        <TextBox
          class="main_container__transactions_box__display__textBox"
          text="Outros dias"
        />
        <button
          class="main_container__transactions_box__display__seeMore-button"
          :disabled="howManyPages === currentPage"
          @click="seeMore"
        >
          See More
        </button>
      </div>
    </div>
    <Logo />
  </div>
</template>

<style scoped lang="scss">
    @import "../variables.scss";

    .main_container {
        display: flex;
        color: $text-color-white;
        align-items: center;
        justify-content: space-evenly;
        background-color: $bg-color;
        flex-direction: column;
        margin: 0;
        min-height: 100vh;

        &__transactions_box {
            height: auto;
            border-radius: 15px;
            justify-content: space-evenly;
            display: flex;
            flex-direction: column;

            @media (min-width: 320px) {
              background-color: $bg-color; //realColor
              width: 412px;
            }
            @media (min-width: 600px) {
              background-color: $card-bg-color; //realColor
              width: 688px;
            }
            @media (min-width: 1444px) {
              background-color: $card-bg-color; //realColor
              width: 1500px;
            }

            &__display {
              display: flex;
              gap: 15px;
              flex-direction: column;
              align-items: left;
              height: auto; //new height
              margin-bottom: 20px;

              &__textBox {
                margin-top: 83px;
                margin-bottom: 27px;

                @media (min-width: 320px) {
                  margin-top: 27px;
                }
              }

              &__seeMore-button {
                border-color: $financi-green;
                background-color: $financi-green;
                color: $financi-green;
                color: $text-color-white;
                border-radius: 5px;
                cursor:pointer;

                &:disabled {
                  cursor: not-allowed;
                  opacity: 0.6;
                }

                @media (min-width: 320px) {
                  width: 362px;
                  height: 41px;
                }
                @media (min-width: 600px) {
                  width: 618px;
                  height: 31px;
                }
                @media (min-width: 1444px) {
                  width: 1425px;
                  height: 31px;
                }
              }

              &__transactions-list {
                list-style: none;
              }

              @media (min-width: 320px) {
                width: 385px;
                margin-left: 25px;
              }
              @media (min-width: 600px) {
                width: 652px;
                margin-left: 35px;
              }
              @media (min-width: 1444px) {
                width: 1425px;
                margin-left: 35px;
              }

            }

            &__title_filter {
                display: flex;
                font-size: 13px;
                justify-content: space-between;
                flex-direction: column;
                border-radius: 15px;
                padding: 10px;
                margin-top: 33px;

                @media (max-width: 599px) {
                  align-items: center;
                  height: 120px;
                }
                @media (min-width: 600px) {
                  margin-left: 25px;
                  align-items: left;
                  height: 100px;

                }
            }
        }
    }
</style>
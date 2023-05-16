<script setup lang="ts">

import { ref } from "vue";
import Transaction from "../components/TransactionComponent.vue";
import Logo from "../components/LogoFinanci.vue";
import Filter from "../components/FilterButton.vue";
import TextBox from "../components/TextBox.vue";
import axios, { AxiosError } from "axios";

const envUrl = import.meta.env.VITE_API_URL!;
const feedback = ref("");
type Response = {msg: string};

interface TransactionsPreview {
    titleTransaction: string;
    publishDate: string;
    imgCategory: string;
    valueAmount: number;
}

const transactions = ref<TransactionsPreview[]>([]);
const howManyPages = ref<number>();

async function getAllTransaction() {
  try {
    const response = await axios.post(
      `${envUrl}/get-all-transactions-preview?page=1&size=4`);
    feedback.value = "";
    const json = await response.data;
    howManyPages.value = json.pages;
    transactions.value = json.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const response = axiosError.response?.data as Response;
    feedback.value = response.msg;
  }
}

getAllTransaction();

</script>

<template>
  <div class="main_container" style="color: white">
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
          v-for="{valueAmount,
                  titleTransaction,
                  publishDate,
                  imgCategory} in transactions"
          :key="titleTransaction"
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
        <Transaction
          title="Mensalidade Estácio"
          date="2 de Julho, 2022"
          category="Studies"
          :value="-2000.00"
        />
        <Transaction
          title="Mensalidade Estácio"
          date="2 de Julho, 2022"
          category="Hospital"
          :value="200.00"
        />
        <Transaction
          title="Mensalidade Estácio"
          date="2 de Julho, 2022"
          category="Payments"
          :value="2000.00"
        />
        <Transaction
          title="Mensalidade Estácio"
          date="2 de Julho, 2022"
          category="Studies"
          :value="-2000.00"
        />
        <Transaction
          title="Mensalidade Estácio"
          date="2 de Julho, 2022"
          category="Hospital"
          :value="200.00"
        />
        <Transaction
          title="Mensalidade Estácio"
          date="2 de Julho, 2022"
          category="Payments"
          :value="2000.00"
        />
        <Transaction
          title="Mensalidade Estácio"
          date="2 de Julho, 2022"
          category="Studies"
          :value="-2000.00"
        />
        <Transaction
          title="Mensalidade Estácio"
          date="2 de Julho, 2022"
          category="Hospital"
          :value="200.00"
        />
        <Transaction
          title="Mensalidade Estácio"
          date="2 de Julho, 2022"
          category="Payments"
          :value="2000.00"
        />
        <Transaction
          title="Mensalidade Estácio"
          date="2 de Julho, 2022"
          category="Studies"
          :value="-2000.00"
        />
        <TextBox
          class="main_container__transactions_box__display__textBox"
          text="Outros dias"
        />
      </div>
    </div>
    <Logo />
  </div>
</template>

<style scoped lang="scss">
    @import "../variables.scss";

    .main_container {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-direction: column;
        margin: 0;
        min-height: 100svh;
        background-color: $bg-color; //realColor
        //background-color: pink; //help

        &__transactions_box {
            height: auto;
            border-radius: 15px;
            //background-color: green; //help
            display: flex; //novo
            flex-direction: column;

            @media (min-width: 320px) {
            //  background-color: $bg-color; //realColor
              width: 412px;
            }
            @media (min-width: 600px) {
            //  background-color: $card-bg-color; //realColor
              width: 688px;
            }
            @media (min-width: 1444px) {
            //  background-color: $card-bg-color; //realColor
              width: 1500px;
            }

            &__display {
              display: flex;
              flex-direction: column;
              gap: 15px;
              align-items: left;
              height: auto; //new height
              //background-color: blue; //help
              margin-bottom: 27px;

              &__textBox {
                margin-top: 83px;
                margin-bottom: 27px;

                @media (min-width: 320px) {
                  margin-top: 27px;
                }
              }

              @media (min-width: 320px) {
                width: 412px;
                margin-left: 25px;
              }
              @media (min-width: 600px) {
                width: 688px;
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
                margin-top: 33px; //new
                //background-color: yellow; //help

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
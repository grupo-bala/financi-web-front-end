<script setup lang="ts">

//import { ref } from "vue";
import Transaction from "../components/TransactionComponent.vue";
import Logo from "../components/LogoFinanci.vue";
import Filter from "../components/FilterButton.vue";
import TextBox from "../components/TextBox.vue";

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
        <TextBox text="Hoje - 02 de julho" />
        <Transaction
          title="Mensalidade Estácio"
          date="2 de Julho, 2022"
          :value="100.00"
        />
        <Transaction
          title="Mensalidade Estácio"
          date="2 de Julho, 2022"
          :value="200.00"
        />
        <Transaction
          title="Mensalidade Estácio"
          date="2 de Julho, 2022"
          :value="2000.00"
        />
        <Transaction
          title="Mensalidade Estácio"
          date="2 de Julho, 2022"
          :value="-2000.00"
        />
      </div>
    </div>
    <Logo />
  </div>
</template>

<style scoped lang="scss">
    @import "../variables.scss";

    .main_container {
        display:flex;
        align-items: center;
        justify-content: space-evenly;
        flex-direction: column;
        margin: 0;
        min-height: 100svh;
        background-color: $bg-color;

        &__transactions_box {
            height: 600px;
            width: 688px;
            border-radius: 15px;

            @media (min-width: 320px) {
              background-color: $bg-color;
              width: 412px;
            }
            @media (min-width: 600px) {
              background-color: $card-bg-color;
              width: 688px;
            }

            &__display {
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              align-items: left;
              height: 500px;

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
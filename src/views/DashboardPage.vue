<script setup lang="ts">
import axios, { AxiosError } from "axios";
import { ref, onMounted } from "vue";
import PopupComponent from "../components/PopupComponent.vue";
import DashboarButton from "../components/DashboardButton.vue";
import Logo from "../components/LogoFinanci.vue";
import Greeting from "../components/GreetingCompenet.vue";
import MovimentsInfo from "../components/MovimentsInfo.vue";

const username = ref("");
const feedback = ref("");
const amount = ref("");
const visibility = ref(false);
/* Criar instancia do axios em outro arquivo */
const envUrl = import.meta.env.VITE_API_URL;
const popupIsOpen = ref(false);
const currentOperation = ref<"Income" | "Out" | "Goal">();

type ErrorResponse = { msg: string };
type SuccessResponse = {
  name: string,
  username: string,
  fixedIncome: number,
  balance: number,
  email: string,
}

function formatToMoney(value: string): string {
  const newValue = Number(value);
  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return newValue.toLocaleString("pt-BR", options);
}

async function getUserInfos() {
  try {
    const response = await axios.get<SuccessResponse>(
      `${envUrl}/get-me`,
    );
    feedback.value = "";
    username.value = response.data.username;
    amount.value = response.data.balance.toString();
  } catch (error) {
    const axiosError = error as AxiosError;
    const response = axiosError.response?.data as ErrorResponse;
    feedback.value = response.msg;
  }
}

onMounted(() => {
  getUserInfos();
});

</script>

<template>
  <div class="container">
    <div class="container__content">
      <Greeting :username="username" />
      <div class="container__content__balance">
        <div class="container__content__balance__top_content">
          <div class="container__content__balance__top_content__amount">
            <p
              class="container__content__balance__top_content__amount__title"
            >
              Saldo geral
            </p>
            <p
              v-if="visibility"
              class="container__content__balance__top_content__amount__value"
            >
              {{ "R$ " + formatToMoney(amount) }}
            </p>
            <p
              v-else
              class="
                container__content__balance__top_content__amount__value--hide
              "
            >
              R$ ----
            </p>
          </div>
          <v-icon
            v-if="visibility"
            name="md-visibility-round"
            scale="1.5"
            fill="gray"
            @click="visibility = !visibility"
          />
          <v-icon
            v-else
            name="md-visibilityoff-round"
            scale="1.5"
            fill="gray"
            @click="visibility = !visibility"
          />
        </div>
        <div class="container__content__balance__bottom_content">
          <MovimentsInfo
            type="Income"
            :value="formatToMoney(amount)"
          />
          <MovimentsInfo
            type="Out"
            :value="formatToMoney(amount)"
          />
        </div>
        <div class="container__content__balance__quick_actions_container">
          <h2
            class="container__content__balance__quick_actions_container__title"
          >
            Acesso rápido
          </h2>
          <div
            class="container__content__balance__quick_actions_container__button"
          >
            <DashboarButton
              type="Out"
              @click="[popupIsOpen = true, currentOperation = 'Out']"
            />
            <DashboarButton
              type="Income"
              @click="[popupIsOpen = true, currentOperation = 'Income']"
            />
            <DashboarButton
              type="Goal"
              @click="[popupIsOpen = true, currentOperation = 'Goal']"
            />
          </div>
          <PopupComponent
            v-if="popupIsOpen"
            :type="currentOperation"
            @close="popupIsOpen = false"
          />
        </div>
      </div>
      <div class="container__content__last_transactions">
        <h1>ultimas transações</h1>
      </div>
      <div class="container__content__goals">
        <h1>metas</h1>
      </div>
      <div class="container__content__news">
        <h1>noticias</h1>
      </div>
      <div class="container__content__lats_lessons">
        <h1>aulas</h1>
      </div>
    </div>
    <footer>
      <Logo />
    </footer>
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  background-color: $bg-color;
  min-height: 93.4dvh;

  &__content {
    display: grid;
    grid-template-rows: repeat(5, min-content);
    height: auto;
    width: 100%;
    max-width: 1280px;
    gap: 40px;
    padding: 30px;
    background-color: $bg-color;
    color: $text-color-white;

    &__balance {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: $card-bg-color;
      border-radius: 5px;
      box-shadow: $box-shadow;
      padding: 30px;

      &__top_content {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding-bottom: 20px;

        &__amount {
          display: flex;
          flex-direction: column;
          gap: 3px;
          border-left: 3px solid $financi-green;
          padding-left: 10px;

          &__title {
            color: $text-color-gray;
          }

          &__value {
            font-size: 1.5rem;
            font-weight: 600;

            &--hide {
              font-size: 1.5rem;
              font-weight: 600;
            }
          }
        }
      }

      &__bottom_content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-top: 1px solid rgba(128, 128, 128, 0.63);
        padding-top: 20px;
        width: 100%;
      }

      &__quick_actions_container {
        display: none;
      }
    }
  }
}

@media screen and (min-width: 800px) {
  .container {
    &__content {
      &__balance {
        display: grid;
        grid-template-columns: 0.9fr auto;
        grid-template-rows: 1fr 1fr;
        gap: 0 20px;
        transition: all 1s;

        &__top_content {
          grid-column: 1 / 2;
          grid-row: 1 / 2;
        }

        &__bottom_content {
          grid-column: 1 / 2;
          grid-row: 2 / 3;
        }

        &__quick_actions_container {
          display: grid;
          height: 100%;
          grid-template-rows: auto 1fr;
          grid-column: 2 / 3;
          grid-row: 1 / 3;
          border: 0 solid $financi-green;
          border-width: 0 0 0 5px;
          padding-left: 20px;

          &__title {
            font-size: 20px;
            margin-bottom: 20px;
          }

          &__button {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>
<script setup lang="ts">
import axios, { AxiosError } from "axios";
import { ref, onMounted } from "vue";

const username = ref("");
const greeting = ref("");
const feedback = ref("");
const amount = ref("");
const visibility = ref(false);
const envUrl = import.meta.env.VITE_API_URL;

type ErrorResponse = {msg: string};
type SuccessResponse = {
  name: string,
  username: string,
  fixedIncome: number,
  balance: number,
  email: string,
}

function setGreeting() {
  const hours = {
    hour: new Date().getHours(),
    day: 0,
    afternoon: 12,
    night: 18,
  };

  if (hours.hour >= hours.day && hours.hour < hours.afternoon) {
    greeting.value = "Bom dia!";
  } else if (hours.hour >= hours.afternoon && hours.hour < hours.night) {
    greeting.value = "Boa tarde!";
  } else {
    greeting.value = "Boa noite!";
  }
}

function getGreetingAndsSetInterval() {
  const interval = 900000;

  setGreeting();

  setInterval(setGreeting, interval);
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
  getGreetingAndsSetInterval();
  getUserInfos();
});

</script>

<template>
  <div class="main_container">
    <div class="main_container__greetings">
      <div class="main_container__greetings__user_info">
        <img
          src="../../Foto.jpg"
          alt="user"
          class="main_container__greetings__user_info__img"
        >
        <div class="main_container__greetings__user_info__content">
          <p
            class="main_container__greetings__user_info__content__username"
          >
            {{ username }}
          </p>
          <p
            class="main_container__greetings__user_info__content__greeting"
          >
            {{ greeting }}
          </p>
        </div>
      </div>
      <v-icon
        name="io-settings-sharp"
        scale="1.5"
      />
    </div>
    <div class="main_container__balance">
      <div class="main_container__balance__top_content">
        <div class="main_container__balance__top_content__amount">
          <p
            class="main_container__balance__top_content__amount__title"
          >
            Saldo geral
          </p>
          <p
            v-if="visibility"
            class="main_container__balance__top_content__amount__value"
          >
            {{ "R$ " + formatToMoney(amount) }}
          </p>
          <p
            v-else
            class="main_container__balance__top_content__amount__value--hide"
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
      <div class="main_container__balance__bottom_content">
        <div class="main_container__balance__bottom_content__incomes">
          <p
            class="main_container__balance__bottom_content__incomes__title"
          >
            Entradas
          </p>
          <p
            class="main_container__balance__bottom_content__incomes__value"
          >
            {{ formatToMoney(amount) }}
          </p>
        </div>
        <div class="main_container__balance__bottom_content__outs">
          <p
            class="main_container__balance__bottom_content__outs__title"
          >
            Saídas
          </p>
          <p
            class="main_container__balance__bottom_content__outs__value"
          >
            {{ formatToMoney(amount) }}
          </p>
        </div>
      </div>
    </div>
    <div class="main_container__last_transactions">
      <h1>ultimas transações</h1>
    </div>
    <div class="main_container__goals">
      <h1>metas</h1>
    </div>
    <div class="main_container__news">
      <h1>noticias</h1>
    </div>
    <div class="main_container__lats_lessons">
      <h1>aulas</h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";

.main_container {
  display: grid;
  grid-template-rows: repeat(5, min-content);
  gap: 40px;
  padding: 30px;
  min-height: 100svh;
  background-color: $bg-color;
  color: $text-color-white;

  &__greetings {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    &__user_info {
      display: flex;
      flex-direction: row;
      gap: 10px;
      align-items: center;

      &__img {
        width: 65px;
        height: 65px;
        border: 3px solid $financi-green;
        border-radius: 50%;
      }

      &__content {
        display: flex;
        flex-direction: column;
        gap: 2px;
        font-size: 1.3em;

        &__username {
          font-weight: 600;
        }

        &__greeting {
          font-weight: 400;
          color: $text-color-gray;
        }
      }
    }
  }

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

      &__incomes {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 45%;
        gap: 10px;
        padding: 10px;
        background-color: $child-card-bg-color;
        box-shadow: $box-shadow;
        border-radius: 5px;

        &__title {
          font-size: 0.8rem;
          font-weight: 600;
          color: $text-color-gray;
        }

        &__value {
          font-size: 1.1rem;
          color: $financi-green;
          font-weight: 700;
        }
      }

      &__outs {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 45%;
        gap: 10px;
        padding: 15px;
        background-color: $child-card-bg-color;
        box-shadow: $box-shadow;
        border-radius: 5px;

        &__title {
          font-size: 0.8rem;
          font-weight: 600;
          color: $text-color-gray;
        }

        &__value {
          font-size: 1.1rem;
          color: $financi-red;
          font-weight: 700;
        }
      }
    }
  }

  // &__last_transactions {
  // }

  // &__goals {
  // }

  // &__news {
  // }

  // &__last_lessons {
  // }
}
</style>
<script setup lang="ts">
import axios, { AxiosError } from "axios";
import { ref, onMounted } from "vue";

const username = ref("");
const greeting = ref("");
const feedback = ref("");
const amount = ref<number>();
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

async function getUserInfos() {
  try {
    const response = await axios.get<SuccessResponse>(
      `${envUrl}/get-me`,
    );
    feedback.value = "";
    username.value = response.data.username;
    amount.value = response.data.balance;
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
          src="https://picsum.photos/500"
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
    <div class="main_container__balance_info">
      <div class="main_container__balance_info__top_content">
        <div class="main_container__balance_info__top_content__amount">
          <p
            class="main_container__balance_info__top_content__amount__title"
          >
            Saldo geral
          </p>
          <p
            class="main_container__balance_info__top_content__amount__value"
          >
            {{ "R$" + amount }}
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
  grid-template-rows: auto;
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

  &__balance_info {
    background-color: $card-bg-color;

    &__top_content {

      &__amount {

        &__title {
          color: $text-color-gray;
        }

        &__value {
          font-size: 1.5rem;
          font-weight: 700;
        }
      }
    }
  }

  &__last_transactions {
  }

  &__goals {
  }

  &__news {
  }

  &__last_lessons {
  }
}
</style>
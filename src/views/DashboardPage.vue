<script setup lang="ts">
import axios, { AxiosError } from "axios";
import { ref, onMounted } from "vue";
import OperationPopup from "../components/Popup/OperationPopupComponent.vue";
import DashboarButton from "../components/DashboardButton.vue";
import Logo from "../components/LogoFinanci.vue";
import Greeting from "../components/GreetingComponent.vue";
import MovimentsInfo from "../components/MovimentsInfo.vue";
import TransactionList from "../components/TransactionList.vue";
import NewsPreview from "../components/NewsPreviewComponent.vue";
import GoalsList from "../components/GoalsList.vue";
import CourseList from "../components/CourseList.vue";
import { useProfileStore } from "../stores/userStore";

const profile = useProfileStore();
const username = ref("");
const feedback = ref("");
const visibility = ref(false);
const envUrl = import.meta.env.VITE_API_URL;
const popupIsOpen = ref(false);
const currentOperation = ref<"Income" | "Out" | "Goal">();

type ErrorResponse = { msg: string };
type SuccessResponse = {
  data: {
    name: string,
    username: string,
    fixedIncome: number,
    balance: string,
    email: string,
    entries: string,
    outs: string,
  },
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
    profile.balance = Number(response.data.data.balance);
    profile.entries = Number(response.data.data.entries);
    profile.outs = Number(response.data.data.outs);
    username.value = response.data.data.username;
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
      <Greeting
        :username="username"
        class="container__content__greetings"
      />
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
              {{ "R$ " + formatToMoney(profile.balance.toString()) }}
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
            :value="formatToMoney(profile.entries.toString())"
          />
          <MovimentsInfo
            type="Out"
            :value="formatToMoney(profile.outs.toString())"
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
          <OperationPopup
            v-if="popupIsOpen"
            :type="currentOperation"
            @close="popupIsOpen = false"
          />
        </div>
      </div>
      <div class="container__content__last_transactions">
        <h2
          class="container__content__last_transactions__title"
        >
          Últimas transações
        </h2>
        <TransactionList
          :quantity="5"
          force-reload
        />
        <router-link
          to="/transactions"
          class="container__content__button"
        >
          <h5>IR PARA TRANSAÇÕES</h5>
        </router-link>
      </div>
      <div class="container__content__goals">
        <h2
          class="container__content__goals__title"
        >
          Metas
        </h2>
        <GoalsList
          :quantity="2"
          :minimalist="true"
        />
        <router-link
          to="/goals"
          class="container__content__button"
        >
          <h5>IR PARA METAS</h5>
        </router-link>
      </div>
      <div class="container__content__last_news">
        <div class="container__content__last_news__title">
          <h2>Últimas noticías</h2>
        </div>
        <NewsPreview />
        <router-link
          to="/news"
          class="container__content__button"
        >
          <h5>IR PARA NOTÍCIAS</h5>
        </router-link>
      </div>
      <div class="container__content__courses">
        <div class="container__content__courses__title">
          <h2>Cursos</h2>
        </div>
        <CourseList
          :quantity="3"
          show-load-more
        />
        <router-link
          to="/courses"
          class="container__content__button"
        >
          <h5>IR PARA CURSOS</h5>
        </router-link>
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
  background-color: $bg-color;
  min-height: 93.4dvh;

  &__content {
    display: grid;
    grid-template-rows: repeat(5, min-content);
    grid-template-columns: 100%;
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

    &__button {
        margin-top: 1rem;
        display: flex;
        justify-content: center;
        padding: 0.5rem;
        background-color: $financi-green;
        text-decoration: none;
        color: $text-color-white;
        cursor: pointer;
        border-radius: $border-radius;
      }

    &__last_transactions {
      display: flex;
      flex-direction: column;

      &__title {
        margin-bottom: 1rem;
      }
    }

    &__goals {
      display: flex;
      flex-direction: column;

      &__title {
        margin-bottom: 1rem;
      }
    }

    &__last_news {
      display: flex;
      flex-direction: column;

      &__title {
        margin-bottom: 1rem;
      }
    }

    &__courses {
      display: flex;
      flex-direction: column;

      &__title {
        margin-bottom: 1rem;
      }
    }
  }
}

@media screen and (min-width: 800px) {
  .container {
    &__content {
      grid-template-columns: repeat(2, 1fr);

      &__greetings {
        grid-row: 1 / 2;
        grid-column: 1 / 3;
      }

      &__balance {
        display: grid;
        grid-template-columns: 0.9fr auto;
        grid-template-rows: 1fr 1fr;
        gap: 0 20px;
        transition: all 1s;
        grid-column: 1 / 3;
        grid-row: 2 / 3;

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
          padding-left: 50px;
          margin-left: 25px;

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

      &__last_transactions {
        padding: 30px;
        gap: 1rem;
        background-color: $card-bg-color;
        border-radius: $border-radius;
        box-shadow: $box-shadow;

        &__title {
          margin-bottom: 0.5rem;
        }
      }

      &__goals {
        padding: 30px;
        gap: 1rem;
        background-color: $card-bg-color;
        border-radius: $border-radius;
        box-shadow: $box-shadow;

        &__title {
          margin-bottom: .5rem;
        }
      }

      &__last_news {
        padding: 30px;
        gap: 1rem;
        background-color: $card-bg-color;
        box-shadow: $box-shadow;

        &__title {
          margin-bottom: 0.5rem;
        }
      }

      &__courses {
        padding: 30px;
        gap: 1rem;
        background-color: $card-bg-color;
        box-shadow: $box-shadow;

        &__title {
          margin-bottom: .5rem;
        }
      }

      &__button {
        margin: 0;
      }
    }
  }
}
</style>
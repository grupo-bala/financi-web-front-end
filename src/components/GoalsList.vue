<script setup lang="ts">
import { computed, ref } from "vue";
import { useGoalsStore } from "../stores/goalsStore";
import { Goal } from "../types/Goal";
import axios from "axios";
import { displayDate } from "../utils/Dates";
import SuspenseBox from "./Suspense/SuspenseBox.vue";
import Progress from "./ProgressBarComponent.vue";
import GoalInfo from "./Popup/GoalInfoPopupComponent.vue";

type SuccesfulReponse = {
  data: Goal[],
  pages: number,
}

const props = defineProps<{
  quantity: number,
  showLoadMore?: boolean,
  minimalist?: boolean,
}>();

const baseURL = import.meta.env.VITE_API_URL as string;
const initialPage = 0;
const isLoading = ref(true);
const page = ref(initialPage);
const totalPages = ref(initialPage);
const goals = useGoalsStore();
const popupIsOpen = ref(false);
const currentGoal = ref<Goal>();

const goalsList = computed(() => {
  return props.showLoadMore
    ? goals.data
    : goals.get(props.quantity);
});

async function getGoals() {
  isLoading.value = true;
  page.value++;

  if (goals.page >= page.value) {
    isLoading.value = false;
    return;
  }

  const res = await axios.get<SuccesfulReponse>(
    `${baseURL}/get-all-goals?
      page=${page.value}&
      size=${props.quantity}
    `.replaceAll(/^\s+|\n/gm, ""),
  );

  goals.concat(res.data.data);
  goals.nextPage();

  totalPages.value = res.data.pages;
  isLoading.value = false;
}

function getProgressPercent(totalValue: string, currentValue: string): number {
  const percent = 100;

  return Number(currentValue) / Number(totalValue) * percent;
}

function getFormatedDate(date: string) {
  return displayDate(date);
}

function getNumberAsCurrency(value: string) {
  return Number(value)
    .toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}

getGoals();
</script>

<template>
  <div>
    <SuspenseBox
      :is-loading="isLoading && page === 1"
      loading-width="100%"
      loading-height="150px"
      :quantity="props.quantity"
    >
      <ul
        class="goals_list"
      >
        <li
          v-for="goal of goalsList"
          :key="goal.id"
          class="goals_list__item"
          @click="[
            popupIsOpen = true,
            currentGoal = goal
          ]"
        >
          <div class="goals_list__item__left">
            <p class="goals_list__item__left__title">
              {{ goal.title }}
            </p>
            <div class="goals_list__item__left__content">
              <div
                v-if="props.minimalist === false"
                class="goals_list__item__left__content__label_value"
              >
                <div
                  class="goals_list__item__left__content__label_value__title"
                >
                  <p>
                    Objetivo
                  </p>
                </div>
                <div
                  class="goals_list__item__left__content__label_value__value"
                >
                  {{ "R$ " + getNumberAsCurrency(goal.totalValue) }}
                </div>
              </div>
              <div class="goals_list__item__left__content__label_value">
                <div
                  class="goals_list__item__left__content__label_value__title"
                >
                  <p>
                    Data estimada
                  </p>
                </div>
                <div
                  class="goals_list__item__left__content__label_value__value"
                >
                  {{ getFormatedDate(goal.deadline) }}
                </div>
              </div>
              <div class="goals_list__item__left__content__label_value">
                <div
                  class="goals_list__item__left__content__label_value__title"
                >
                  <p>
                    Ideal por mês
                  </p>
                </div>
                <div
                  class="goals_list__item__left__content__label_value__value"
                >
                  R$ 10,00
                </div>
              </div>
            </div>
          </div>
          <div class="goals_list__item__right">
            <Progress
              :percent="getProgressPercent(goal.totalValue, goal.currentValue)"
            />
            <div class="goals_list__item__right__bottom">
              <p
                class="goals_list__item__right__bottom__current_value"
              >
                {{ "R$ " + getNumberAsCurrency(goal.currentValue) }}
              </p>
              <p class="goals_list__item__right__bottom__remaining">
                {{ "Faltam R$ " + getNumberAsCurrency(goal.totalValue) }}
              </p>
            </div>
          </div>
        </li>
      </ul>
      <GoalInfo
        v-if="popupIsOpen"
        :goal="currentGoal!"
        @close="popupIsOpen = false"
      />
    </SuspenseBox>
    <SuspenseBox
      :is-loading="isLoading && page > 1"
      loading-width="100%"
      loading-height="150px"
      :quantity="props.quantity"
    />
    <button
      v-if="props.showLoadMore && totalPages !== page"
      :disabled="isLoading"
      @click="getGoals()"
    >
      <h4>VER MAIS</h4>
    </button>
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";

.goals_list {
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  margin-bottom: .4rem;

  &__item {
    background-color: $card-bg-color;
    padding: 1.5rem;
    border-radius: $border-radius;
    box-shadow: $box-shadow;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    &__left {
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: .8rem;
      flex-grow: 0.8;
      overflow: hidden;

      &__title {
        font-weight: bold;
        font-size: 1.1rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        color: $text-color-white;
      }

      &__content {
        display: flex;
        flex-direction: column;
        gap: .5rem;
        font-size: .7rem;

        &__label_value {
          display: flex;
          flex-direction: column;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          gap: .3rem;

          &__title {
            color: $text-color-gray;
            font-weight: 600;
          }

          &__value {
            color: $financi-blue;
            font-weight: 600;
          }
        }
      }
    }

    &__right {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: .7rem;
      overflow: hidden;

      &__bottom {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: .2rem;

        &__current_value {
          font-size: .9rem;
          color: $financi-blue;
          font-weight: 700;
        }

        &__remaining {
          font-size: .7rem;
          text-align: center;
          font-weight: 500;
          color: $text-color-white;
        }
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
  margin-top: 1.5rem;
  border: none;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: .2;
  }
}

@media screen and (min-width: 800px) {
  .goals_list {
    &__item {
      background-color: $child-card-bg-color;

      &__left {
        &__title {
          font-size: 1.1rem;
        }

        &__content {
          flex-direction: row;
          gap: 1.5rem;
          font-size: .8rem;

          &__label_value {
            border-left: 1px solid $text-color-gray;
            padding-left: 1.5rem;
          }

          :first-child {
            border: 0px;
            padding: 0;
          }
        }
      }

      &__right {
        &__bottom {
          &__remaining {
            font-size: .8rem;
          }
        }
      }
    }
  }
}
</style>
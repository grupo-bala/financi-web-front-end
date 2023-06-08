<script setup lang="ts">
import { computed, ref } from "vue";
import { useGoalsStore } from "../stores/goalsStore";
import { Goal } from "../types/Goal";
import axios from "axios";
import SuspenseBox from "./Suspense/SuspenseBox.vue";
import GoalCard from "./GoalCard.vue";

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

getGoals();
</script>

<template>
  <div>
    <div
      v-if="goals.data.length > 0"
    >
      <SuspenseBox
        :is-loading="isLoading && page === 1"
        loading-width="100%"
        loading-height="150px"
        :quantity="props.quantity"
      >
        <ul class="goals_list">
          <li
            v-for="goal of goalsList"
            :key="goal.id"
            class="goals_list__items"
            @click="[
              currentGoal = goal
            ]"
          >
            <GoalCard
              :goal="goal"
              :minimalist="true"
            />
          </li>
        </ul>
      </SuspenseBox>
      <SuspenseBox
        :is-loading="isLoading && page > 1"
        loading-width="100%"
        loading-height="150px"
        :quantity="props.quantity"
      />
      <button
        v-if="props.showLoadMore && totalPages !== page"
        class="goals_list__see_more"
        :disabled="isLoading"
        @click="getGoals()"
      >
        <h4>VER MAIS</h4>
      </button>
    </div>
    <div
      v-else
      class="goals_list"
    >
      <h3>Ainda não há metas</h3>
    </div>
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
  margin-bottom: 1rem;

  &__items {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__see_more {
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
}

@media screen and ((min-width: 800px) and (max-width: 1079px)) {
  .goals_list {
    flex-direction: row;
    flex-wrap: wrap;

    &__items {
      flex-grow: 1;
      flex-basis: 40%;
    }
  }
}
</style>
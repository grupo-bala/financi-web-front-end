<script setup lang="ts">
import { computed, ref } from "vue";
import ButtonComponent from "./ButtonComponent.vue";
import Progress from "./ProgressBarComponent.vue";
import { displayDate } from "../utils/Dates";
import { Goal } from "../types/Goal";
import EditPopupGoal from "../components/Popup/EditPopupGoalComponent.vue";
import RemovePopup from "../components/Popup/RemoveOperationPopup.vue";


const editIsOpen = ref(false);
const cardIsOpen = ref(false);
const popupIsOpen = ref(false);
const props = defineProps<{
  goal: Goal,
  minimalist?: boolean,
}>();

const currentArrow = computed(() =>
  cardIsOpen.value ? "bi-chevron-up" : "bi-chevron-down",
);

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
</script>

<template>
  <div
    class="goal_card"
    @click.self="cardIsOpen = !cardIsOpen"
  >
    <v-icon
      :name="currentArrow"
      class="goal_card__arrow"
      @click="cardIsOpen = !cardIsOpen"
    />
    <div
      class="goal_card__mid"
      @click="cardIsOpen = !cardIsOpen"
    >
      <div class="goal_card__mid__left">
        <p class="goal_card__mid__left__title">
          {{ goal.title }}
        </p>
        <div class="goal_card__mid__left__content">
          <div
            v-if="props.minimalist === false"
            class="goal_card__mid__left__content__label_value"
          >
            <div
              class="
                goal_card__mid__left__content__label_value__title
              "
            >
              <p>
                Objetivo
              </p>
            </div>
            <div
              class="
                goal_card__mid__left__content__label_value__value
              "
            >
              {{ "R$ " + getNumberAsCurrency(goal.totalValue) }}
            </div>
          </div>
          <div
            class="goal_card__mid__left__content__label_value"
          >
            <div
              class="
                goal_card__mid__left__content__label_value__title
              "
            >
              <p>
                Data estimada
              </p>
            </div>
            <div
              class="
                goal_card__mid__left__content__label_value__value
              "
            >
              {{ getFormatedDate(goal.deadline) }}
            </div>
          </div>
          <div
            class="goal_card__mid__left__content__label_value"
          >
            <div
              class="
                goal_card__mid__left__content__label_value__title
              "
            >
              <p>
                Ideal por mês
              </p>
            </div>
            <div
              class="
                goal_card__mid__left__content__label_value__value
              "
            >
              R$ {{ getNumberAsCurrency(props.goal.idealPerMonth) }}
            </div>
          </div>
        </div>
      </div>
      <div class="goal_card__mid__right">
        <Progress
          :percent="getProgressPercent(
            goal.totalValue,
            goal.currentValue,
          )"
        />
        <div class="goal_card__mid__right__bottom">
          <p
            class="goal_card__mid__right__bottom__current_value"
          >
            {{ "R$ " + getNumberAsCurrency(goal.currentValue) }}
          </p>
          <p class="goal_card__mid__right__bottom__remaining">
            {{ "Faltam R$ " + getNumberAsCurrency(goal.totalValue) }}
          </p>
        </div>
      </div>
    </div>
    <div
      v-if="cardIsOpen"
      class="goal_card__bottom"
    >
      <button
        class="goal_card__bottom__edit"
        :disabled="false"
        @click="editIsOpen = true"
      >
        EDITAR
      </button>
      <EditPopupGoal
        v-if="editIsOpen"
        type="Goal"
        :goal="props.goal"
        @close="editIsOpen = false"
      />
      <ButtonComponent
        color="blue"
        text="DEPOSITAR"
        :disabled="false"
      />
      <button
        class="goal_card__bottom__remove"
        @click="popupIsOpen = true"
      >
        <v-icon
          class="goal_card__bottom__remove__trash"
          name="fa-trash"
        />
      </button>
    </div>
    <RemovePopup
      v-if="popupIsOpen"
      :id="props.goal.id"
      :type="props.goal"
      @close="popupIsOpen = false"
    />
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";

.goal_card {
  background-color: $card-bg-color;
  padding: 1.5rem;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  &__arrow {
    align-self: flex-end;
    margin-top: -.5rem;
    stroke: gray;
    stroke-width: .09rem;
    scale: .8;
    cursor: pointer;
  }

  &__mid {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__left {
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 1.5rem;
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
      gap: .5rem;
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

  &__bottom {
    display: flex;
    gap: .5rem;
    width: 100%;
    margin-top: 1.5rem;
    align-items: center;

    &__edit {
      width: 100%;
      font-size: .9rem;
      font-weight: 700;
      background-color: $small-card;
      border: none;
      cursor: pointer;
      color: $text-button-color;
      border-radius: $border-radius;
      outline: none;
      letter-spacing: 0.08em;
      padding: 0.55rem 1.5rem;
    }

    &__remove {
      border: none;
      outline: none;
      background-color: $financi-red;
      height: 100%;
      cursor: pointer;
      border-radius: $border-radius;
      padding: .5rem .5rem;

      &__trash {
        fill: $bg-color;
      }
    }
  }
}

@media screen and ((min-width: 800px) and (max-width: 1079px)) {
  .goal_card {
    background-color: $child-card-bg-color;

    &__left {
      &__content {
        font-size: .9rem;
      }
    }
  }
}

@media screen and (min-width: 1080px) {
  .goal_card {
    background-color: $child-card-bg-color;

    &__mid {
      &__left {
        &__title {
          font-size: 1.1rem;
        }

        &__content {
          flex-direction: row;
          gap: 1.5rem;
          font-size: .9rem;

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
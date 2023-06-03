<script setup lang="ts">
import { computed } from "vue";
import { Goal } from "../../types/Goal";
import { displayDate } from "../../utils/Dates";
import ButtonComponent from "../ButtonComponent.vue";
import Popup from "./PopupComponent.vue";

const props = defineProps<{
  goal: Goal,
}>();

const totalValue = computed(() => {
  return Number(props.goal.totalValue)
    .toLocaleString("pt-BR", { minimumFractionDigits: 2 });
});

const currentValue = computed(() => {
  return Number(props.goal.currentValue)
    .toLocaleString("pt-BR", { minimumFractionDigits: 2 });
});
</script>

<template>
  <Popup>
    <div class="goal_container">
      <div class="goal_container__top">
        <v-icon
          class="goal_container__top__trash"
          name="fa-trash"
        />
        <div class="goal_container__top__info">
          <p class="goal_container__top__info__title">
            {{ props.goal.title }}
          </p>
          <p class="goal_container__top__info__value">
            R$ {{ currentValue }}
          </p>
        </div>
      </div>
      <div class="goal_container__main">
        <div class="goal_container__main__section">
          <p class="goal_container__main__section__label">
            Pretendo alcançar em
          </p>
          <p class="goal_container__main__section__value">
            {{ displayDate(props.goal.deadline) }}
          </p>
        </div>
        <div class="goal_container__main__section">
          <p class="goal_container__main__section__label">
            Objetivo total
          </p>
          <p class="goal_container__main__section__value">
            R$ {{ totalValue }}
          </p>
        </div>
        <div class="goal_container__main__section">
          <p class="goal_container__main__section__label">
            Ideal por mês
          </p>
          <p class="goal_container__main__section__value">
            R$ {{ totalValue }}
          </p>
        </div>
        <div class="goal_container__main__section">
          <button
            class="goal_container__button"
          >
            EDITAR
          </button>
        </div>
      </div>
      <ButtonComponent
        color="blue"
        text="DEPOSITAR"
        :disabled="false"
      />
    </div>
  </Popup>
</template>

<style scoped lang="scss">
@import "../../variables.scss";

.goal_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  &__top {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    &__trash {
      scale: 1.1;
      left: -3rem;
      position: absolute;
      fill: $financi-red;
      cursor: pointer;
    }

    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: .3rem;

      &__title {
        color: $text-color-white;
        font-weight: 700;
        font-size: 1.2rem;
        text-align: center;
      }

      &__value {
        color: $financi-blue;
        font-weight: 600;
        font-size: 1rem;
      }
    }
  }

  &__main {
    display: grid;
    grid-template-columns: 2fr auto;
    align-items: center;
    width: 100%;
    gap: 1.5rem 5rem;

    &__section {
      display: flex;
      flex-direction: column;
      gap: .2rem;
      align-items: start;

      &__label {
        color: $text-color-gray;
        font-size: .8rem;
        font-weight: 500;
        opacity: 90;
        text-align: start;
      }

      &__value {
        color: $text-color-white;
        font-weight: 600;
      }
    }
  }

  &__button {
    font-size: 0.8rem;
    font-weight: 700;
    background-color: $child-card-bg-color;
    border: 1px solid $financi-blue;
    cursor: pointer;
    color: $text-color-gray;
    border-radius: $border-radius;
    outline: none;
    letter-spacing: 0.08em;
    padding: 0.5rem 1.5rem;
  }
}

@media screen and (min-width: 880px) {
  .goal_container {
    gap: 3rem;

    &__top {

      &__trash {
        scale: 1.3;
      }

      &__info {
        &__title {
          font-size: 1.5rem;
        }

        &__value {
          font-size: 1.4rem;
        }
      }
    }

    &__main {
      &__section {
        &__label {
          font-size: 1rem;
        }

        &__value {
          font-size: 1.1rem;
        }
      }
    }

    &__button {
      font-size: .95rem;
      padding: .7rem 1.3rem;
    }
  }

}
</style>
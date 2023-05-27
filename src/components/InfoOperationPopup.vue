<script setup lang="ts">
import { computed, ref } from "vue";
import ButtonComponent from "./ButtonComponent.vue";

const isOpen = ref(true);
const props = defineProps<{
  type: "Income" | "Out" | "Goal"
}>();

defineEmits<{
  (e: "close"): void,
}>();

const buttonColorValue = computed(() => {
  if (props.type === "Goal") {
    return "blue";
  } else if (props.type === "Income") {
    return "green";
  }

  return "red";
});

const colorValue = computed(() => {
  if (props.type === "Goal") {
    return "#168CC0";
  } else if (props.type === "Income") {
    return "#49AD5A";
  }

  return "#EF5350";
});

const dateLabelValue = computed(() => {
  return props.type === "Goal" ? "Data estimada" : "Data realizada";
});

function disableScroll() {
  const scrollY = window.scrollY;
  document.body.classList.add("disable_scroll");
  document.body.style.top = `-${scrollY}px`;
}

function enableScroll() {
  const scrollY = document.body.style.top;
  document.body.classList.remove("disable_scroll");
  document.body.style.top = "";

  const xPos = 0;
  const toNegative = -1;
  window.scrollTo(xPos, Number(scrollY || "0") * toNegative);
}

disableScroll();
</script>

<template>
  <div
    v-if="isOpen"
    class="info_box"
    @click.self="[enableScroll(), isOpen = !isOpen, $emit('close')]"
  >
    <div class="info_box__card">
      <div class="info_box__card__top_content">
        <h2
          class="info_box__card__top_content__title"
        >
          Título da operação
        </h2>
        <p
          class="info_box__card__top_content__value"
        >
          Valor da operação
        </p>
      </div>
      <div class="info_box__card__main_content">
        <div
          v-if="props.type === 'Goal'"
          class="info_box__card__main_content__goals"
        >
          <div class="info_box__card__main_content__label_and_value">
            <p
              class="info_box__card__main_content__label_and_value__label"
            >
              Objetivo total
            </p>
            <p
              class="info_box__card__main_content__label_and_value__value"
            >
              Valor
            </p>
          </div>
          <div class="info_box__card__main_content__label_and_value">
            <p
              class="info_box__card__main_content__label_and_value__label"
            >
              Ideal por mês
            </p>
            <p
              class="info_box__card__main_content__label_and_value__value"
            >
              Valor
            </p>
          </div>
        </div>
        <div class="info_box__card__main_content__default">
          <div class="info_box__card__main_content__label_and_value">
            <p
              class="info_box__card__main_content__label_and_value__label"
            >
              {{ dateLabelValue }}
            </p>
            <p
              class="info_box__card__main_content__label_and_value__value"
            >
              Valor
            </p>
          </div>
          <div class="info_box__card__main_content__label_and_value">
            <p
              class="info_box__card__main_content__label_and_value__label"
            >
              Categoria
            </p>
            <p
              class="info_box__card__main_content__label_and_value__value"
            >
              Valor
            </p>
          </div>
        </div>
      </div>
      <div class="info_box__card__buttons">
        <ButtonComponent
          :color="buttonColorValue"
          text="EDITAR"
          :disabled="false"
        />
        <button
          v-if="props.type === 'Goal'"
          class="info_box__card__button"
        >
          DEPOSITAR
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";

.info_box {
  display: flex;
  position: fixed;
  width: 100vw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.40);
  z-index: 10;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: end;

  &__card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: $card-bg-color;
    border-radius: $border-radius;
    width: 100%;
    max-width: 600px;
    padding: 2rem 2.5rem;
    gap: 3rem;

    &__top_content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;

      &__title {
        color: white;
      }

      &__value {
        font-weight: 600;
        color: v-bind(colorValue);
      }
    }

    &__main_content {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 1rem;

      &__default {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        gap: 6.9rem;
      }

      &__goals {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }

      &__label_and_value {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;

        &__label {
          color: $text-color-gray;
          font-size: 0.8rem;
          font-weight: 500;
          opacity: 90;
        }

        &__value {
          color: $text-color-white;
          font-weight: 600;
        }
      }

    }

    &__button {
      font-size: 0.9rem;
      font-weight: 600;
      background-color: $child-card-bg-color;
      border: 1px solid $financi-blue;
      cursor: pointer;
      color: $text-color-gray;
      padding: 0.3rem;
      border-radius: $border-radius;
      outline: none;
      letter-spacing: 0.08em;
      padding: 0.5rem 1.5rem;
    }

    &__buttons {
      width: 100%;
      display: flex;
      flex-direction: row;
      gap: 1rem;
    }
  }
}
</style>
<script setup lang="ts">
import { computed, ref } from "vue";
import ButtonComponent from "../ButtonComponent.vue";
import { Transaction } from "../../types/Transaction";
import { getNameFromCategoryId } from "../../types/Category";
import { displayDate } from "../../utils/Dates";
import EditPopup from "./EditPopupComponent.vue";

const isOpen = ref(true);
const props = defineProps<{
  type: "Income" | "Out"
  operation: Transaction,
}>();

defineEmits<{
  (e: "close"): void,
}>();

const category = computed(() => {
  return getNameFromCategoryId(props.operation.categoryId);
});

const date = computed(() => {
  return displayDate(props.operation.date);
});

const value = computed(() => {
  return Number(props.operation.value)
    .toLocaleString("pt-BR", { minimumFractionDigits: 2 });
});

const buttonColorValue = computed(() => {
  if (props.type === "Income") {
    return "green";
  }

  return "red";
});

const colorValue = computed(() => {
  if (props.type === "Income") {
    return "#49AD5A";
  }

  return "#EF5350";
});

function disableScroll() {
  const scrollY = window.scrollY;
  document.body.classList.add("disable_scroll");
  document.body.style.top = `-${scrollY}px`;
}

function enableScroll() {
  const scrollY = document.body.style.top.split("px")[0];
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
      <v-icon
        class="info_box__card__close"
        name="io-close"
        scale="1.2"
        fill="gray"
        @click="[enableScroll(), isOpen = !isOpen, $emit('close')]"
      />
      <div class="info_box__card__top_content">
        <p
          class="info_box__card__top_content__title"
        >
          {{ operation.title }}
        </p>
        <p
          class="info_box__card__top_content__value"
        >
          {{ (props.operation.isEntry ? "+ " : "- ") + "R$ " + value }}
        </p>
      </div>
      <div class="info_box__card__main_content">
        <div class="info_box__card__main_content__section">
          <p
            class="info_box__card__main_content__section__label"
          >
            Data realizada
          </p>
          <p
            class="info_box__card__main_content__section__value"
          >
            {{ date }}
          </p>
        </div>
        <div class="info_box__card__main_content__section">
          <p
            class="info_box__card__main_content__section__label"
          >
            Categoria
          </p>
          <p
            class="info_box__card__main_content__section__value"
          >
            {{ category }}
          </p>
        </div>
      </div>
      <div class="info_box__card__buttons">
        <ButtonComponent
          :color="buttonColorValue"
          text="EDITAR"
          :disabled="false"
        />
        <EditPopup
          v-if="isOpen && props.type == 'Income'"
          :operation="props.operation"
          :type="props.type"
          @close="isOpen = false"
        />
        <EditPopup
          v-if="isOpen && props.type == 'Out'"
          :operation="props.operation"
          type="Out"
          @close="isOpen = false"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../variables.scss";

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
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: $card-bg-color;
    border-radius: $border-radius;
    width: 100%;
    max-width: 500px;
    padding: 2rem 2.5rem;
    gap: 3rem;

    &__close {
      display: none;
    }

    &__top_content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.3rem;

      &__title {
        font-size: 1.3rem;
        font-weight: 700;
        text-align: center;
        color: white;
      }

      &__value {
        font-weight: 600;
        font-size: 1.2rem;
        color: v-bind(colorValue);
      }
    }

    &__main_content {
      display: grid;
      grid-template-columns: 1fr auto;
      width: 100%;
      gap: 1rem;

      &__section {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          align-items: start;

          &__label {
            color: $text-color-gray;
            font-size: 0.8rem;
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

@media screen and (min-width: 800px) {
  .info_box {
    align-items: center;

    &__card {
      width: 50%;
      padding: 3rem 2.5rem;

      &__top_content {
        &__title {
          font-size: 1.5rem;
        }

        &__value {
          font-size: 1.4rem;
        }
      }

      &__main_content {
        &__section {
          &__label {
            font-size: 1rem;
          }

          &__value {
            font-size: 1.1rem;
          }
        }
      }

      &__close {
        display: flex;
        position: absolute;
        right: 1rem;
        top: 1rem;
        cursor: pointer;
        transition: fill 0.4s;

        &:hover {
          fill: $financi-red;
        }
      }
    }
  }
}
</style>
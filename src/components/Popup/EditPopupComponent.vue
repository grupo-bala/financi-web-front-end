<script setup lang="ts">
import { CSSProperties, computed, onMounted, ref, watch } from "vue";
import FormEditPopup from "./FormEditPopup.vue";
import Popup from "../Popup/PopupComponent.vue";
import { Transaction } from "../../types/Transaction";

type Tab = "Out" | "Income";
type ElementRef = HTMLDivElement | null;

const props = defineProps<{
  type?: Tab,
  operation: Transaction,
}>();

const noWidth = 0;
const divSize = ref(noWidth);
const divSizeInPx = computed(() => `${divSize.value}px`);
const actualType = ref<Tab>(props.type ?? "Income");

const editOutElement = ref<ElementRef>(null);
const editInElement = ref<ElementRef>(null);

const divStyle = ref<CSSProperties>({
  left: "50%",
  transform: "translateX(-45%)",
  backgroundColor: "#49AD5A",
});

const tabToElement = {
  "Out": editOutElement,
  "Income": editInElement,
};

function calcDivWidth() {
  const element = tabToElement[actualType.value as keyof typeof tabToElement];

  if (element.value !== null) {
    const width = element.value.clientWidth;
    divSize.value = width;
  }
}

watch(actualType, () => {
  calcDivWidth();
});

onMounted(() => {
  calcDivWidth();
});

</script>

<template>
  <Popup
    v-slot="parent"
    show-close
  >
    <div class="box__card">
      <div class="box__card__titles">
        <h2
          v-if="props.type === 'Income'"
        >
          Editar entrada
        </h2>
        <h2
          v-if="props.type === 'Out'"
        >
          Editar saída
        </h2>
      </div>
      <div
        v-if="props.type == 'Out'"
        class="box__card__buttons_titles"
      >
        <button
          ref="editOutElement"
          aria-label="editar saída"
          @click="[
            actualType = 'Out',
            divStyle = {
              left: 0,
              backgroundColor: '#EF5350',
            }
          ]"
        >
          Editar saída
        </button>
      </div>
      <div
        v-else-if="props.type == 'Income'"
        class="box__card__buttons_titles"
      >
        <button
          ref="editInElement"
          aria-label="editar entrada"
          @click="[
            actualType = 'Income',
            divStyle = {
              left: 0,
              backgroundColor: '#EF5350',
            }
          ]"
        >
          Editar entrada
        </button>
      </div>
      <FormEditPopup
        :operation="props.operation"
        :type="actualType"
        @success="parent.onClose()"
      />
    </div>
  </Popup>
</template>

<style scoped lang="scss">
@import "../../variables.scss";

.box {
  display: flex;
  position: fixed;
  width: 100vw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.40);
  z-index: 11;
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
    border-radius: 5px;
    width: 100%;
    max-width: 600px;
    gap: 2rem;

    &__titles {
      display: none;
    }

    &__buttons_titles {
      position: relative;
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: space-evenly;

      button {
        font-size: 1rem;
        font-weight: 700;
        outline: none;
        background-color: transparent;
        border: none;
        color: $text-color-white;
        cursor: pointer;
      }

      &__line {
        position: absolute;
        width: v-bind(divSizeInPx);
        height: 2px;
        bottom: -10px;
        transition: all .5s ease-in-out;
      }
    }
  }
}

@media screen and (min-width: 800px) {
  .box {
    align-items: center;

    &__card {
      width: 80%;

      &__titles {
        display: block;
      }

      &__buttons_titles {
        display: none;
      }
    }
  }
}
</style>
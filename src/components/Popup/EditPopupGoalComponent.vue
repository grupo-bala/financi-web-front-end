<script setup lang="ts">
import { CSSProperties, computed, onMounted, ref, watch } from "vue";
import FormEditPopup from "./FormEditPopup.vue";
import Popup from "../Popup/PopupComponent.vue";
import { Goal } from "../../types/Goal";

type Tab = "Goal";
type ElementRef = HTMLDivElement | null;

const props = defineProps<{
  type?: Tab,
  goal: Goal,
}>();

const noWidth = 0;
const divSize = ref(noWidth);
const divSizeInPx = computed(() => `${divSize.value}px`);
const actualType = ref<Tab>(props.type ?? "Goal");

const editGoalElement = ref<ElementRef>(null);

const divStyle = ref<CSSProperties>({
  left: "50%",
  transform: "translateX(-45%)",
  backgroundColor: "#49AD5A",
});

const tabToElement = {
  "Goal": editGoalElement,
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
        <h2>
          Editar meta
        </h2>
      </div>
      <div
        class="box__card__buttons_titles"
      >
        <button
          ref="editGoalElement"
          @click="[
            actualType = 'Goal',
            divStyle = {
              left: 0,
              backgroundColor: '#EF5350',
            }
          ]"
        >
          Editar meta
        </button>
      </div>
      <FormEditPopup
        :goal="props.goal"
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
    padding: 2rem 2.5rem;
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
<script setup lang="ts">
import { ref } from "vue";

const isOpen = ref(true);

const emit = defineEmits<{
  (e: "close"): void,
}>();

const props = defineProps<{
  showClose?: boolean,
}>();

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

function onClose() {
  enableScroll();
  isOpen.value = !isOpen.value;
  emit("close");
}

disableScroll();
</script>

<template>
  <div
    v-if="isOpen"
    class="popup_box"
    @click.self="onClose()"
  >
    <div class="popup_box__card">
      <v-icon
        v-if="props.showClose"
        class="popup_box__card__close"
        name="io-close"
        scale="1.2"
        fill="gray"
        @click="onClose()"
      />
      <slot
        :on-close="onClose"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../variables.scss";

.popup_box {
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
    padding: 2rem 2.5rem;
    gap: 3rem;

    &__close {
      display: none;
    }
  }
}

@media screen and (min-width: 800px) {
  .popup_box {
    align-items: center;

    &__card {
      padding: 3rem 2.5rem;

      &__close {
        scale: 1.2;
        display: flex;
        position: absolute;
        right: 1.2rem;
        top: 1.2rem;
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
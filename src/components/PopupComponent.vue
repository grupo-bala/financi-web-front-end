<script setup lang="ts">
import { ref } from "vue";
import FormPopup from "./FormPopup.vue";

const isOpen = ref(true);

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
    class="box"
    @click.self="[enableScroll(), isOpen = !isOpen]"
  >
    <div class="box__card">
      <h1>Titulo</h1>
      <FormPopup
        type="Goal"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";

:global(body.disable_scroll) {
  height: 100vh;
  overflow-y: hidden;
  position: fixed;
}

.box {
  display: flex;
  position: fixed;
  width: 100vw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.40);
  z-index: 1;
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
  }
}

@media screen and (min-width: 768px) {
  .box {
    align-items: center;

    &__card {
      width: 80%;
    }
  }
}
</style>
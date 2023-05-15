<script setup lang="ts">
import { ref } from "vue";
import FormPopup from "./FormPopup.vue";

const isOpen = ref(true);
</script>

<template>
  <div
    v-if="isOpen"
    class="container"
    @click.self="isOpen = !isOpen"
  >
    <div class="container__card">
      <h1>Titulo</h1>
      <FormPopup
        type="Goal"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";

.container {
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
  .container {
    align-items: center;

    &__card {
      width: 80%;
    }
  }
}
</style>
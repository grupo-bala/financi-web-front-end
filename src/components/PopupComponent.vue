<script setup lang="ts">
import { ref } from "vue";
import FormPopup from "./FormPopup.vue";

const isOpen = ref(true);
</script>

<template>
  <div
    v-if="isOpen"
    class="box"
    @click.self="isOpen = !isOpen"
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
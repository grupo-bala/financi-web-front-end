<script setup lang="ts">
import { ref } from "vue";
import GoalsList from "../components/GoalsList.vue";
import InputField from "../components/Inputs/InputField.vue";
import Logo from "../components/LogoFinanci.vue";

const searchValue = ref("");
</script>

<template>
  <div class="goals">
    <div class="goals__container">
      <div class="goals__container__header">
        <h1>Metas</h1>
        <InputField
          v-model="searchValue"
          type="Text"
          label=""
          placeholder="Pesquisar"
          :required="false"
          :numeric="false"
        />
      </div>
      <GoalsList
        :quantity="5"
        show-load-more
        :search="searchValue"
        force-reload
      />
    </div>
    <footer>
      <Logo />
    </footer>
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";

.goals {
  min-height: 100dvh;
  color: $text-color-white;
  background-color: $bg-color;
  padding: 5rem 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;

  &__container {
    width: 100%;
    max-width: 1000px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;

      h1 {
        font-size: 1.5rem;
      }

      :deep div.container {
        width: 100%;
      }
    }
  }
}

@media screen and (min-width: 800px) {
  .goals {
    &__container {
      background-color: $card-bg-color;
      border-radius: $border-radius;
      box-shadow: $box-shadow;
      padding: 3rem;

      &__header {
        h1 {
          font-size: 2rem;
          align-self: flex-start;
        }
      }
    }
  }
}
</style>
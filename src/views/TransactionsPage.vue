<script setup lang="ts">
import { ref } from "vue";
import InputField from "../components/Inputs/InputField.vue";
import TransactionsList from "../components/TransactionList.vue";
import Logo from "../components/LogoFinanci.vue";

const searchValue = ref("");
</script>

<template>
  <div class="transactions">
    <div class="transactions__container">
      <div class="transactions__container__header">
        <h1>Histórico de transações</h1>
        <InputField
          v-model="searchValue"
          type="Text"
          label=""
          placeholder="Pesquisar"
          :required="false"
          :numeric="false"
        />
      </div>
      <TransactionsList
        show-dates
        show-load-more
        :search="searchValue"
      />
    </div>
    <footer>
      <Logo />
    </footer>
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";
.transactions {
  min-height: 100dvh;
  color: $text-color-white;
  background-color: $bg-color;
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__container {
    width: 100%;
    max-width: 1000px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__header {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2rem;

      h1 {
        font-size: 1.5rem;
      }

      :deep div.container {
        width: 100%;
      }
    }
  }
}

@media (min-width: 800px) {
  .transactions {
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
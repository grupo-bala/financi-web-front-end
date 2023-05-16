<script setup lang="ts">

</script>

<template>
  <div class="container">
    <button class="container__button">
      <img src="../assets/filter.png"> <p>Filtrar</p>
    </button>
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";

  .container {

    &__button {
      display: flex;
      flex-direction: row;
      border-radius: 5px;
      border: 1px solid $child-card-bg-color;
      background-color: $child-card-bg-color;
      color: $text-color-gray;
      font-size: 15px;
      justify-content: left;
      align-items: center;
      cursor: pointer;

      @media (min-width: 320px) {
        width: 362px;
        height: 41px;
      }
      @media (min-width: 600px) {
        width: 618px;
        height: 31px;
      }
      @media (min-width: 1444px) {
        width: 1425px;
        height: 31px;
      }
    }
  }
</style>
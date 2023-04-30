<script setup lang="ts">
const {text, disabled} = defineProps<{
  text: string,
  disabled: boolean,
}>();

</script>

<template>
    <div class="container">
        <button class="container__button" :disabled="disabled">{{ text }}</button>
    </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";

  .container {

    &__button {
      width: 200.35px;
      height: 50px;
      border: 1px solid $financi-green;
      border-radius: 5px;
      background-color: $financi-green;
      color: $text-button-color;
      font-weight: bold;
      font-size: larger;
      text-align: center;
      letter-spacing: 0.08em;
      cursor: pointer;

      &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }
    }
    
  }
</style>
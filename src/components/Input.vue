<script setup lang="ts">
const {type, placeholder, modelValue} = defineProps<{
  type: "Email" | "Password" | "Text",
  label: string,
  placeholder: string,
  modelValue: string
}>();
defineEmits(["update:modelValue", "isCorrect"]);
const regex = {
  Email: /^[\w\-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  Password: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).+$/,
  Text: /.?/,
};
</script>

<template>
  <div class="container">
    <label class="container__label" :to="type">{{ label }}</label>
    <input class="container__input" :id="type" :value="modelValue" @input="[$emit('update:modelValue', $event.target.value), $emit('isCorrect', regex[type].test($event.target.value))]" :type="type" :placeholder="placeholder">
  </div>
</template>

<style scoped lang="scss">
  @import "../variables.scss";

  .container {

    &__label {
      color: $text-color-white;
      font-size: 1.1em;
      font-weight: 500;
      &::after {
        content: '*';
        color: $financi-red;
        margin-left: 2px;
      }
    }

    &__input {
      margin-top: 10px;
      background: transparent;
      width: 100%;
      padding: 20px;
      border: 1px solid gray;
      border-radius: $border-radius;
      outline: none;
      color:  $text-color-white;
      font-size: 1em;
    }

  }
</style>
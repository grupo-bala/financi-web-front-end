<script setup lang="ts">
const { numeric, modelValue } = defineProps<{
  type: "Email" | "Password" | "Text",
  label: string,
  placeholder: string,
  modelValue: string,
  required: boolean,
  numeric: boolean,
}>();

defineEmits(["update:modelValue", "isCorrect"]);
const regex = {
  Email: /^[\w\-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  Password: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).+$/,
  Text: /.?/,
};

function inputMask(value: string): string {
  if (numeric) {
    value = value.replace(/\D/g, "");
  
    if (value.length <= 2) {
      return value;
    }

    const integerPart = value.slice(0, -2);
    const decimalPart = value.slice(-2);
    const integerPartFormatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
    const result = `${integerPartFormatted},${decimalPart}`;

    console.log(result);

    return result;
  }

  return value;
}
</script>

<template>
  <div class="container">
    <label :data-required="required" class="container__label" :to="type">{{ label }}</label>
    <input class="container__input" :id="type" :value="modelValue" @input="[$emit('update:modelValue', inputMask($event.target.value)), $emit('isCorrect', regex[type].test($event.target.value))]" :type="type" :placeholder="placeholder" :inputmode="numeric ? 'numeric' : 'text'">
  </div>
</template>

<style scoped lang="scss">
  @import "../variables.scss";

  .container {

    &__label {
      color: $text-color-white;
      font-size: 1.1em;
      font-weight: 500;

      &[data-required="true"]::after {
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
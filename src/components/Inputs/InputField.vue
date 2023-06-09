<script setup lang="ts">
const props = defineProps<{
  type: "Email" | "Password" | "Text" | "Date",
  label: string,
  placeholder: string,
  modelValue: string,
  required: boolean,
  numeric: boolean,
}>();

defineEmits<{
  (e: "update:modelValue", value: string): void,
  (e: "is-correct", value: boolean): boolean
}>();
const regex = {
  Email: /^[\w\-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  Password: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).+$/,
  Text: /.?/,
  Date: /.?/,
  Numeric: /[0-9]/,
};

function onKeyPress(e: KeyboardEvent) {
  if (props.numeric && !regex.Numeric.test(e.key)) {
    e.preventDefault();
  }
}

function inputMask(value: string): string {
  if (props.numeric) {
    const minLength = 2;
    value = value.replace(/\D/g, "");

    if (value.length <= minLength) {
      return value;
    }

    const start = 0;
    const end = -2;

    const integerPart = value.slice(start, end);
    const integerPartFormatted = integerPart
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    const decimalPart = value.slice(end);

    const result = `${integerPartFormatted},${decimalPart}`;

    return result;
  }

  return value;
}
</script>

<template>
  <div class="container">
    <label
      :data-required="required"
      class="container__label"
      :for="label"
    >
      {{ label }}
    </label>
    <input
      :id="label"
      class="container__input"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :inputmode="numeric ? 'numeric' : 'text'"
      @keypress="onKeyPress"
      @input="[
        $emit(
          'update:modelValue',
          inputMask(($event.target as HTMLInputElement).value)
        ),
        $emit(
          'is-correct',
          regex[type].test(($event.target as HTMLInputElement).value)
        )
      ]"
    >
  </div>
</template>

<style scoped lang="scss">
@import "../../variables.scss";

.container {

  &__label {
    color: $text-color-white;
    font-size: 0.9em;
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
    padding: 1rem;
    border: 1px solid gray;
    border-radius: $border-radius;
    outline: none;
    color:  $text-color-white;
    font-size: 0.8em;
  }
}

@media screen and ((min-width: 768px) and (min-height: 850px)) {
  .container {
    &__label {
      font-size: 1.1rem;
    }

    &__input {
      padding: 1.5rem;
      font-size: 1rem;
    }
  }
}
</style>
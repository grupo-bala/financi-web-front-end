<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  color: "green" | "red" | "blue",
  text: string,
  disabled: boolean,
}>();

const getColor = computed(() => {
  if (props.color === "red") {
    return "#EF5350";
  } else if (props.color === "blue") {
    return "#168CC0";
  }

  return "#49AD5A";
});

</script>
<template>
  <div class="container">
    <button
      class="container__button"
      :disabled="disabled"
    >
      {{ props.text }}
    </button>
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";

.container {

  &__button {
    width: 200.35px;
    height: 50px;
    border: 1px solid v-bind(getColor);
    border-radius: 5px;
    background-color: v-bind(getColor);
    color: $text-button-color;
    font-weight: bold;
    font-size: 0.9rem;
    text-align: center;
    letter-spacing: 0.08em;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
}

@media screen and (min-width: 768px) {
  .container {
    &__button {
      font-size: 1rem;
    }
  }
}
</style>
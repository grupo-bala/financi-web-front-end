<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  color: "green" | "red" | "blue",
  text: string,
  disabled: boolean,
  id: string
}>();

const getColor = computed(() => {
  if (props.color === "red") {
    return "#F06970";
  } else if (props.color === "blue") {
    return "#23ABE6";
  }

  return "#49AD5A";
});

</script>
<template>
  <div class="container">
    <button
      :aria-label="id"
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
  display: flex;
  justify-content: center;
  width: 100%;

  &__button {
    width: 100%;
    padding: 0.5rem 1.5rem;
    border: 1px solid v-bind(getColor);
    border-radius: 5px;
    background-color: v-bind(getColor);
    color: $text-button-color;
    font-weight: bold;
    font-size: 0.75rem;
    text-align: center;
    letter-spacing: 0.08em;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
}

@media screen and ((min-width: 768px) and (min-height: 850px))   {
  .container {
    &__button {
      font-size: .9rem;
    }
  }
}
</style>
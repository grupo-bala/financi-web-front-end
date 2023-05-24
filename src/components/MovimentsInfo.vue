<script setup lang="ts">
const props = defineProps<{
  type: "Income" | "Out",
  value: string,
}>();

const label = props.type === "Income" ? "Entradas" : "Saídas";
const colorFont = props.type === "Income" ? "#49AD5A" : "#EF5350";
</script>

<template>
  <div class="moviments_container">
    <div class="moviments_container__content">
      <p
        class="
          moviments_container__content__title
        "
      >
        {{ label }}
      </p>
      <p
        class="
          moviments_container__content__value
        "
      >
        {{ props.value }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";

.moviments_container {
  width: 45%;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 10px;
    padding: 10px;
    background-color: $child-card-bg-color;
    box-shadow: $box-shadow;
    border-radius: 5px;

    &__title {
      font-size: 0.8rem;
      font-weight: 600;
      color: $text-color-gray;
    }

    &__value {
      font-size: 1.1rem;
      color: v-bind(colorFont);
      font-weight: 700;
    }
  }
}
</style>
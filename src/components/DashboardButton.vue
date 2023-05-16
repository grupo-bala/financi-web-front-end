<script setup lang="ts">
const props = defineProps<{
  type: "Income" | "Out" | "Goal",
}>();

</script>

<template>
  <div class="button_container">
    <div
      v-if="props.type === 'Out'"
      class="button_container__out"
    >
      <v-icon
        name="pr-minus-circle"
        scale="4"
      />
      <p
        class="button_container__out__text"
      >
        SAÍDA
      </p>
    </div>
    <div
      v-else-if="props.type === 'Income'"
      class="button_container__income"
    >
      <v-icon
        name="bi-plus-circle"
        scale="4"
      />
      <p
        class="button_container__income__text"
      >
        ENTRADA
      </p>
    </div>
    <div
      v-else
      class="button_container__goal"
    >
      <v-icon
        name="co-check-circle"
        scale="4"
      />
      <p
        class="button_container__goal__text"
      >
        META
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";

.button_container {
  display: flex;
  flex-direction: column;
  background-color: $child-card-bg-color;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  padding: 20px;
  cursor: pointer;

  &__out {
    color: $financi-red;

    &__text {
      padding-top: 20px;
      text-align: center;
      font-weight: 500;
    }
  }

  &__income {
    color: $financi-green;

    &__text {
      padding-top: 20px;
      text-align: center;
      font-weight: 500;
    }
  }

  &__goal {
    color: $financi-blue;

    &__text {
      padding-top: 20px;
      text-align: center;
      font-weight: 500;
    }
  }
}
</style>
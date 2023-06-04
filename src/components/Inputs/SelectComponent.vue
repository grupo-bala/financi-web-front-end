<script setup lang="ts">
import { ref, computed } from "vue";

defineEmits<{
  (e: "update:selected", value: string): void,
}>();
const props = defineProps<{ items: string[]; selected: string }>();

const opened = ref(false);
const style = computed(() => {
  const opacityFull = 1;
  const placeholderOpacity = 0.6;

  return `opacity: ${props.selected ? opacityFull : placeholderOpacity}`;
});

const currentArrow = computed(() =>
  opened.value ? "oi-triangle-down" : "oi-triangle-up",
);
</script>

<template>
  <div class="select_container">
    <label
      class="select_container__label"
      for="category"
    >
      Categoria
    </label>
    <div
      id="category"
      class="select_container__content"
    >
      <button
        class="select_container__content__button"
        :data-opened="opened"
        :style="style"
        @blur="opened = false"
        @click="opened = !opened"
      >
        {{ selected || "Selecione uma categoria" }}
        <v-icon :name="currentArrow" />
      </button>
      <div
        v-if="opened"
        class="select_container__content__items"
      >
        <button
          v-for="item in items"
          :key="item"
          class="select_container__content__items__selected"
          @mousedown="$emit('update:selected', item)"
        >
          {{ item }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scooped lang="scss">
@import "../../variables.scss";

.select_container {
  &__label {
    color: $text-color-white;
    font-size: 0.9em;
    font-weight: 500;

    &::after {
      content: '*';
      color: $financi-red;
      margin-left: 2px;
    }
  }

  &__content {
    position: relative;
    z-index: 2;

    &__button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      width: 100%;
      height: 100%;
      margin-top: 10px;
      background: transparent;
      padding: 1rem;
      border: 1px solid gray;
      border-radius: $border-radius;
      outline: none;
      color:  $text-color-white;
      font-size: 0.8em;
      cursor: pointer;

      &[data-opened="true"] {
        border-radius: $border-radius $border-radius 0 0;
      }
    }

    &__items {
      display: flex;
      flex-direction: column;
      position: absolute;
      width: 100%;
      left: 0;
      top: 100%;
      max-height: 9.3rem;
      overflow: scroll;

      &__selected {
        border: none;
        color: $text-color-white;
        background-color: $bg-color;
        text-align: left;
        padding-left: 2rem;
        font-size: 0.8em;
        padding: 1rem;
        cursor: pointer;

        &:last-child {
          border-radius: 0 0 $border-radius $border-radius;
        }

        &:hover {
          background-color: $child-card-bg-color;
        }
      }
    }
  }
}

@media screen and ((min-width:768px) and (min-height: 850px)) {
  .select_container {
    &__label {
      font-size: 1.1rem;
    }

    &__content {
      &__button {
        padding: 1.5rem;
        font-size: 1rem;
      }

      &__items {
        &__selected {
          padding: 1.2rem;
          font-size: 1rem;
        }
      }
    }
  }
}
</style>
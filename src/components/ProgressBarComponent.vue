<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  percent: number,
}>();

const percent = ref(props.percent);
</script>

<template>
  <div class="progress_container">
    <div class="progress_container__circle">
      <div class="progress_container__circle__inner">
        {{ percent }}%
      </div>
    </div>
    <div class="progress_container__bar">
      <p>{{ percent }}% atingido</p>
      <div class="progress_container__bar__percent">
        <progress
          :value="percent"
          max="100"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";

.progress_container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  &__circle {
    color: $text-color-white;
    background: conic-gradient(
      $financi-blue calc(v-bind(percent) * 1%), white 0
    );
    border-radius: 50%;
    width: 70%;
    height: 70%;
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    &__inner {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 78%;
      height: 78%;
      background-color: $card-bg-color;
      color: $text-color-white;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 50%;
    }
  }

  &__bar {
    display: none;
  }
}

@media screen and (min-width: 800px) {
  .progress_container {
    &__circle {
      display: none;
    }

    &__bar {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: .5rem;

      p {
        font-size: .9rem;
        color: $financi-blue;
        font-weight: 600;
      }

      &__percent {
        position: relative;
        display: inline-block;
        background: #eee;
        height: 9px;
        border-radius: $border-radius;
        overflow: hidden;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: calc(v-bind(percent) * 1%);
          background: $financi-blue;
        }

        progress {
          opacity: 0;
        }
      }
    }
  }
}
</style>
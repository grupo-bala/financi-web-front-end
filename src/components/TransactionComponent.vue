<script setup lang="ts">

const props = defineProps<{
  title: string,
  date: string,
  value: number,
}>();

const auxMultiplyer = -1;
const limit = 0;
let isNegative = false;
let newValue = 0;

if(props.value < limit) {

  isNegative = true;
  newValue = props.value * auxMultiplyer;
}

</script>
<template>
  <div class="container">
    <button class="container__button">
      <div class="container__button__description">
        <p class="container__button__description__title">
          {{ props.title }}
        </p>
        <p class="container__button__description__date">
          {{ props.date }}
        </p>
      </div>
      <div class="container__button__value">
        <p
          v-if="isNegative"
          class="container__button__value__red"
        >
          -R$ {{ newValue }}
        </p>
        <p
          v-else
          class="container__button__value__green"
        >
          R$ {{ props.value }}
        </p>
      </div>
    </button>
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";

  .container {

    &__button {
      display: flex;
      flex-direction: row;
      border-radius: 5px;
      border-color: $child-card-bg-color;
      align-items: center;
      justify-content: space-between;
      background-image: url("../assets/News.png");
      background-repeat: no-repeat;
      background-position: left ;
      background-position-x: 10px;
      cursor: pointer;

      @media (min-width: 320px) {
        background-color: $card-bg-color;
        width: 362px;
        height: 69px;
      }

      @media (min-width: 600px) {
        background-color: $child-card-bg-color;
        width: 618px;
        height: 69px;
      }

      &__description {
        align-items: flex-start;
        justify-content: center;
        margin-left: 50px;
        display: flex;
        flex-direction: column;
        min-height: 50px;

        &__title {
          font-size: 15px;
          color: $text-color-white;
        }

        &__date {
          font-size: 10px;
          color: $text-color-gray;
        }
      }

      &__value {
        display: flex;
        flex-direction: row-reverse;
        justify-content: left;
        width: 75px;

        &__green {
          color:green;
          margin-left: 4.5px;
        }

        &__red {
          color:red;
        }
      }
    }

  }
</style>
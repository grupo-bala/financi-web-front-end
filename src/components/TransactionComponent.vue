<script setup lang="ts">

const props = defineProps<{
  title: string,
  date: string,
  value: number,
  category: string,
}>();

const auxMultiplyer = -1;
const limit = 0;
let isNegative = false;
let newValue = 0;
let newCategory = "";

if(props.value < limit) {

  isNegative = true;
  newValue = props.value * auxMultiplyer;
}

function getCategoryIcon(): string {
  switch (props.category) {
  case "Hospital":
    newCategory = "fa-briefcase-medical";
    break;
  case "Food":
    newCategory = "md-food-bank-round";
    break;
  case "Gift":
    newCategory = "fa-gifts";
    break;
  case "Payments":
    newCategory = "md-payments-round";
    break;
  case "Studies":
    newCategory = "md-school-round";
    break;
  default:
    newCategory = "md-error";
    break;
  }
  return newCategory;
}

const categoryImage = getCategoryIcon();

</script>
<template>
  <div class="container">
    <button class="container__button">
      <div class="container__button__description">
        <v-icon
          class="container__button__description__category-image"
          :name="categoryImage"
        />
        <div class="container__button__description__text">
          <p class="container__button__description__text__title">
            {{ props.title }}
          </p>
          <p class="container__button__description__text__date">
            {{ props.date }}
          </p>
        </div>
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
      align-items: center;
      justify-content: space-between;
      background-repeat: no-repeat;
      background-position: left ;
      background-position-x: 10px;
      cursor: pointer;

      @media (min-width: 320px) {
        background-color: $card-bg-color;
        border-color: $card-bg-color;
        width: 362px;
        height: 69px;
      }

      @media (min-width: 600px) {
        background-color: $child-card-bg-color;
        border-color: $child-card-bg-color;
        width: 618px;
        height: 69px;
      }
      @media (min-width: 1444px) {
        background-color: $child-card-bg-color;
        border-color: $child-card-bg-color;
        width: 1425px;
      }

      &__description {
        align-items: center;
        justify-content: center;
        margin-left: 15px;
        display: flex;
        flex-direction: row;
        min-height: 50px;

        &__category-image {
          color: $text-color-white;
          height: 30px;
          width: 30px;
        }

        &__text {
          display: flex;
          flex-direction: column;
          align-items: start;
          margin-left: 10px;

          &__title {
            font-size: 15px;
            color: $text-color-white;
          }

          &__date {
            font-size: 10px;
            color: $text-color-gray;
          }
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
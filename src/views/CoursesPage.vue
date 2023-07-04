<script setup lang="ts">
import InputField from "../components/Inputs/InputField.vue";
import CourseList from "../components/CourseList.vue";
import Logo from "../components/LogoFinanci.vue";

</script>

<template>
  <div class="courses">
    <div class="courses__container">
      <div class="courses__container__header">
        <h1>Cursos</h1>
        <form class="courses__container__header__form">
          <InputField
            model-value=""
            type="Text"
            label=""
            placeholder="Pesquisar"
            :required="false"
            :numeric="false"
          />
        </form>
      </div>
      <CourseList
        :quantity="10"
        show-load-more
      />
    </div>
    <footer>
      <Logo />
    </footer>
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";

.courses {
  min-height: 100dvh;
  color: $text-color-white;
  padding: 5rem 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;

  &__container {
    width: 100%;
    max-width: 1000px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    &__header {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1rem;

    }
  }
}

@media (min-width: 800px) {
  .courses {
    &__container {
      background-color: $card-bg-color;
      border-radius: $border-radius;
      box-shadow: $box-shadow;
      padding: 3rem;

      &__header {
        h1 {
          align-self: flex-start;
        }
      }
    }
  }
}

h1 {
  align-self: center;

}
</style>
<script setup lang="ts">

import axios from "axios";
import router from "../router/index";
import { ref } from "vue";
import SuspenseBox from "./Suspense/SuspenseBox.vue";

type Course = {
    title: string,
    description: string,
    id: number,
    howManyLessons: number,
    averageTimePerLesson: number,
    totalTime: number,
};

type SuccesfulReponse = {
  data: Course[],
  pages: number,
};

const props = defineProps<{
    quantity: number,
    showLoadMore?: boolean,
}>();

const baseURL = import.meta.env.VITE_API_URL as string;
const initialPage = 0;
const isLoading = ref(true);
const page = ref(initialPage);
const totalPages = ref(initialPage);
const courses = ref<Course[]>([]);
const allCourses = ref<Course[]>([]);

async function getCourses() {
  isLoading.value = true;
  try {
    page.value++;
    const res = await axios.get<SuccesfulReponse>(
      `${baseURL}/get-all-courses?page=${page.value}&size=${props.quantity}`,
    );
    const json = res.data;
    totalPages.value = json.pages;
    courses.value = json.data;
    allCourses.value.push(...courses.value);
    isLoading.value = false;

  } catch (e) {
    router.push("/ops");
  }
}

const denominator = 60;

function convertToHour(seconds: number){
  return Math.round(convertToMinute(seconds)/denominator);
}

function convertToMinute(seconds: number){
  return Math.round(seconds/denominator);
}
getCourses();
</script>

<template>
  <div>
    <div
      v-if="allCourses.length !== 0"
      class="course__list"
    >
      <SuspenseBox
        :is-loading="isLoading && page === 1"
        loading-width="100%"
        loading-height="200px"
        :quantity="props.quantity"
      >
        <ul
          v-for="course in allCourses"
          :key="course.id"
          class="course__list__item"
        >
          <div class="course__list__item__top">
            <span class="course__list__item__top__title">
              {{ course.title }}
            </span>
            <span class="course__list__item__top__description">
              {{ course.description }}
            </span>
          </div>
          <div class="course__list__item__bottom">
            <div class="course__list__item__bottom__load">
              <span class="course__list__item__bottom__load__icon">
                <v-icon
                  name="md-accesstime-round"
                  fill="#4ECB71"
                  scale="0.8"
                />
              </span>
              <span class="course__list__item__bottom__load__info">
                Carga horária
                <p>{{ convertToHour(course.totalTime) + " horas" }} </p>
              </span>
            </div>
            <div class="course__list__item__bottom__lesson">
              <span class="course__list__item__bottom__lesson__icon">
                <v-icon
                  name="md-ondemandvideo-round"
                  fill="#4ECB71"
                  scale="0.8"
                />
              </span>
              <span class="course__list__item__bottom__lesson__info">
                {{ course.howManyLessons + " Aulas" }}
                <p>
                  {{ convertToMinute(course.averageTimePerLesson)
                    + " minutos" }}
                </p>
              </span>
            </div>
          </div>
          <button
            aria-label="ver curso"
            class="course__list__item__button"
            @click="router.push(`/courses/${course.id}`)"
          >
            <h3> VER CURSO </h3>
          </button>
        </ul>
      </SuspenseBox>
      <SuspenseBox
        :is-loading="isLoading"
        loading-width="100%"
        loading-height="70px"
        :quantity="props.quantity"
      />
      <button
        v-if="props.showLoadMore && totalPages !== page"
        aria-label="carregar mais cursos"
        :disabled="isLoading"
        class="course__list__seemore"
        @click="getCourses()"
      >
        <h4>VER MAIS</h4>
      </button>
    </div>
    <div
      v-else
      class="course__list"
    >
      <h3> Ainda não há cursos</h3>
    </div>
  </div>
</template>

<style lang="scss">
@import "../variables.scss";

.course__list {
  list-style: none;
  display: flow-root;

  &__seemore {
    width: 100%;
    height: 2rem;
    border-radius: $border-radius;
    text-align: center;
    background-color: $financi-green;
    color: $text-color-white;
    margin-top: 1rem;
    border: none;
    cursor: pointer;

    h4 {
      letter-spacing: 0.08rem;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: .2;
    }
  }

  &__item {
    height: auto;
    background-color: $section-color;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1em;
    margin-bottom: 2rem;
    border-radius: $border-radius;
    box-shadow: $box-shadow;
    align-items: center;
    &__button {
      width: 100%;
      cursor: pointer;
      border-radius: $border-radius;
      padding: 0.5em;
      margin-top: 1.2rem;
      color: $text-color-black;
      background-color: $financi-green;
      border-style: none;
      h3{
        font-size: .80rem;
        letter-spacing: 0.08rem;
      }
    }
    &__top {
      display: flex;
      flex-direction: column;
      align-items: center;
      &__title {
        font-size: 1.3em;
        font-weight: bold;
        text-overflow: ellipsis;
        overflow: hidden;
        padding-bottom: 0.2em;
        text-align: center;
      }
      &__description {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 0.8em;
        text-align: center;
      }
    }
    &__bottom {
      display: flex;
      width: 100%;
      padding: 1em 1em 0em 1em;
      justify-content: space-between;
      font-size: .8em;
      &__load {
        display: flex;
        padding-right: 1rem;
        gap: 0.5em;
        &__info {
          font-weight: 700;
        }
      }
      &__lesson {
        display: flex;
        gap: 0.5em;
        &__info {
          font-weight: 700;
        }
      }
    }
  }
}

p {
  padding-top: 2px;
  font-size: 0.8em;
  font-weight: normal;
}

@media (min-width: 800px) {
  .course__list {
    display: flex;
    justify-content: center;
    &__item {
      background-color: $filter-bg-color;
      height: 200px;
      width: auto;
      padding: 1.5em 2.2em 1.5em 2.2em;
      &__top{
        &__description {
          font-size: 0.9em;
        }
      }
      &__bottom {
        display: flex;
        justify-content: center;
        gap: 10rem;
        font-size: 0.9em;
      }
    }
  }
  p {
    font-size: 0.9em;
  }
}

</style>
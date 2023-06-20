<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

type Lesson = {
  title: string,
  time: number,
  isWatched: boolean,
  id: number,
};

type LessonResponse = {
  data: Lesson[],
  pages: number,
};

const baseURL = import.meta.env.VITE_API_URL as string;
const initialPage = 0;
const isLoading = ref(true);
const page = ref(initialPage);
const totalPages = ref(initialPage);
const lessons = ref<Lesson[]>([]);
const route = useRoute();
const router = useRouter();
const courseId = route.params.id;
const props = defineProps<{
  quantity: number,
}>();

const emit = defineEmits<{
  (e: "watch", id: number): void,
}>();

function convertTime(seconds: number){
  const sixty = 60;
  const threeThousandSixHundred = 3600;
  const hours = Math.floor(seconds / threeThousandSixHundred);
  const minutes = Math.floor(seconds % threeThousandSixHundred / sixty);
  const secondsRestantes = seconds % sixty;

  const two = 2;
  const hoursString = hours.toString().padStart(two, "0");
  const minutesString = minutes.toString().padStart(two, "0");
  const secondsString = secondsRestantes.toString().padStart(two, "0");

  return `${hoursString}:${minutesString}:${secondsString}`;
}

async function getLessons() {
  isLoading.value = true;
  try {
    page.value++;
    const res = await axios.get<LessonResponse>(
      `${baseURL}/get-all-lessons?page=${page.value}&size=${props.quantity}
      &courseId=${courseId}`,
    );
    const json = res.data;
    totalPages.value = json.pages;
    lessons.value = json.data;
    isLoading.value = false;
  } catch (e) {
    router.push("/ops");
  }
}

async function changeWatched(id: number, status: boolean){
  emit("watch", id);
  try{
    await axios.put(
      `${baseURL}/update-lesson-watched-status`,
      { id, courseId, status });
    lessons.value.forEach((lesson) => {
      if(lesson.id === id){
        lesson.isWatched = status;
      }
    });
  } catch(e) {
    router.push("/ops");
  }

}

getLessons();

</script>

<template>
  <div class="lessons__list">
    <ul
      class="lessons__list__item"
    >
      <button
        v-for="lesson in lessons"
        :key="lesson.title"
        class="lessons__list__item__button"
        :data-status="`${lesson.isWatched ? 'checked' : ''}`"
        @click="changeWatched(lesson.id, !lesson.isWatched)"
      >
        <li
          class="lessons__list__item__button__check"
        >
          <div class="lessons__list__item__button__check__bullet" />
          <span class="lessons__list__item__button__check__title">
            {{ lesson.title }}
          </span>
          <span class="lessons__list__item__button__check__time">
            {{ convertTime(lesson.time) }}
          </span>
        </li>
      </button>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";

.lessons__list {
  margin: 1.3rem;
  color: $financi-green;
  border-radius: $border-radius;

  &__item {
    display: flex;
    padding: 1.5rem;
    width: 100%;
    border-radius: $border-radius;
    list-style: none;
    flex-direction: column;
    gap: 1rem;
    background-color: $filter-bg-color;

    &__button {
      width: 100%;
      cursor: pointer;
      background-color: transparent;
      border-style: none;
      color: $text-color-white;
      gap: 1rem;

      &__check {
        display: flex;
        align-items: center;
        gap: 1rem;
        width: 100%;
        position: relative;

        &__title {
          flex-grow: 1;
          text-align: start;
        }

        &__bullet {
          position: relative;

          &::before {
            content: "";
            position: absolute;
            top: -5px;
            width: 10px;
            height: 10px;
            background: $input-bg-color;
            border-radius: 50%;
            box-sizing: content-box;
            cursor: pointer;
            z-index: 1;
          }
        }
      }

      &:not(:last-child)
      &__check::after {
        content: "";
        width: 2px;
        height: calc(50% + 0.5rem);
        min-height: 30px;
        background: $filter-text-color;
        position: absolute;
        top: 50%;
        left: 4px;
      }

      &:not(:first-child)
      &__check::before {
        content: "";
        width: 2px;
        height: calc(50% + 0.5rem);
        min-height: 30px;
        background: $filter-text-color;
        position: absolute;
        bottom: calc(50% + 0.3rem);
        left: 4px;
      }

      &[data-status="checked"]
      &__check::after,
      &[data-status="checked"]
      + & &__check::before {
        background: #49ad5a;
      }

      &[data-status="checked"]
      &__check__bullet::after {
        content: "";
        width: 16px;
        height: 16px;
        border-radius: 50%;
        position: absolute;
        left: -3px;
        top: -8px;
      }

      &[data-status="checked"]
      &__check__bullet::after {
        background: #49ad5a;
      }

      &[data-status="checked"]
      &__check__bullet::before {
        background: $bg-color;
      }

      &[data-status="checked"]
      &__check__title {
        color: #49ad5a;
      }
    }
  }
}

@media (min-width: 900){
  .lessons__list {
    padding: 0;
  }
}
</style>
<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
//import { useCourseStore } from "../stores/courseStore";

type Lesson = {
    title: string,
    time: number,
    videoURL: string,
    courseId: number,
};

type SuccesfulReponse = {
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

function convertTime(time: number){
  const seconds = 60;
  return Math.ceil(time/seconds);
}

async function getLessons() {
  isLoading.value = true;
  try {
    page.value++;
    const res = await axios.get<SuccesfulReponse>(
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
        data-status="checked"
      >
        <li
          class="lessons__list__item__button__check"
        >
          <div class="lessons__list__item__button__check__bullet" />
          <span class="lessons__list__item__button__check__title">
            {{ lesson.title }}
          </span>
          <span class="lessons__list__item__button__check__time">
            00:{{ convertTime(lesson.time) > 9
              ? convertTime(lesson.time) : "0" + convertTime(lesson.time) }}
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
  background-color: $section-color;
  color: $financi-green;
  border-radius: $border-radius;
  padding: 1rem;

  &__item {
    display: flex;
    padding-top: 1rem;
    padding-bottom: 0.5rem;
    width: 100%;
    list-style: none;
    flex-direction: column;
    gap: 1rem;

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

        &__title {
          flex-grow: 1;
          text-align: start;
        }

        &__bullet {
          width: 10px;
          height: 10px;
          background: $input-bg-color;
          border-radius: 50%;
          box-sizing: content-box;
          position: relative;
          transform-style: preserve-3d;
          cursor: pointer;
        }
      }

      &:not(:last-child)
      &__check__bullet::after {
        content: "";
        width: 2px;
        height: 1.5rem;
        background: $filter-text-color;
        position: absolute;
        top: 100%;
        left: calc(50% - 1px);
      }

      &[data-status="checked"] +
      &:not([data-status="checked"])
      &__check__bullet {
        background: #49ad5a;
      }

      &[data-status="checked"]
      &__check__bullet::before {
        content: "";
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #49ad5a;
        position: absolute;
        transform: translatez(-1px);
        inset: calc(50% - 8px);
      }

      &[data-status="checked"]
      &__check__bullet::after {
        background: #49ad5a;
      }

      &[data-status="checked"]
      &__check__bullet {
        background: $bg-color;
      }

      &[data-status="checked"]
      &__check__title {
        color: #49ad5a;
      }
    }
  }
}

</style>
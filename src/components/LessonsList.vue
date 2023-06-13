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

  const denominator = 60;
  const limit = 9;
  let minutes = Math.floor(seconds/denominator);
  seconds = Math.round(seconds % denominator);

  if(minutes < limit){
    if(seconds < limit){
      return "0" + minutes + ":" + "0" + seconds;
    }
    return "0" + minutes + ":" + seconds;
  }
  if(seconds < limit){
    return minutes + ":" + "0" + seconds;
  }

  return minutes + ":" + seconds;
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

@media (min-width: 900){
  .lessons__list {
    padding: 0;
  }
}
</style>
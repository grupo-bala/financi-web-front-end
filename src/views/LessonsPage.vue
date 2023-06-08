<script setup lang="ts">
import { computed, ref } from "vue";
import LessonsList from "../components/LessonsList.vue";
import Logo from "../components/LogoFinanci.vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

type Lessons = {
  id: number,
  title: string,
  isWatched: boolean,
  time: string,
}

type Lesson = {
  courseId: number,
  durationSecs: number,
  id: number,
  name: string,
  videoURL: string,
  viewedLesson: boolean,
}

type Course = {
    title: string,
    description: string,
    id: number,
    howManyLessons: number,
    averageTimePerLesson: number,
    totalTime: number,
};

type LessonResponse = {
  data: Lesson,
}

type CourseResponse = {
  data: Course,
  pages: number,
}

type LessonsResponse = {
  data: Lessons[],
  pages: number,
}

const route = useRoute();
const router = useRouter();
const courseId = route.params.id;
const lessons = ref<Lessons[]>([]);
const currentLessonId = ref<Lessons>();
const currentLesson = ref<Lesson>();
const course = ref<Course>();
const baseURL = import.meta.env.VITE_API_URL as string;
const initialPage = 0;
const page = ref(initialPage);
const totalPages = ref(initialPage);
const quantity = 10;
const videoCode = computed(() => {
  return currentLesson.value?.videoURL.split("v=")[1];
});

async function getAllLessons(){
  try {
    page.value++;
    const res = await axios.get<LessonsResponse>(
      `${baseURL}/get-all-lessons?page=${page.value}
      &size=${quantity}&courseId=${courseId}`,
    );
    const json = res.data;
    totalPages.value = json.pages;
    lessons.value = json.data;

    currentLessonId.value = lessons.value[0];

    getLesson();
  } catch(e){
    router.push("/ops");
  }
}

async function getLesson(){
  try {
    const res = await axios.get<LessonResponse>(
      `${baseURL}/get-lesson?id=${currentLessonId.value?.id}
      &courseId=${courseId}`,
    );
    const json = res.data;
    currentLesson.value = json.data;
  } catch(e){
    return null;
  }
}

async function getCourse(){
  try {
    const res = await axios.get<CourseResponse>(
      `${baseURL}/get-course?id=${courseId}`,
    );
    const json = res.data;
    course.value = json.data;
  } catch(e){
    router.push("/ops");
  }
}

getAllLessons();
getCourse();
</script>

<template>
  <main class="lessons">
    <div class="lessons__container">
      <div class="lessons__container__video">
        <h1> {{ course?.title }} </h1>
        <iframe
          :src="`https://www.youtube.com/embed/${videoCode}`"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media;
          gyroscope; picture-in-picture; web-share;"
          allowfullscreen
        />
      </div>
      <div class="lessons__container__list">
        <LessonsList
          :quantity="10"
        />
      </div>
    </div>
    <footer>
      <Logo />
    </footer>
  </main>
</template>

<style scoped lang="scss">
  @import "../variables.scss";

.lessons {
  width: 100vw;
  min-height: 100dvh;
  color: $text-color-white;
  background-color: $bg-color;
  display: flex;
  align-items: center;
  flex-direction: column;
  &__container {
    width: 100%;
    max-width: 1400px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    &__video {
      text-align: center;
      width: 100%;
      padding: 2rem 0 1rem 0;
    }
    &__list {
      width: 100%;
    }
  }
}
h1 {
  padding-bottom:  1rem;
}

iframe {
  width: 100%;
  height: 300px;
}

@media (min-width: 900px){
.lessons {
  justify-content: center;
  &__container {
    background-color: $card-bg-color;
    border-radius: $border-radius;
    box-shadow: $box-shadow;
    padding: 5rem 2rem;
    display: flex;
    flex-direction: row;
  }
}

  iframe {
    height: 400px;
  }
}
</style>
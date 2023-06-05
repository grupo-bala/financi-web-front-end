<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import SuspenseBox from "../components/Suspense/SuspenseBox.vue";
import LessonsList from "../components/LessonsList.vue";
import axios from "axios";
//import { defineStore } from "pinia";

type Lesson = {
    name: string,
    duration: number,
    videoURL: string,
    courseId: number,
};

type LessonsReponse = {
  data: Lesson[],
  pages: number,
};

// type LessonReponse = {
//   data: Lesson,
//   pages: number,
// };
// const currentLesson = ref<Lesson>();

const route = useRoute();
const router = useRouter();
const courseId = route.params.id;
const baseURL = import.meta.env.VITE_API_URL as string;
const isLoading = ref(true);
const initialPage = 0;
const page = ref(initialPage);
const totalPages = ref(initialPage);
const lessons = ref<Lesson[]>([]);
const quantity = 10;
const courseTitle = "Example";

async function getAllLessons() {
  isLoading.value = true;
  try {
    page.value++;
    const res = await axios.get<LessonsReponse>(
      `${baseURL}/get-all-lessons?page=${page.value}&size=${quantity}
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

// async function getLesson(){
//   try {
//     const res = await axios.get<LessonReponse>(
//       `${baseURL}/get-lesson?id=${}
//       &courseId=${courseId}`,
//     );
//     const json = res.data;
//     currentLesson.value = json.data;
//   } catch (e) {
//     router.push("/ops");
//   }
// }

getAllLessons();
</script>

<template>
  <main>
    <div class="container">
      <h3> {{ courseTitle }} </h3>
      <div class="container__video">
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/videoCode"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media;
          gyroscope; picture-in-picture; web-share;"
          allowfullscreen
        >
          .
        </iframe>
      </div>
      <div class="container__list">
        <SuspenseBox
          :is-loading="isLoading"
          loading-width="100%"
          loading-height="300px"
          :quantity="1"
        />
        <LessonsList
          :quantity="10"
        />
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
  @import "../variables.scss";

.container {
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
  color: $text-color-white;
  &__video {
    width: 100%;
    padding: 2rem 0 1rem 0;
  }
  &__list {
    width: 100%;
  }
}
</style>
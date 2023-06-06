<script setup lang="ts">
import { ref } from "vue";
import LessonsList from "../components/LessonsList.vue";
import Logo from "../components/LogoFinanci.vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

type Lesson = {
    name: string,
    duration: number,
    videoURL: string,
    courseId: number,
};

type Course = {
    title: string,
    description: string,
    id: number,
    howManyLessons: number,
    averageTimePerLesson: number,
    totalTime: number,
};

type SuccesfulReponse = {
  data: Course,
}

const route = useRoute();
const router = useRouter();
const courseId = route.params.id;

const currentLesson = ref<Lesson>();
const course = ref<Course>();
const baseURL = import.meta.env.VITE_API_URL as string;

async function getCourse(){
  try {
    const res = await axios.get<SuccesfulReponse>(
      `${baseURL}/get-course?courseId=${courseId}`,
    );
    const json = res.data;
    course.value = json.data;
  } catch(e){
    //router.push("/ops");
  }
}

getCourse();
</script>

<template>
  <main class="lessons">
    <div class="lessons__container">
      <h3> {{ course?.title }} </h3>
      <div class="lessons__container__video">
        <iframe
          src="https://www.youtube.com/embed/videoCode"
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
      width: 100%;
      padding: 2rem 0 1rem 0;
    }
    &__list {
      width: 100%;
    }
  }
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
    padding: 1rem;
}
}
</style>
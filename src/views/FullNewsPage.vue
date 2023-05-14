<script setup lang="ts">
import axios from "axios";
import { ref, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import LogoFinanci from "../components/LogoFinanci.vue";
import { Skeletor } from "vue-skeletor";
import "vue-skeletor/dist/vue-skeletor.css";

interface News {
  author: string;
  title: string;
  content: string;
  imgURL: string;
  lastUpdateDate?: string;
  publishDate: string;
  summary: string;
  id: number;
}

interface NewsResponse {
  data: News;
}

const route = useRoute();
const router = useRouter();
const newsId = route.params.id;

const isLoading = ref(true);
const isImageLoading = ref(true);
let news = reactive<News>({
  author: "",
  title: "",
  content: "",
  imgURL: "",
  lastUpdateDate: "",
  publishDate: "",
  summary: "",
  id: 0,
});

onMounted(async () => {
  try {
    const baseURL = import.meta.env.VITE_API_URL;
    const res = await axios.get<NewsResponse>(
      `${baseURL}/get-news?id=${newsId}`,
    );

    news = res.data.data;
    isLoading.value = false;
  } catch (_) {
    router.push("/ops");
  }
});

</script>

<template>
  <main class="news">
    <div
      class="new__content"
    >
      <h1
        v-if="!isLoading"
        class="new__content__title"
      >
        {{ news.title }}
      </h1>
      <Skeletor
        v-else
        width="100%"
        height="100px"
        class="skeletor"
      />
      <h2
        v-if="!isLoading"
        class="new__content__summary"
      >
        {{ news.summary }}
      </h2>
      <Skeletor
        v-else
        width="100%"
        height="50px"
        class="skeletor"
      />
      <p
        v-if="!isLoading"
        class="new__content__author_date"
      >
        Escrito por {{ news.author }} |
        {{ new Date(news.publishDate).toLocaleDateString("pt-BR") }}
      </p>
      <Skeletor
        v-else
        width="30%"
        height="20px"
        class="skeletor"
      />
      <hr class="new__content__line_break">
      <img
        class="new__content__img"
        :style="{ display: isImageLoading ? 'none' : 'block' }"
        :src="news.imgURL"
        alt="Imagem de capa da notícia"
        @load="isImageLoading = false"
      >
      <Skeletor
        v-if="isImageLoading"
        width="100%"
        height="600px"
        class="skeletor"
      />
      <div
        v-if="!isLoading"
        class="new__content__paragraphs"
      >
        <p
          v-for="paragraph of news.content.split('\n')"
          :key="paragraph"
        >
          {{ paragraph }}
        </p>
      </div>
      <Skeletor
        v-else
        width="100%"
        height="100px"
        class="skeletor"
      />
    </div>
    <LogoFinanci />
  </main>
</template>

<style scoped lang="scss">
@import "../variables.scss";

.news {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: $bg-color;
  min-height: 100svh;
  width: 100%;
  color: $text-color-white;
  padding: 2rem;

  &__content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 70ch;
    width: 100%;

    &__summary {
      font-size: 1rem;
      font-weight: normal;
      opacity: .8;
      text-align: justify;
    }

    &__author_date {
      font-weight: bold;
      opacity: .6;
    }

    &__line_break {
      margin-bottom: 20px;
    }

    &__img {
      max-width: 100%;
    }

    &__paragraphs {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      font-size: 1rem;
      text-align: justify;
    }
  }
}

.skeletor {
  border-radius: 5px;
}
</style>
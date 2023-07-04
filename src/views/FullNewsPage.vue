<script setup lang="ts">
import axios from "axios";
import { ref, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import LogoFinanci from "../components/LogoFinanci.vue";
import SuspenseImage from "../components/Suspense/SuspenseImage.vue";
import SuspenseBox from "../components/Suspense/SuspenseBox.vue";
import ReadMask from "../components/ReadMask.vue";
import FontSizeChanger from "../components/FontsizeChanger.vue";

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
const readMask = ref(false);
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
    <ReadMask :is-active="readMask" />
    <FontSizeChanger :is-ready="!isLoading" />
    <div
      class="news__content"
    >
      <div class="news__content__header">
        <SuspenseBox
          :is-loading="isLoading"
          loading-width="100%"
          loading-height="100px"
        >
          <h1
            class="news__content__header__title"
            data-font
          >
            {{ news.title }}
          </h1>
        </SuspenseBox>
        <SuspenseBox
          :is-loading="isLoading"
          loading-width="100%"
          loading-height="50px"
        >
          <h2
            class="news__content__header__summary"
            data-font
          >
            {{ news.summary }}
          </h2>
        </SuspenseBox>
        <SuspenseBox
          :is-loading="isLoading"
          loading-width="30%"
          loading-height="20px"
        >
          <p
            class="news__content__header__author_date"
            data-font
          >
            Escrito por {{ news.author }} |
            {{ new Date(news.publishDate).toLocaleDateString("pt-BR") }}
          </p>
        </SuspenseBox>
        <button
          class="news__content__header__readmask_btn"
          data-font
          @click="readMask = !readMask"
        >
          {{ readMask ? "Desativar" : "Ativar" }} máscara de leitura
        </button>
        <hr class="news__content__header__line_break">
      </div>
      <div class="news__content__inner">
        <SuspenseImage
          :src="news.imgURL"
          img-class="news__content__inner__img"
        />
        <SuspenseBox
          :is-loading="isLoading"
          loading-width="100%"
          loading-height="100px"
        >
          <div
            v-if="!isLoading"
            class="news__content__inner__paragraphs"
          >
            <p
              v-for="paragraph of news.content.split('\n')"
              :key="paragraph"
              data-font
            >
              {{ paragraph }}
            </p>
          </div>
        </SuspenseBox>
      </div>
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
    align-items: center;
    gap: 1rem;
    width: 100%;

    &__header {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 80ch;
      max-width: 100%;

      &__title {
        font-size: 2.5rem;
      }

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

      &__readmask_btn {
        background-color: transparent;
        border: none;
        cursor: pointer;
        color: $text-color-white;
        font-weight: bold;
        text-decoration: underline;
        max-width: fit-content;
        font-size: 1.2rem;
        align-self: flex-end;
      }

      &__line_break {
        margin: 1rem 0;
      }
    }

    &__inner {
      display: flex;
      flex-direction: column;
      gap: .8rem;
      max-width: 70ch;

      :deep &__img {
        width: 100%;
        aspect-ratio: 1 / 1;
        margin-bottom: 1rem;
      }

      &__paragraphs {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        font-size: 1rem;
        text-align: justify;
      }
    }
  }
}
</style>
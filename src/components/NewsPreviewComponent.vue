<script setup lang="ts">
import router from "../router/index";
import { ref } from "vue";
import axios from "axios";
import SuspenseImage from "../components/Suspense/SuspenseImage.vue";

interface NewsPreview {
  title: string;
  publishDate: string;
  imgURL: string;
  id: number;
}

const baseURL = import.meta.env.VITE_API_URL;
const news = ref<NewsPreview[]>([]);
const allNews = ref<NewsPreview[]>([]);
const howManyPages = ref<number>();
const page = 1;
const currentPage = ref(page);

async function getNews() {
  const response =
    await axios
      .get(`${baseURL}/get-all-news-preview?page=${currentPage.value}
      &size=3`);
  const json = response.data;
  howManyPages.value = json.pages;
  news.value = json.data;
  allNews.value.push(...news.value);
}

getNews();
</script>

<template>
  <div>
    <li
      v-for="{id, imgURL, publishDate, title } in allNews"
      :key="title"
      class="list"
    >
      <button
        class="list__button"
        @click="router.push(`/news/${id}`)"
      >
        <SuspenseImage
          :src="imgURL"
          img-class="list__button__image"
        />
        <div class="list__button__info">
          <p class="list__button__info__title">
            {{ title }}
          </p>
          <p class="list__button__info__date">
            {{ new Date(publishDate).toLocaleDateString("pt-BR") }}
          </p>
        </div>
      </button>
    </li>
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";

.list {
    border-bottom: $border-color;
    &__button {
        display: flex;
        align-items: center;
        color: $text-color-white;
        background-color: $section-color;
        box-shadow: none;
        height: 7rem;
        width: 100%;
        &__info {
            display: flex;
            width: 100%;
            &__title {
                padding-left: 1rem;
                width: 100%;
                text-align: left;
            }
            &__date{
                padding-right: 1rem;
            }
        }
        :deep &__image {
            padding: 0;
            border-radius: 10px;
            max-height: 5rem;
            max-width: 5rem;
        }
    }
}

button {
    border: none;
    cursor: pointer;
}
</style>
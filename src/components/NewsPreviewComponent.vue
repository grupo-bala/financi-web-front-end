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
      &size=4`);
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
        aria-label="noticia"
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
  list-style: none;
  margin-bottom: 1rem;

  &__button {
    display: flex;
    align-items: center;
    color: $text-color-white;
    background-color: $section-color;
    box-shadow: $box-shadow;
    border-radius: $border-radius;
    height: 5rem;
    width: 100%;
    padding: 0rem 1rem;

    &__info {
      display: flex;
      width: 100%;

      &__title {
        font-size: 0.8rem;
        font-weight: 600;
        padding: 0rem 1rem;
        width: 100%;
        text-align: left;
      }

      &__date {
        display: flex;
        align-items: center;
      }
    }

    :deep &__image {
      padding: 0;
      border-radius: $border-radius;
      max-height: 3.5rem;
      max-width: 3.5rem;
    }
  }
}

@media screen and (min-width: 800px) {
  .list {
    &__button {
      background-color: $child-card-bg-color;

      &__info {
        &__title {
          font-weight: 700;
        }

        &__date {
          font-weight: 500;
        }
      }
    }
  }
}

button {
  border: none;
  cursor: pointer;
}
</style>
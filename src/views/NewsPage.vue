<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import Navbar from "../components/Navbar/ChosenNavbar.vue";
import Logo from "../components/LogoFinanci.vue";

interface NewsPreview {
    title: string;
    publishDate: string;
    imgURL: string;
}

const news = ref<NewsPreview[]>([]);
const howManyPages = ref<number>();
const initialPage :number = 1;

async function getNews() {
  const response =
    await axios
      .get(`https://financi.fly.dev/get-all-news-preview?page=
      ${initialPage}&size=10`);
  const json = await response.data;
  howManyPages.value = json.pages;
  news.value = json.data;
}

getNews();

</script>

<template>
  <div class="container">
    <header>
      <Navbar />
    </header>
    <main class="container__main">
      <section class="container__main__news">
        <header class="container__main__news__title">
          Notícias
        </header>
        <div class="container__main__news__filter">
          <v-icon
            name="io-filter"
            fill="#4ECB71"
          />
          <input
            type="search"
            placeholder="Filtrar"
          >
        </div>
      </section>
    </main>
    <aside />
    <footer>
      <Logo />
    </footer>
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";

.container {
  background-color: $bg-color;
  height: 100vh;

  @media (max-width: 600px) {
    &__main {
        padding-top: 2rem;
        display: flex;
        justify-content: start;

      &__news {
        background-color: $bg-color;
        display: flex;
        justify-content: center;
        flex-direction: column;
        color: $text-color-white;
        font-weight: bold;
        border-radius: $border-radius;
        font-size: 1.3rem;
        &__filter {
          display: flex;
          align-items: center;
          background-color: $filter-bg-color;
          border-radius: $border-radius;
          padding-left: 1rem;
          box-shadow: $box-shadow;
        }
      }
    }

    }
    @media (min-width: 601px) {
    &__main {
      padding: 3rem;
      &__news {
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding: 2rem;
      background-color: $section-color;
      color: $text-color-white;
      font-weight: bold;
      border-radius: $border-radius;
      &__title {
        padding-top: 1rem;
      }

      &__filter {
        display: flex;
        align-items: center;
        background-color: $filter-bg-color;
        border-radius: $border-radius;
        padding-left: 1rem;
        box-shadow: $box-shadow;
      }
      }

    }
  }
}

input {
  background-color: $filter-bg-color;
  padding-left: 0.5rem;
  border-style: none;
  height: 34px;
  flex-grow: 1;
}

::placeholder {
    color: $filter-text-color;
    opacity: 1;
    font-weight: 600;
}

</style>
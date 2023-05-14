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
const page :number = 1;
//const currentPage = ref(page);

async function getNews() {
  const response =
    await axios
      .get(`http://localhost:8080/get-all-news-preview?page=${page}&size=5`);
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
            style="color: white"
          >
        </div>
        <div v-if="news.length !== 0">
          <li
            v-for="{imgURL, publishDate, title } in news"
            :key="title"
            class="container__main__news__list"
          >
            <button class="container__main__news__list__button">
              <img
                :src="imgURL"
                alt="Imagem da notícia"
                class="container__main__news__list__button__image"
              >
              <div class="container__main__news__list__button__info">
                <p class="container__main__news__list__button__info__title">
                  {{ title }}
                </p>
                <p class="container__main__news__list__button__info__date">
                  {{ new Date(publishDate).toLocaleDateString("pt-BR") }}
                </p>
              </div>
            </button>
          </li>
          <button class="container__main__news__more">
            <h4>VER MAIS</h4>
          </button>
        </div>
        <div
          v-else
          class="container__main__news__empty"
        >
          <h5> Ainda não há notícias...</h5>
        </div>
      </section>
      <div class="container__main__fixed">
        <aside class="container__main__fixed__aside">
          <h5>Recomendados</h5>
          <section class="container__main__fixed__aside__section">
            <li
              v-for="{imgURL, title } in news"
              :key="title"
            >
              <button class="container__main__fixed__aside__section__button">
                <img
                  :src="imgURL"
                  alt="Imagem da notícia"
                  class="container__main__fixed__aside__section__button__image"
                >
                <div
                  class="container__main__fixed__aside__section__button__info"
                >
                  <p>
                    {{ title }}
                  </p>
                </div>
              </button>
            </li>
          </section>
        </aside>
      </div>
    </main>
    <footer>
      <Logo />
    </footer>
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";

.container {
  background-color: $bg-color;
  height: auto;
  min-height: 100vh;

    &__main {
        padding: 2rem;
        display: flex;
        justify-content: start;
        align-items: start;
        height: auto;
        overflow: hidden;

        &__news {
        background-color: $bg-color;
        display: flex;
        justify-content: center;
        flex-direction: column;
        color: $text-color-white;
        font-weight: bold;
        border-radius: $border-radius;
        font-size: 1.3rem;
        flex-grow: 1;
        list-style: none;

        &__filter {
          display: flex;
          align-items: center;
          background-color: $filter-bg-color;
          border-radius: $border-radius;
          padding-left: 1rem;
          box-shadow: $filter-box-shadow;
          margin: 1.5rem 0;
        }
        &__more {
          width: 100%;
          height: 2rem;
          border-radius: $border-radius;
          text-align: center;
          flex-grow: 1;
          background-color: $financi-green;
          color: $text-color-white;
          margin-top: 1rem;
        }
        &__list {
          padding: 0.5rem 0;

          &__button {
            display: flex;
            width: 100%;
            height: 5rem;
            align-items: center;
            border-radius: $border-radius;
            box-shadow: $filter-box-shadow;
            background-color: $section-color;
            color: $text-color-white;
            &__image {
              width: 5rem;
              padding: 0.7rem;
              border-radius: 20px;
              object-fit: contain;
            }

            &__info {
              flex-grow: 1;
              display: flex;
              padding-right: 1.5rem;
              justify-content: space-between;
              align-items: center;
              font-weight: 500;
              text-align: left;

              &__date {
                font-size: 0.8rem;
              }

              &__title {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                font-size: 1rem;
                max-height: 4rem;
                max-width: 70%;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
        }
        &__empty {
          align-items: center;
        }
      }
  }

@media (max-width: 900px)  {
  footer, aside {
  display: none;
  }
}

  @media (min-width: 901px) {
  &__main {
    padding: 3rem;
    &__news {
        background-color: $section-color;
        padding: 2rem;
        flex-grow: 0;
        width: 65%;
        &__list {
            border-bottom: $border-color;
          &__button {
            box-shadow: none;
            height: 7rem;
            &__info__title {
              padding-left: 1rem
            }
            &__image {
              padding: 0;
              border-radius: 10px;
              max-height: 5rem;
            }
          }
        }
      }
      &__fixed {
        &__aside {
          position: fixed;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: $section-color;
          margin-left: 2rem;
          color: $text-color-white;
          padding: 2rem 1.5rem 1.5rem 1.5rem;
          border-radius: $border-radius;
          list-style: none;
          max-width: 30%;
          &__section {
            padding-top: 1rem;
            &__button {
              display: flex;
              background-color: transparent;
              border-top: $border-color;
              color: $text-color-white;
              &__image {
                width: 5rem;
                padding: 0.7rem;
                border-radius: 20px;
                object-fit: contain;
              }
              &__info{
                align-self: center;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
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

button {
  border: none;
  cursor: pointer;
}

</style>
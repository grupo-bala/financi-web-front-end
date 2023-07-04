<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import Logo from "../components/LogoFinanci.vue";
import router from "../router/index";
import SuspenseBox from "../components/Suspense/SuspenseBox.vue";
import SuspenseImage from "../components/Suspense/SuspenseImage.vue";
import InputField from "../components/Inputs/InputField.vue";

interface NewsPreview {
  title: string;
  publishDate: string;
  imgURL: string;
  id: number;
}
const searchValue = ref("");
const baseURL = import.meta.env.VITE_API_URL;
const news = ref<NewsPreview[]>([]);
const allNews = ref<NewsPreview[]>([]);
const recommended = ref<NewsPreview[]>([]);
const howManyPages = ref<number>();
const page = 1;
const currentPage = ref(page);
const isLoadingAll = ref(true);
const isLoadingRecommended = ref(true);

function seeMore() {
  currentPage.value++;
  getNews();
}

async function getNews() {
  isLoadingAll.value = true;
  const response =
    await axios
      .get(`${baseURL}/get-all-news-preview?page=${currentPage.value}&
      size=10&
      search=${searchValue.value ?? ""}
      `.replaceAll(/^\s+|\n/gm, ""));

  const json = response.data;
  howManyPages.value = json.pages;
  news.value = json.data;
  allNews.value.push(...news.value);
  isLoadingAll.value = false;
}

async function getRecommend() {
  const response =
    await axios.get(`${baseURL}/get-recommended-news-preview`);
  const json = response.data;
  recommended.value = json.data;
  isLoadingRecommended.value = false;
}

getRecommend();
getNews();

</script>

<template>
  <div class="content">
    <main class="content__main">
      <section class="content__main__news">
        <div class="content__main__news__header">
          <h2>Notícias</h2>
          <form class="content__main__news__header__form">
            <InputField
              :model-value="searchValue"
              type="Text"
              label=""
              placeholder="Pesquisar"
              :required="false"
              :numeric="false"
            />
          </form>
        </div>
        <div>
          <li
            v-for="{id, imgURL, publishDate, title } in allNews"
            :key="title"
            class="content__main__news__list"
          >
            <button
              aria-label="ler noticia"
              class="content__main__news__list__button"
              @click="router.push(`/news/${id}`)"
            >
              <SuspenseImage
                :src="imgURL"
                width="5rem"
                height="5rem"
                img-class="content__main__news__list__button__image"
              />
              <div class="content__main__news__list__button__info">
                <p class="content__main__news__list__button__info__title">
                  {{ title }}
                </p>
                <p class="content__main__news__list__button__info__date">
                  {{ new Date(publishDate).toLocaleDateString("pt-BR") }}
                </p>
              </div>
            </button>
          </li>
        </div>
        <SuspenseBox
          :is-loading="isLoadingAll"
          loading-width="100%"
          loading-height="112px"
          :style="{ margin: '1rem 0' }"
        />
        <button
          aria-label="ver mais notícias"
          class="content__main__news__more"
          :disabled="howManyPages === currentPage"
          @click="seeMore"
        >
          <h4>VER MAIS</h4>
        </button>
      </section>
      <aside class="content__main__aside">
        <h4>Recomendados</h4>
        <SuspenseBox
          :is-loading="isLoadingRecommended"
          loading-height="80px"
          loading-width="100%"
        >
          <section class="content__main__aside__section">
            <li
              v-for="{ id, imgURL, title } in recommended"
              :key="title"
              class="content__main__aside__section__list"
            >
              <button
                aria-label="ler notícia"
                class="content__main__aside__section__list__button"
                @click="router.push(`/news/${id}`)"
              >
                <SuspenseImage
                  :src="imgURL"
                  width="4rem"
                  height="4rem"
                  img-class="
                    content__main__aside__section__list__button__image
                  "
                />
                <div
                  class="content__main__aside__section__list__button__info"
                >
                  <p>
                    {{ title }}
                  </p>
                </div>
              </button>
            </li>
          </section>
        </SuspenseBox>
      </aside>
    </main>
    <footer>
      <Logo />
    </footer>
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";
.content {
  background-color: $bg-color;
  height: auto;
  min-height: 100dvh;

    &__main {
      padding: 2rem 2rem 0 2rem;
      display: flex;
      justify-content: center;
      align-items: start;
      height: auto;
      position: relative;

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
          &__header {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 1rem;
          }

          &__more {
            width: 100%;
            height: 2rem;
            border-radius: $border-radius;
            text-align: center;
            background-color: $financi-green;
            color: $text-color-black;
            margin-top: 1rem;
            letter-spacing: 0.08rem;
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

            :deep &__image {
              width: 5rem;
              height: 5rem;
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

  h4 {
    text-align: center;
  }

@media (max-width: 900px)  {
  aside {
    display: none;
  }
}

  @media (min-width: 900px) {
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
            :deep &__image {
              padding: 0;
              border-radius: 10px;
              max-height: 5rem;
              max-width: 5rem;
            }
          }
        }
      }
      &__aside {
        display: flow-root;
        background-color: $section-color;
        margin-left: 2rem;
        color: $text-color-white;
        padding: 2rem 1.5rem 1.5rem 1.5rem;
        border-radius: $border-radius;
        list-style: none;
        position: sticky;
        top: 2rem;
        flex-grow: 1;

        h4 {
          margin-bottom: 1rem;
        }

        &__section {
          display: flex;
          flex-direction: column;
          &__list{
            border-top: $border-color;
            &__button {
              display: flex;
              background-color: transparent;
              color: $text-color-white;
              font-size: 0.9rem;
              :deep &__image {
                width: 4rem;
                height: 4rem;
                margin: 0.5rem;
                border-radius: $border-radius;
                object-fit: contain;
              }
              &__info{
                align-self: center;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: left;
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
:disabled {
  visibility: hidden;
}

</style>
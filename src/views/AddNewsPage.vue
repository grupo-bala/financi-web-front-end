<script setup lang="ts">
import { useFeedbackStore } from "../stores/feedbackStore";
import axios from "axios";
import { ref, computed } from "vue";
import router from "../router";
import Input from "../components/Inputs/InputField.vue";
import Button from "../components/ButtonComponent.vue";

const feedbackModal = useFeedbackStore();
const baseURL = import.meta.env.VITE_API_URL as string;

const author = ref("");
const title = ref("");
const summary = ref("");
const publishDate = ref("");
const imgURL = ref("");
const recommended = ref(false);

const isAuthorCorrect = ref(false);
const isTitleCorrect = ref(false);
const isSummaryCorrect = ref(false);
const isPublishDateCorrect = ref(false);
const isImgURLCorrect = ref(false);

const selected = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const fileName = computed(() => {
  return fileInput.value!.files![0].name;
});

function handleFileSelection(){
  selected.value = !selected.value;
}

async function addNews() {
  try{
    const file = fileInput.value!.files![0];
    await axios.post(`${baseURL}/add-news`, {
      author: author.value,
      title: title.value,
      summary: summary.value,
      content: await file.text(),
      publishDate: publishDate.value,
      imgURL: imgURL.value,
      recommended: recommended.value,
    });
    feedbackModal.notify("A notícia foi adicionada");
  } catch (e){
    router.push("/ops");
  }
}
</script>

<template>
  <div class="addNews">
    <main class="addNews__main">
      <h2>Adicionar notícia</h2>
      <form class="addNews__main__form">
        <Input
          v-model="title"
          type="Text"
          placeholder="Digite o título"
          label="Título"
          required
          :numeric="false"
          @is-correct="(correct: boolean) => isTitleCorrect = correct"
        />
        <Input
          v-model="author"
          type="Text"
          placeholder="Digite o autor"
          required
          label="Autor"
          :numeric="false"
          @is-correct="(correct: boolean) => isAuthorCorrect = correct"
        />
        <Input
          v-model="summary"
          type="Text"
          label="Sumário"
          placeholder="Digite o sumário"
          required
          :numeric="false"
          @is-correct="(correct: boolean) => isSummaryCorrect = correct"
        />
        <Input
          v-model="imgURL"
          placeholder="Digite a URL da imagem"
          type="Text"
          required
          :numeric="false"
          label="Imagem"
          @is-correct="(correct: boolean) => isImgURLCorrect = correct"
        />
        <Input
          v-model="publishDate"
          placeholder="dd/mm/aaaa"
          type="Date"
          required
          :numeric="false"
          label="Data"
          @is-correct="(correct: boolean) => isPublishDateCorrect = correct"
        />
        <div class="addNews__main__form__checkbox">
          <input
            v-model="recommended"
            type="checkbox"
            required
          >
          <h5>
            Recomendado
          </h5>
        </div>
        <label
          class="addNews__main__label"
          for="fileInput"
        >
          <v-icon
            name="bi-cloud-arrow-up-fill"
            fill="#90A4AE"
            scale="5"
          />
          <input
            id="fileInput"
            ref="fileInput"
            class="addNews__main__label__input"
            type="file"
            accept=".txt"
            @change="handleFileSelection"
          >
          <div v-if="selected">
            O arquivo {{ fileName }} foi selecionado.
          </div>
          <div v-else>
            Arraste o arquivo aqui...
          </div>
        </label>
        <Button
          id="addButton"
          class="addNews__main__button"
          text="ADICIONAR"
          color="green"
          :disabled="author.length === 0 || title.length === 0
            || summary.length === 0 || imgURL.length === 0
            || publishDate.length === 0 || !selected"
          @click.prevent="addNews"
        />
      </form>
    </main>
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";

.addNews {
    display: flex;
    background-color: $bg-color;
    min-height: 100vh;
    width: 100%;
    align-items: center;
    &__main {
        padding: 2rem;
        display: flex;
        width: 100%;
        margin: 1rem;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        color: $text-color-white;
        background-color: $section-color;
        &__form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding-top: 2rem;

          input {
            background-color: transparent;
            color: white;
            border: 1px solid gray;
            padding: 1rem;
            border-radius: $border-radius;
          }
          &__checkbox{
            display: flex;
            gap: 0.7rem;
          }
        }
        &__label {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            &__input {
              display: none;
            }
        }
        &__button {
            margin-top: 1rem;
            width: 100%;
            background-color: $financi-green;
            border-style: none;
            color: #25572D;
            font-weight: bold;
            border-radius: $border-radius;
            padding: 0.7rem 1rem;
            cursor: pointer;
        }
    }
}

input[type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: auto;
  height: auto;
  cursor: pointer;
}
@media (min-width: 900px) {
  .addNews {
    display: flex;
    justify-content: center;
    &__main {
      max-width: 700px;
      padding: 2.5rem;
      align-items: normal;
      &__label {
        background-color: #313431;
        padding: 3rem;
        border-radius: $border-radius;
        margin-top: 1rem;
      }
      h2 {
        align-items: start;
      }
    }
  }
}

</style>
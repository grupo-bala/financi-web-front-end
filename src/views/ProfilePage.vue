<script setup lang="ts">
import { Profile } from "../types/Profile";
import InputField from "../components/Inputs/InputField.vue";
import ProfilePhotoUser from "../components/ProfileComponent.vue";
import Button from "../components/ButtonComponent.vue";
import { ref } from "vue";
import axios from "axios";
import router from "../router";
import { useFeedbackStore } from "../stores/feedbackStore";

const envUrl = import.meta.env.VITE_API_URL;
const isNameCorrect = ref(false);
const isEmailCorrect = ref(false);
const info = ref<Profile>({
  name: "",
  username: "",
  fixedIncome: "0",
  email: "",
});
const feedbackModal = useFeedbackStore();

async function getMe() {
  try {
    const response = await axios.get(`${envUrl}/get-me`);
    const json = response.data;
    info.value = json.data;
    info.value.fixedIncome = Number(info.value.fixedIncome)
      .toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
  } catch (error) {
    router.push("/login");
  }
}

async function updateProfile() {
  await axios.put(`${envUrl}/update-user`, {
    ...info.value,
    fixedIncome: info.value.fixedIncome.replace(".", "").split(",").join("."),
  });

  feedbackModal.notify("Suas informações foram atualizadas com sucesso");
}

async function logOut() {
  await axios.post(`${envUrl}/logout`);
  router.push("/login");
}

getMe();

</script>

<template>
  <div class="main_container">
    <div class="main_container__content_box">
      <ProfilePhotoUser
        :username="info!.username"
        class="container__content__greetings"
      />
      <InputField
        v-model="info!.name"
        :numeric="false"
        required
        label="Nome"
        type="Text"
        placeholder="Digite seu nome de usuário"
        @is-correct="(correct: boolean) => isNameCorrect = correct"
      />
      <InputField
        v-model="info!.email"
        :numeric="false"
        required
        label="E-mail"
        type="Email"
        placeholder="Digite seu e-mail"
        @is-correct="(correct: boolean) => isEmailCorrect = correct"
      />
      <InputField
        v-model="info.fixedIncome"
        numeric
        required
        label="Renda"
        type="Text"
        placeholder="Digite sua renda mensal"
      />
      <div class="main_container__content_box__update">
        <Button
          class="main_container__content_box__update__button"
          color="green"
          text="EDITAR PERFIL"
          :disabled="info!.name.length === 0 || info!.email.length === 0"
          @click="updateProfile"
        />
      </div>
      <button
        class="main_container__content_box__logout"
        @click="logOut"
      >
        FAZER LOGOUT
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";
.main_container {
  display: flex;
  min-height: 100dvh;
  flex-direction: column;
  align-items: center;
  background-color: $bg-color;
  padding: 5rem 2rem;

  &__content_box {
    display: flex;
    border-radius: $border-radius;
    align-items: center;
    flex-direction: column;
    gap: 1.5rem;

    &__logout {
      background-color: transparent;
      text-decoration: underline;
      border-color: transparent;
      color: $financi-red;
      cursor: pointer;
    }
  }
}

@media screen and (min-width: 800px) {
  .main_container {
    &__content_box {
      background-color: $card-bg-color;
      border-radius: $border-radius;
      box-shadow: $box-shadow;
      padding: 3rem;
      width: 70vw;
      max-width: 1200px;
    }
  }
}
</style>
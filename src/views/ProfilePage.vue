<script setup lang="ts">
import { Profile } from "../types/Profile";
import InputField from "../components/Inputs/InputField.vue";
import ProfilePhotoUser from "../components/ProfileComponent.vue";
import FinanciLogo from "../components/LogoFinanci.vue";
import Button from "../components/ButtonComponent.vue";
import { ref } from "vue";
import axios from "axios";
import router from "../router";

const envUrl = import.meta.env.VITE_API_URL;
const isNameCorrect = ref(false);
const isEmailCorrect = ref(false);
const info = ref<Profile>({
  name: "",
  username: "",
  fixedIncome: "0",
  email: "",
});

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

getMe();

async function updateProfile() {
  await axios.put(`${envUrl}/update-user`, {
    ...info.value,
    fixedIncome: info.value.fixedIncome.replace(".", "").split(",").join("."),
  });
}

async function logOut() {
  await axios.post(`${envUrl}/logout`);
  router.push("/login");
}

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
    <FinanciLogo class="main_container__logo-financi" />
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";
.main_container {
    margin: 0px;
    display: flex;
    height: calc(100vh - 4rem);
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-color: $bg-color;

    &__content_box {
        margin-top: 20px;
        height: 750px;
        display: flex;
        border-radius: 15px;
        align-items: center;
        flex-direction: column;
        justify-content: space-evenly;

        &__logout {
          background-color: transparent;
          text-decoration: underline;
          border-color: transparent;
          color: $financi-red;
          cursor: pointer;
        }

        @media (min-width: 400px) {
          width: 400px;
          background-color: $bg-color
        }

        @media (min-width: 1000px) {
          width: 1000px;
          background-color: $card-bg-color;
        }

    }

    &__logo-financi {
      padding: 0px;
      margin-bottom: 20px;
    }
}
</style>
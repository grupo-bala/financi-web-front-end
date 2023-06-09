<script setup lang="ts">
import { ref } from "vue";
import { useProfileStore } from "../stores/userStore";
import axios, { AxiosError } from "axios";
import Input from "../components/Inputs/InputField.vue";
import Button from "../components/ButtonComponent.vue";
import router from "../router";

const username = ref("");
const password = ref("");
const feedback = ref("");
const isPasswordCorrect = ref(false);
const isUsernameCorrect = ref(false);
const envUrl = import.meta.env.VITE_API_URL!;

type Response = {msg: string};

async function login() {
  try {
    await axios.post(
      `${envUrl}/login`, {
        username: username.value,
        password: password.value,
      },
    );
    const user = useProfileStore();
    user.isLogged = true;
    feedback.value = "";
    router.push({ name:"Dashboard" });
  } catch (error) {
    const axiosError = error as AxiosError;
    const response = axiosError.response?.data as Response;
    feedback.value = response.msg;
  }
}
</script>

<template>
  <div class="main_container">
    <div class="main_container__logo">
      <img
        class="main_container__logo__icon"
        src="../assets/Exchange.png"
        alt="Logo Symbol"
      >
      <h1 class="main_container__logo__title">
        Financi
      </h1>
    </div>
    <form class="main_container__inputs">
      <Input
        v-model="username"
        :numeric="false"
        :required="false"
        label="Username"
        type="Text"
        placeholder="Digite seu nome de usuário"
        @is-correct="(correct: boolean) => isUsernameCorrect = correct"
      />
      <Input
        v-model="password"
        :numeric="false"
        :required="false"
        label="Senha"
        type="Password"
        placeholder="Digite sua senha"
        @is-correct="(correct: boolean) => isPasswordCorrect = correct"
      />
      <p
        v-if="feedback.length > 0"
        class="main_container__inputs__error"
      >
        {{ feedback }}
      </p>
      <p
        v-else
        class="main_container__inputs__error--placeholder"
      >
        #
      </p>
      <Button
        id="fazer login"
        color="green"
        text="ENTRAR"
        :disabled="password.length === 0 || username.length === 0"
        @click.prevent="login"
      />
      <p
        class="main_container__inputs__text"
      >
        Não possui uma conta?
        <router-link
          class="main_container__inputs__link"
          to="/register"
        >
          Cadastre-se aqui.
        </router-link>
      </p>
    </form>
  </div>
</template>

<style scoped lang="scss">
    @import "../variables.scss";
    .main_container {
        display:flex;
        align-items: center;
        justify-content: space-evenly;
        flex-direction: column;
        margin: 0;
        min-height: 100svh;
        background-color: $bg-color;

        &__logo {
            display:flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            margin: 0;

            &__title {
                font-size: 48px;
                color:  $text-color-white;
            }
        }

        &__inputs {
            display: flex;
            flex-direction: column;
            gap: 15px;

            &__error {
                margin-top: 20px;
                color: $financi-red;
                font-weight: 500;
                text-align: left;
                margin-bottom: 10px;

                &--placeholder {
                    margin-top: 20px;
                    visibility: hidden;
                    margin-bottom: 10px;
                }
            }

            &__text {
                color: $text-color-white;
            }

            &__link {
                color: $financi-green;
                text-decoration: none;
            }
        }
    }

</style>
<script setup lang="ts">
import { computed, ref } from "vue";
import Button from "../components/ButtonComponent.vue";
import Input from "../components/Inputs/InputField.vue";
import axios, { AxiosError } from "axios";
import router from "../router";

const isFirstStep = ref(true);
const username = ref("");
const name = ref("");
const email = ref("");
const password = ref("");
const fixedIncome = ref("");
const formatedFixedIncome = computed(() => {
  return Number(fixedIncome.value.split(".").join("").replace(",", "."));
});
const isPasswordCorrect = ref(false);
const isEmailCorrect = ref(false);
const feedback = ref("");
const envUrl = import.meta.env.VITE_API_URL;
type Response = {
  msg: string
};

async function postRegisterUser() {
  try {
    await axios.post(`${envUrl}/register`, {
      name: name.value,
      email: email.value,
      password: password.value,
      username: username.value,
      fixedIncome: formatedFixedIncome,
    });

    router.push({ name:"Login" });
  } catch (error) {
    const axiosError = error as AxiosError;
    const response = axiosError.response?.data as Response;
    feedback.value = response.msg;
  }

}
</script>

<template>
  <main
    v-if="isFirstStep"
    class="main_content"
  >
    <div class="main_content__container">
      <h1 class="main_content__container__title">
        Crie sua conta
      </h1>
      <form class="main_content__container__inputs">
        <Input
          v-model="name"
          :numeric="false"
          :required="true"
          label="Nome"
          type="Text"
          placeholder="Digite seu nome"
        />
        <Input
          v-model="email"
          :numeric="false"
          required
          label="Email"
          type="Email"
          placeholder="Digite seu e-mail"
          @is-correct="(correct: boolean) => isEmailCorrect = correct"
        />
        <Input
          v-model="password"
          :numeric="false"
          required
          label="Senha"
          type="Password"
          placeholder="Digite sua senha"
          @is-correct="(correct: boolean) => isPasswordCorrect = correct"
        />
        <p
          v-if="name.length === 0"
          class="main_content__container__inputs__error"
        >
          Nome não preenchido
        </p>
        <p
          v-else-if="email.length === 0"
          class="main_content__container__inputs__error"
        >
          E-mail não preenchido
        </p>
        <p
          v-else-if="!isEmailCorrect"
          class="main_content__container__inputs__error"
        >
          E-mail no formato errado
        </p>
        <p
          v-else-if="password.length === 0"
          class="main_content__container__inputs__error"
        >
          Senha não preenchida
        </p>
        <p
          v-else-if="!isPasswordCorrect"
          class="main_content__container__inputs__error"
        >
          Senha fraca
        </p>
        <p
          v-else
          class="main_content__container__inputs__error--placeholder"
        >
          #
        </p>
      </form>
      <Button
        id="avançar para próxima etapa"
        color="green"
        text="AVANÇAR"
        :disabled="name.length === 0 || !isPasswordCorrect || !isEmailCorrect"
        @click="isFirstStep = !isFirstStep"
      />
    </div>
  </main>
  <main
    v-else
    class="main_content"
  >
    <div>
      <div class="main_content__container">
        <h1
          class="main_content__container__title"
        >
          Só mais algumas informações...
        </h1>
        <form class="main_content__container__inputs">
          <Input
            v-model="username"
            :numeric="false"
            required
            label="Nome de usuário"
            type="Text"
            placeholder="Digite seu nome de usuário"
          />
          <Input
            v-model="fixedIncome"
            numeric
            required
            label="Renda mensal"
            type="Text"
            placeholder="Digite sua renda mensal"
          />
          <p
            v-if="username.length === 0"
            class="main_content__container__inputs__error"
          >
            Nome de usuário não preenchido
          </p>
          <p
            v-else-if="fixedIncome.length === 0"
            class="main_content__container__inputs__error"
          >
            Renda mensal não preenchida
          </p>
          <p
            v-else-if="formatedFixedIncome <= 0"
            class="main_content__container__inputs__error"
          >
            Renda deve ser maior que zero
          </p>
          <p
            v-else-if="feedback.length > 0"
            class="main_content__container__inputs__error"
          >
            {{ feedback }}
          </p>
          <p
            v-else
            class="main_content__container__inputs__error--placeholder"
          >
            #
          </p>
        </form>
        <Button
          id="realizar cadastro"
          color="green"
          text="CADASTRAR"
          :disabled="username.length === 0 || fixedIncome.length === 0"
          @click="postRegisterUser"
        />
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
  @import "../variables.scss";
  .main_content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 100svh;
    background-color: $bg-color;
    padding: 50px;

    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      max-width: 460px;
      max-height: 500px;
      gap: 2rem;

      &__title {
        color: $text-color-white;
        text-align: left;
        width: 100%;
      }

      &__inputs {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        &__error {
          color: $financi-red;
          font-weight: 500;
          text-align: left;
          margin-bottom: 10px;

          &--placeholder {
            visibility: hidden;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
</style>
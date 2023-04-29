<script setup lang="ts">
  import { ref } from 'vue';
  import Button from '../components/Button.vue';
  import Input from '../components/Input.vue';
  const isFirstStep = ref(true);
  const username = ref("");
  const email = ref("");
  const password = ref("");
  const isPasswordCorrect = ref(false);
  const isEmailCorrect = ref(false);
</script>

<template>
  <main v-if="isFirstStep" class="main_content">
    <div class="main_content__container">
      <h1 class="main_content__container__title">Crie sua conta</h1>
      <div class="main_content__container__inputs">
        <Input label="Nome" type="Text" placeholder="Digite seu nome" v-model="username"/>
        <Input label="Email" type="Email" placeholder="Digite sua e-mail" v-model="email" @isCorrect="(correct) => isEmailCorrect = correct"/>
        <Input label="Senha" type="Password" placeholder="Digite sua senha" v-model="password" @isCorrect="(correct) => isPasswordCorrect = correct"/>
        <p class="main_content__container__inputs__error" v-if="username.length === 0">Nome não preenchido</p>
        <p class="main_content__container__inputs__error" v-else-if="email.length === 0">E-mail não preenchido</p>
        <p class="main_content__container__inputs__error" v-else-if="!isEmailCorrect">E-mail no formato errado</p>
        <p class="main_content__container__inputs__error" v-else-if="password.length === 0">Senha não preenchida</p>
        <p class="main_content__container__inputs__error" v-else-if="!isPasswordCorrect">Senha fraca</p>
        <p class="main_content__container__inputs__error--placeholder" v-else>#</p>
      </div>
      <Button text="AVANÇAR" :disabled="username.length === 0 || !isPasswordCorrect || !isEmailCorrect" @click="isFirstStep = !isFirstStep"/>
    </div>
  </main>
  <main v-else class="main_content">  
    <div>
      <p>{{ email + username + password }}</p>
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

    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 50px;
      
      &__title {
        color: $text-color-white;
        text-align: left;
        width: 100%;
      }
      
      &__inputs {
        display: flex;
        flex-direction: column;
        gap: 25px;
        margin: 2rem 0 3rem 0;
        
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

  p {
    color: $text-color-white;
  }
</style>
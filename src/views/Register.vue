<script setup lang="ts">
  import { ref } from 'vue';
  import EmailBox from '../components/EmailBox.vue';
  import PasswordBox from '../components/PasswordBox.vue';
  import EntrarButton from '../components/EntrarButton.vue';
  import Input from '../components/Input.vue';
  const aa = ref(true);
  const username = ref("");
  const eMail = ref("");
  const password = ref("");
</script>

<template>
  <main v-if="aa" class="main_content">
    <div class="main_content__container">
      <h1 class="main_content__container__title">Crie sua conta</h1>
      <div class="main_content__container__inputs">
        <Input type="text" placeholder="Digite seu nome" v-model="username"/>
        <Input type="email" placeholder="Digite sua email" v-model="eMail"/>
        <Input type="password" placeholder="Digite sua senha" v-model="password"/>
      </div>
      <EntrarButton @click="aa = !aa"/>
    </div>
  </main>
  <main v-else class="main_content">  
    <div>
      <p>{{ eMail + username + password }}</p>
    </div>
  </main>
</template>

<style scoped lang="scss">
  @media screen and (max-width: 800px) {
    .main_content {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: 100vh;
      background-color: #222622;

      &__container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &__title {
          color: white;
          text-align: left;
          width: 100%;
        }
        
        &__inputs {
          display: flex;
          flex-direction: column;
          gap: 25px;
          margin: 2rem 0 3rem 0;
        }
      }
    }

    p {
      color:white;
    }
  }
</style>
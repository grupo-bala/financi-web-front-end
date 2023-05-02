<script setup lang="ts">

import { ref } from 'vue';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import Input from '../components/Input.vue';
import Button from "../components/Button.vue";
import CheckboxLogin from '../components/CheckboxLogin.vue';
import router from '../router';

const username = ref("");
const password = ref("");
const feedback = ref("");
const isPasswordCorrect = ref(false);
const isUsernameCorrect = ref(false);
type Response = {msg: string};

async function login() {

    try {
        const response = await axios.get(`https://financi.fly.dev/login?username=${username.value}&password=${password.value}`);
        feedback.value = "";
        router.push({name:"Home"});
    } catch (error) {
        const axiosError = error as AxiosError;
        feedback.value = (axiosError.response?.data as Response).msg;
    }
}
</script>

<template>
    <div class="main_container">
        <div class="main_container__logo">
            <img class="main_container__logo__icon" src="../assets/Exchange.png" alt="Logo Symbol">
            <h1 class="main_container__logo__title">Financi</h1>
        </div>

        <form class="main_container__inputs">
            <Input :numeric="false" :required="false" label="Email" type="Email" placeholder="Digite seu nome de usuário" v-model="username" @isCorrect="(correct) => isUsernameCorrect = correct"/>
            <Input :numeric="false" :required="false" label="Senha" type="Password" placeholder="Digite sua senha" v-model="password" @isCorrect="(correct) => isPasswordCorrect = correct"/>
            <CheckboxLogin text="Mantenha-me conectado"></CheckboxLogin>
            <p class="main_container__inputs__error" v-if="feedback.length > 0">{{ feedback }}</p>
            <p class="main_container__inputs__error--placeholder" v-else>#</p>
        </form>

        <div class="main_container__enter">
            <Button text="ENTRAR" :disabled= "password.length === 0 || username.length === 0" @click = "login" />
            <p class="main_container__enter__text">Não possui uma conta? <router-link class="main_container__enter__link" to="/register">Cadastre-se aqui.</router-link></p>
        </div>
    </div>
</template>


<style scoped lang="scss">
    @import "../variables.scss";
    .main_container {
        display:flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin: 0;
        min-height: 100svh;
        gap: 100px;
        background-color: $bg-color;

        &__logo {
            display:flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

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
        }

        &__enter {
            display:flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 25px;

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
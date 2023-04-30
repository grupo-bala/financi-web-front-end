<script setup lang="ts">

import { ref } from 'vue';
import Input from '../components/Input.vue';
import Button from "../components/Button.vue";
import CheckboxLogin from '../components/CheckboxLogin.vue';

const email = ref("");
const password = ref("");
const isPasswordCorrect = ref(false);
const isEmailCorrect = ref(false);
</script>

<template>
    <div class="main_container">
        <div class="main_container__logo">
            <img class="main_container__logo__icon" src="../assets/Exchange.png" alt="Logo Symbol">
            <h1 class="main_container__logo__title">Financi</h1>
        </div>

        <form class="main_container__inputs">
            <Input label="Email" type="Email" placeholder="Digite sua e-mail" v-model="email" @isCorrect="(correct) => isEmailCorrect = correct"/>
            <Input label="Senha" type="Password" placeholder="Digite sua senha" v-model="password" @isCorrect="(correct) => isPasswordCorrect = correct"/>
            <div class="main_container__inputs__texts">
                <CheckboxLogin text="Mantenha-me conectado"></CheckboxLogin>
                <p class="main_container__inputs__texts__error" v-if="email.length === 0">E-mail não preenchido</p>
                <p class="main_container__inputs__texts__error" v-else-if="!isEmailCorrect">E-mail no formato errado</p>
                <p class="main_container__inputs__texts__error" v-else-if="password.length === 0">Senha não preenchida</p>
                <p class="main_container__inputs__texts__error--placeholder" v-else>#</p>
            </div>    
        </form>

        <div class="main_container__enter">
            <Button text="ENTRAR" :disabled= "!isPasswordCorrect || !isEmailCorrect"/>
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

            &__texts {
                
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
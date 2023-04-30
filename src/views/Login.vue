<script setup lang="ts">

import { ref } from 'vue';
import Input from '../components/Input.vue';
import Button from "../components/Button.vue";

const email = ref("");
const password = ref("");
const isPasswordCorrect = ref(false);
const isEmailCorrect = ref(false);
</script>

<template>
    <div class="main_content">
        <header class="main_content__container__header">
            <img src="../assets/Exchange.png" alt="Logo Symbol">
            <h1 class="main_content__container__header__title">Financi</h1>
        </header>

        <form class="main_content__container__inputs">
            <Input label="Email" type="Email" placeholder="Digite sua e-mail" v-model="email" @isCorrect="(correct) => isEmailCorrect = correct"/>
            <Input label="Senha" type="Password" placeholder="Digite sua senha" v-model="password" @isCorrect="(correct) => isPasswordCorrect = correct"/>
            <div class="main_content__container__inputs__keep_loged">
                <input type="checkbox" id="login__check__box" name="login_check" checked>
                <label for="login__check__box" style="color: white">Mantenha-me conectado</label>
                <p class="main_content__container__inputs__keep_loged__error" v-if="email.length === 0">E-mail não preenchido</p>
                <p class="main_content__container__inputs__keep_loged__error" v-else-if="!isEmailCorrect">E-mail no formato errado</p>
                <p class="main_content__container__inputs__keep_loged__error" v-else-if="password.length === 0">Senha não preenchida</p>
            </div>    
        </form>

        <footer class="main_content__container__footer">
            <Button text="ENTRAR" :disabled= "!isPasswordCorrect || !isEmailCorrect"/>
            <p>Não possui uma conta? <a href = "Register">Cadastre-se aqui.</a></p>
        </footer>
    </div>
</template>


<style scoped lang="scss">
    @import "../variables.scss";
    .main_content {
        display:flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin: 0;
        height: 100vh;
        gap: 100px;
        background-color: $bg-color;

        &__container__header {
            display:flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            &__title {
                font-size: 48px;
                color:  $text-color-white;  
            }
        }

        &__container__inputs {
            display: flex;
            flex-direction: column;
            gap: 15px;

            &__keep_loged {

                #login__check__box {
                    width: 1.2em;
                    height: 1.2em;
                    background-color: $bg-color;
                    border-radius: 100%;
                    vertical-align: middle;
                    border: 1px solid $financi-green;
                    appearance: none;
                    cursor: pointer;
                    margin-right: 8px; 
                }

                #login__check__box:checked::before {
                    border-radius: 100%;
                    content: ''; 
                    position: absolute;
                    vertical-align: middle;
                    background: $financi-green; 
                    appearance: none;
                    width: 0.7em; 
                    height: 0.7em;
                    margin-top: 2px;
                    margin-left: 2.5px;
                }
                
                &__error {
                    margin-top: 20px;
                    color: $financi-red;
                    font-weight: 500;
                    text-align: left;
                    margin-bottom: 10px;
                }
            }
        }

        &__container__footer {
            display:flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 25px;
        }
    }

    p {
        color: $text-color-white;
    }

    a {
        color: $financi-green;
        text-decoration: none;
    }
</style>
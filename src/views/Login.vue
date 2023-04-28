<script setup lang="ts">

import { ref } from 'vue';
import Input from '../components/Input.vue';
import EntrarButton from "../components/EntrarButton.vue";

const eMail = ref("");
const password = ref("");
</script>

<template>
    <div class="Login">
        <header>
            <img src="../assets/Exchange.png" alt="Logo Symbol">
            <h1>Financi</h1>
        </header>

        <form>
            <Input type="email" placeholder="Digite seu email" v-model="eMail"/>
            <Input type="password" placeholder="Digite sua senha" v-model="password"/>
            <div class="keepLoged">
                <input type="checkbox" id="login_check_box" name="login_check" checked>
                <label for="login_check_box" style="color: white">Mantenha-me conectado</label>
            </div>    
        </form>

        <footer>
            <EntrarButton text="ENTRAR"></EntrarButton>
            <p style="color: white">Não possui uma conta? <a href = "Register.vue">Cadastre-se aqui.</a></p>
        </footer>
    </div>
</template>


<style scoped lang="scss">
@import "../colors.scss";

    header {
        display:flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    h1 {
        font-size: 48px;
        color:  $text-color-white;
    }

    .Login{
        display:flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin: 0;
        height: 100vh;
        gap: 100px;
        background-color: $bg-color;
    }

    button{
        width: 50px;
        height: 50px;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    #login_check_box {
        width: 1.3em;
        height: 1.3em;
        background-color: $bg-color;
        border-radius: 100%;
        vertical-align: middle;
        border: 1px solid $financi-green;
        appearance: none;
        cursor: pointer;
        margin-right: 8px; 
    }

    #login_check_box:checked:before {
        border-radius: 100%;
        content: ''; 
        position: absolute;
        vertical-align: middle;
        background: $financi-green; 
        appearance: none;
        width: 0.8em; 
        height: 0.8em;
        margin-top: 2px;
        margin-left: 2px;
    }

    footer {
        display:flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 25px;
    }

    a {
        color: $financi-green;
        text-decoration: none;
    }

</style>
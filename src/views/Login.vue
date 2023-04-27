<script setup lang="ts">

import EmailBox from "../components/EmailBox.vue";
import PasswordBox from "../components/PasswordBox.vue";
import EntrarButton from "../components/EntrarButton.vue";
//import { RouterView } from 'vue-router';
</script>

<template>
    <div class="Login">
        <h1>Financi</h1>
        <form>
            <EmailBox></EmailBox>
            <PasswordBox></PasswordBox>
            <div class="keepLoged">
                <input type="checkbox" id="login_check_box" name="login_check" checked>
                <label for="login">Mantenha-me conectado</label>
            </div>
            
        </form>
        <EntrarButton></EntrarButton>
        <p>Não possui uma conta? Cadastre-se aqui.</p>
    </div>
</template>


<style scoped>

h1 {
    font-size: 48px;
    color:  rgb(255, 255, 255);
}
.Login{
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0;
    height: 100vh;
    gap: 100px;
    background-color: #222622;
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

</style>
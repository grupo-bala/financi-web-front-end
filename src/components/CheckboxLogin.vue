<script setup lang="ts">
const {text} = defineProps<{
  text: string,
}>();
</script>

<template>
    <div class="container">
        <input class="container__checkbox" type="checkbox" id="login__check__box" name="login_check" checked>
        <label class="container__label" for="login__check__box">{{text}}</label>
    </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";

    .container {

        &__checkbox {
            width: 1.2em;
            height: 1.2em;
            background-color: $bg-color;
            border-radius: 100%;
            vertical-align: middle;
            border: 1px solid $financi-green;
            appearance: none;
            cursor: pointer;
            margin-right: 8px; 

            &:checked::before {
                border-radius: 100%;
                content: ''; 
                position: absolute;
                vertical-align: middle;
                background: $financi-green; 
                appearance: none;
                width: 0.6em; 
                height: 0.6em;
                margin-top: 3px;
                margin-left: 3px;
            }
        }

        &__label {
            color: $text-color-white;
        }

    }
</style>
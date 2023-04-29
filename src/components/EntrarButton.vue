<script setup lang="ts">
defineProps({
  text: String
});

</script>

<template>
    <div>
        <button>{{text}}</button>
    </div>
</template>

<style scoped lang="scss">
@import "../colors.scss";

  button{
    width: 200.35px;
    height: 50px;
    border: 1px solid $financi-green;
    border-radius: 5px;
    background-color: $financi-green;
    color: $text-button-color;
    font-weight: bold;
    font-size: larger;
    text-align: center;
    letter-spacing: 0.08em;
    cursor: pointer;
  }
</style>
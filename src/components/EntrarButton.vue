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
    border-radius: 5px;
    background-color: $financi-green;
    border-color: $financi-green;
    font-size: 22px;
    cursor: pointer;
  }

</style>
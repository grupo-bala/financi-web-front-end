
<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "./components/Navbar/ChosenNavbar.vue";
</script>

<template>
  <div>
    <NavBar />
    <router-view />
  </div>
</template>

<style scoped>

</style>
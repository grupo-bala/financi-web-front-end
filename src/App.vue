<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "./components/Navbar/ChosenNavbar.vue";
import FeedbackModal from "./components/FeedbackModal.vue";
</script>

<template>
  <div class="app_container">
    <NavBar />
    <FeedbackModal />
    <router-view />
  </div>
</template>

<style scoped lang="scss">
@import "./variables.scss";

.app_container {
  background-color: $bg-color;
}

@media (max-width: 800px) {
  .app_container {
    padding-bottom: 100px;
  }
}
</style>
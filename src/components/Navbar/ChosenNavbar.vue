<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import NavbarDesktop from "./NavbarDesktop.vue";
import NavbarMobile from "./NavbarMobile.vue";
import NotLoggedNavBar from "./NotLoggedNavBar.vue";
import { useStorage } from "@vueuse/core";
import { useRoute } from "vue-router";
import { ref } from "vue";

const isDesktop = ref(useMediaQuery("(min-width: 800px)"));
const route = useRoute();
const skipRoutes = ["Login", "Register"];
const isLogged = useStorage("isLogged", false);
</script>

<template>
  <nav v-if="!skipRoutes.includes(route.name?.toString() ?? '')">
    <NotLoggedNavBar v-if="!isLogged" />
    <NavbarDesktop v-else-if="isDesktop" />
    <NavbarMobile v-else />
  </nav>
</template>
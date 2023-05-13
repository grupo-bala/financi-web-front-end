<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import NavbarDesktop from "./NavbarDesktop.vue";
import NavbarMobile from "./NavbarMobile.vue";
import { ref } from "vue";

const isDesktop = ref(useMediaQuery("(min-width: 1281px)"));

</script>

<template>
  <nav>
    <NavbarDesktop v-if="isDesktop" />
    <NavbarMobile v-else />
  </nav>
</template>
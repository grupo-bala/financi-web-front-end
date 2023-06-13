<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import NavbarDesktop from "./NavbarDesktop.vue";
import NavbarMobile from "./NavbarMobile.vue";
import NotLoggedNavBar from "./NotLoggedNavBar.vue";
import { useStorage } from "@vueuse/core";
import router from "../../router";
import { ref, watch, computed } from "vue";

const isDesktop = useMediaQuery("(min-width: 800px)");
const skipRoutes = ["Login", "Register"];
const isLogged = useStorage("isLogged", false);
const isWindowLoaded = ref(false);
const isInSkipRoutes = ref(true);
const currentRoute = router.currentRoute;
const shouldAppear = computed(() => {
  const isMobileInHome =
    !isDesktop.value && currentRoute.value.name?.toString() === "Home";
  return !isInSkipRoutes.value && !isMobileInHome;
});

watch(currentRoute, () => {
  isInSkipRoutes.value = skipRoutes.includes(
    currentRoute.value.name!.toString(),
  );

  if (isInSkipRoutes.value) {
    window.addEventListener("load", () => {
      isWindowLoaded.value = true;
    });
  } else {
    isWindowLoaded.value = true;
  }
});
</script>

<template>
  <nav
    v-if="shouldAppear && isWindowLoaded"
  >
    <NotLoggedNavBar v-if="!isLogged" />
    <NavbarDesktop v-else-if="isDesktop" />
    <NavbarMobile v-else />
  </nav>
</template>
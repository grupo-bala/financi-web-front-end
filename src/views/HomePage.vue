<script setup lang="ts">
import NavbarMobile from "../components/Navbar/NavbarMobile.vue";
import NavbarDesktop from "../components/Navbar/NavbarDesktop.vue";
import { useMediaQuery } from "@vueuse/core";

const isDesktop = useMediaQuery("(min-width: 1281px)");
</script>

<template>
  <div class="main_content">
    <div
      v-if="isDesktop"
      class="main_content__desktop"
    >
      <nav class="main_content__desktop__nav">
        <NavbarDesktop />
      </nav>
      <h1 class="main_content__title">
        Home
      </h1>
    </div>
    <div
      v-else
      class="main_content__mobile"
    >
      <h1 class="main_content__title">
        Home
      </h1>
      <nav class="main_content__mobile__nav">
        <NavbarMobile />
      </nav>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import "../variables.scss";

  .main_content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 100svh;
    background-color: $bg-color;

    &__title {
      color: $text-color-white;
    }

    &__desktop {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100vh;

      &__nav {
        width: 100vw;
        padding-bottom: 2rem;
      }
    }

    &__mobile {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100vw;

      &__nav {
        position: fixed;
        bottom: 2em;
      }
    }
  }

</style>
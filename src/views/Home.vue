<script setup lang="ts">
  import navbarMobile from '../components/navbar/navbarMobile.vue';
  import navbarDesktop from '../components/navbar/navbarDesktop.vue';
  import { useMediaQuery } from '@vueuse/core';

  const isDesktop = useMediaQuery('(min-width: 1281px)');
</script>

<template>
  <div class="main_content">
    <div class="main_content__desktop" v-if="isDesktop">
      <nav class="main_content__desktop__nav">
        <navbarDesktop/>
      </nav>
      <h1 class="main_content__title">Home</h1>
    </div>
    <div class="main_content__mobile" v-else>
      <h1 class="main_content__title">Home</h1>
      <nav class="main_content__mobile__nav">
        <navbarMobile/>
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
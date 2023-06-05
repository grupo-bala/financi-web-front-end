<script setup lang="ts">
//import { onMounted, ref } from "vue";
//import { ref } from "vue";

const props = defineProps<{
  username: string
}>();

/*
function setGreeting() {
  const hours = {
    hour: new Date().getHours(),
    day: 0,
    afternoon: 12,
    night: 18,
  };

  if (hours.hour >= hours.day && hours.hour < hours.afternoon) {
    greeting.value = "Bom dia!";
  } else if (hours.hour >= hours.afternoon && hours.hour < hours.night) {
    greeting.value = "Boa tarde!";
  } else {
    greeting.value = "Boa noite!";
  }
}

function getGreetingAndsSetInterval() {
  const interval = 900000;

  setGreeting();

  setInterval(setGreeting, interval);
}

onMounted(() => {
  getGreetingAndsSetInterval();
});*/
</script>

<!-- Atualizar para pegar o url da foto usuario nas props -->

<template>
  <div class="profile_container">
    <div class="profile_container__user_info">
      <img
        src="https://picsum.photos/500"
        alt="user"
        class="profile_container__user_info__img"
      >
      <p class="profile_container__user_info__username">
        @{{ props.username }}
      </p>
    </div>
  </div>
</template>

<style scooped lang="scss">
@import "../variables.scss";

.profile_container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  &__user_info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;

    &__img {
      width: 132px;
      height: 132px;
      border: 3px solid $financi-green;
      border-radius: 50%;
    }

    &__username {
      color: $text-color-white;
      font-size: 24px;
      font-weight: 600;
    }
  }
}
</style>
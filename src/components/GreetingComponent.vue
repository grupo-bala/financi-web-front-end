<script setup lang="ts">
import { onMounted, ref } from "vue";

const envUrl = import.meta.env.VITE_API_URL;
const photoSource = `${envUrl}/get-photo?timestamp=${Date.now()}`;
const greeting = ref("");
const props = defineProps<{
  username: string
}>();

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
});
</script>

<template>
  <div class="greetings_container">
    <div class="greetings_container__user_info">
      <img
        :src="photoSource"
        alt="user"
        class="greetings_container__user_info__img"
      >
      <div class="greetings_container__user_info__content">
        <p
          class="
            greetings_container__user_info__content__username
          "
        >
          {{ props.username }}
        </p>
        <p
          class="
            greetings_container__user_info__content__greeting
          "
        >
          {{ greeting }}
        </p>
      </div>
    </div>
    <v-icon
      name="io-settings-sharp"
      scale="1.5"
    />
  </div>
</template>

<style scooped lang="scss">
@import "../variables.scss";

.greetings_container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  &__user_info {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;

    &__img {
      width: 65px;
      height: 65px;
      border: 3px solid $financi-green;
      border-radius: 50%;
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-size: 1.3em;

      &__username {
        font-weight: 600;
      }

      &__greeting {
        font-weight: 400;
        color: $text-color-gray;
      }
    }
  }
}
</style>
<script setup lang="ts">

const envUrl = import.meta.env.VITE_API_URL;
const photoSource = `${envUrl}/get-photo`;
const props = defineProps<{
  username: string
}>();

</script>

<template>
  <div class="profile_container">
    <div class="profile_container__user_info">
      <img
        :src="photoSource"
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
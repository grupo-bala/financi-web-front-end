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
      <label
        for="photoInput"
        class="profile_container__user_info__image-input-label"
        :style="{ backgroundImage: `url(${photoSource})` }"
      >
        <input
          type="file"
          id="photoInput"
          class="profile_container__user_info__image-input"
          accept="image/*"
        >
      </label>
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

    &__image-input-label {
    display: inline-block;
    width: 132px;
    height: 132px;
    border: 3px solid $financi-green;
    background-size: cover;
    background-position: center;
    cursor: pointer;
    border-radius: 50%;
  }

    &__image-input {
      display: none;
    }
  }
}
</style>
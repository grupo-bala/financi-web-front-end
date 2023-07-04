<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import router from "../router";
import { useFeedbackStore } from "../stores/feedbackStore";

const props = defineProps<{
  username: string
}>();

const photoInput = ref<HTMLInputElement | null>(null);
const envUrl = import.meta.env.VITE_API_URL;
const photoSource = ref(`${envUrl}/get-photo?timestap=${Date.now()}`);
const feedbackModal = useFeedbackStore();

async function changeProfilePicture() {
  const file = photoInput.value!.files![0];
  const formData = new FormData();
  formData.append("file", file);

  try {
    await axios.post(`${envUrl}/upload-photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    photoSource.value = `${envUrl}/get-photo?timestap=${Date.now()}`;
    feedbackModal.notify("A sua foto de perfil foi atualizada com sucesso");
  } catch (error) {
    router.push("/ops");
  }
}

function handleFileChange(): void {
  changeProfilePicture();
}

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
          id="photoInput"
          ref="photoInput"
          alt="enviar nova foto"
          type="file"
          class="profile_container__user_info__image-input"
          accept="image/*"
          @change="handleFileChange"
        >
        <div class="profile_container__user_info__image-input-label__filter">
          <v-icon
            name="bi-camera"
            scale="3"
            fill="white"
          />
        </div>
      </label>
      <p class="profile_container__user_info__username">
        @{{ props.username }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
    width: 120px;
    height: 120px;
    border: 3px solid $financi-green;
    background-size: cover;
    background-position: center;
    cursor: pointer;
    border-radius: 50%;
    position: relative;

    &__filter {
      display: none;
    }

    &:hover &__filter {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      animation: upload .1s ease-in-out forwards;
    }
  }

    &__image-input {
      display: none;
    }
  }
}

@keyframes upload {
  from {
    background-color: transparent;
    backdrop-filter: none;
  }

  to {
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: grayscale(100%) blur(5px);
  }
}
</style>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useFeedbackStore } from "../stores/feedbackStore";

const invalidTimeoutId = -1;
const feedback = useFeedbackStore();
const isShowing = ref(false);
const timeoutId = ref(invalidTimeoutId);

const timeout = 5000;
const timeoutText = `${timeout}ms`;

watch(feedback, () => {
  if (feedback.text === "") {
    isShowing.value = false;
    clearTimeout(timeoutId.value);
    return;
  }

  if (timeoutId.value !== invalidTimeoutId) {
    clearTimeout(timeoutId.value);
  }

  isShowing.value = true;
  timeoutId.value = setTimeout(() => {
    isShowing.value = false;
    feedback.text = "";
  }, timeout);
});
</script>

<template>
  <Transition>
    <div
      v-if="isShowing"
      class="feedback"
      @click="feedback.text = ''"
    >
      <div
        ref="contentElement"
        class="feedback__content"
      >
        {{ feedback.text }}
      </div>
      <div
        :key="timeoutId"
        :style="{ backgroundColor: `${feedback.currentColor}` }"
        class="feedback__loading"
      />
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@import "../variables.scss";
.feedback {
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: #fafafa;
  border-radius: $border-radius;
  color: black;
  padding: 1rem;
  max-width: 300px;
  z-index: 10;
  cursor: pointer;
  box-shadow: $box-shadow;

  &__loading {
    width: 100%;
    border-radius: $border-radius;
    height: 5px;
    position: absolute;
    bottom: 0;
    left: 0;
    animation: loading v-bind(timeoutText) linear forwards;
  }
}

.v-enter-active,
.v-leave-active {
  transition: right 0.2s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  right: -100%;
}

.v-enter-to,
.v-leave-from {
  right: 0;
}

@keyframes loading {
  from {
    width: 100%;
  }

  to {
    width: 0%;
  }
}

@media screen and (min-width: 800px) {
  .feedback {
    top: auto;
    bottom: 10px;
  }
}
</style>
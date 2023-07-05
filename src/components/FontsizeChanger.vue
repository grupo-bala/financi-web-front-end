<script setup lang="ts">
import { watch, ref } from "vue";

const props = defineProps<{
  isReady: boolean,
}>();

const root = ref<HTMLDivElement | null>(null);
const defaultFonts = new Map<number, string>();
const elements = ref<HTMLElement[]>([]);

function resetFont() {
  if (!root.value) {
    return;
  }

  for (let i = 0; i < elements.value.length; i++) {
    elements.value[i].style.fontSize = defaultFonts.get(i)!;
  }
}

function increaseFont() {
  if (!root.value) {
    return;
  }

  for (let i = 0; i < elements.value.length; i++) {
    let fontSize = Number(
      getComputedStyle(elements.value[i]).fontSize.split("px").shift(),
    );

    const maxFontSize = 30;
    const increment = 2;

    if (fontSize < maxFontSize) {
      fontSize += increment;
      elements.value[i].style.fontSize = `${fontSize}px`;
    }
  }
}

function decreaseFont() {
  if (!root.value) {
    return;
  }

  for (let i = 0; i < elements.value.length; i++) {
    let fontSize = Number(
      getComputedStyle(elements.value[i]).fontSize.split("px").shift(),
    );

    const maxFontSize = 12;
    const decrement = 2;

    if (fontSize > maxFontSize) {
      fontSize -= decrement;
      elements.value[i].style.fontSize = `${fontSize}px`;
    }
  }
}

watch(() => props.isReady, async () => {
  if (!root.value || !props.isReady) {
    return;
  }

  const waitForDOM = 2000;
  await new Promise((resolve) => setTimeout(resolve, waitForDOM));

  const queryElements =
    root.value.parentElement!.querySelectorAll<HTMLElement>("*[data-font]");

  for (let i = 0; i < queryElements.length; i++) {
    defaultFonts.set(i, getComputedStyle(queryElements[i]).fontSize);
    elements.value.push(queryElements[i]);
  }
});
</script>

<template>
  <div
    v-show="elements.length > 0"
    ref="root"
    class="fontsize"
  >
    <button @click="increaseFont">
      (A+)
    </button>
    <button @click="resetFont">
      (A)
    </button>
    <button @click="decreaseFont">
      (A-)
    </button>
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";

.fontsize {
  position: fixed;
  z-index: 10;
  bottom: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  button {
    background-color: $financi-green;
    border: none;
    color: $text-color-black;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: $border-radius;
    font-weight: bold;
    cursor: pointer;
  }
}

@media screen and (max-width: 800px) {
  .fontsize {
    display: none;
  }
}
</style>
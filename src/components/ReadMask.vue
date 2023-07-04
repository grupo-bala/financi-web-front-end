<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  isActive: boolean,
}>();

const classes = ref<string[]>([]);
const mask = ref<HTMLDivElement | null>(null);

function readMask() {
  const maskClass = "mask";
  if (classes.value.includes(maskClass)) {
    classes.value = classes.value.filter(
      (value) => value !== "mask" && value !== "focus",
    );
  } else {
    classes.value = [...classes.value, "mask", "focus"];
  }
}

function updateMaskPos(event: MouseEvent) {
  if (mask.value) {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    mask.value.style.top = `
      ${event.clientY + scrollTop}px
    `;
  }
}

document.addEventListener("mousemove", updateMaskPos);

watch(props, () => {
  readMask();
});
</script>

<template>
  <div
    ref="mask"
    :class="classes.join(' ')"
  />
</template>

<style scoped lang="scss">
.mask {
  top: 50%;
  left: 50%;
  width: 99%;
  height: 10rem;
  z-index: 9999;
  position: absolute;
  pointer-events: none;
  border: 2px dashed #000;
  transform: translate(-50%, -50%);
  background-color: rgba(0,0,0,0.3);
  box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.5);
}

.focus {
  backdrop-filter:  brightness(2.0);
}
</style>
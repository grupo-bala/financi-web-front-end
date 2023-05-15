<script setup lang="ts">
import { ref } from "vue";
import { Skeletor } from "vue-skeletor";
import "vue-skeletor/dist/vue-skeletor.css";

const props = defineProps<{
  src: string,
  circle?: boolean,
  pill?: boolean,
  imgClass?: string,
}>();

const isImageLoading = ref(true);
</script>

<template>
  <div>
    <Skeletor
      v-if="isImageLoading"
      :circle="props.circle"
      :pill="props.pill"
      :class="'skeletor ' + props.imgClass"
    />
    <img
      :src="props.src"
      :style="{
        display: isImageLoading ? 'none' : 'block',
      }"
      :class="props.imgClass"
      @load="isImageLoading = false"
    >
  </div>
</template>

<style scoped lang="scss">
@import "../../variables.scss";

.skeletor {
  border-radius: $border-radius;
}
</style>
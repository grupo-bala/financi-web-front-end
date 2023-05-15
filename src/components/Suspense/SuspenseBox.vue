<script setup lang="ts">
import { Skeletor } from "vue-skeletor";
import "vue-skeletor/dist/vue-skeletor.css";

const props = defineProps<{
  isLoading: boolean,
  loadingWidth: number | string,
  loadingHeight: number | string,
  circle?: boolean,
  pill?: boolean,
}>();
</script>

<template>
  <div
    :style="{
      width: isLoading ? props.loadingWidth : 'auto',
      height: isLoading ? props.loadingHeight : 'auto',
    }"
  >
    <Skeletor
      v-if="props.isLoading"
      :width="props.loadingWidth"
      :height="props.loadingHeight"
      class="skeletor"
    />
    <slot
      :style="{
        display: isLoading ? 'none' : 'block'
      }"
    />
  </div>
</template>

<style scoped lang="scss">
@import "../../variables.scss";
.skeletor {
  border-radius: $border-radius;
}
</style>
<script setup lang="ts">
import { Skeletor } from "vue-skeletor";
import "vue-skeletor/dist/vue-skeletor.css";

const props = defineProps<{
  isLoading: boolean,
  loadingWidth: number | string,
  loadingHeight: number | string,
  quantity?: number,
  circle?: boolean,
  pill?: boolean,
}>();
</script>

<template>
  <div
    :class="isLoading ? 'suspense' : ''"
  >
    <div
      v-for="i of props.quantity ?? 1"
      :key="i"
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
    </div>
    <slot
      :style="{
        display: isLoading ? 'none' : 'block'
      }"
    />
  </div>
</template>

<style scoped lang="scss">
@import "../../variables.scss";

div
.skeletor {
  border-radius: $border-radius;
}

.suspense {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
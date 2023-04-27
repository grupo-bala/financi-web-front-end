<script setup lang="ts">
defineProps({
  type: String,
  placeholder: String,
  modelValue: String
});
defineEmits(["update:modelValue"]);

</script>

<template>
  <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :type="type" :placeholder="placeholder">
</template>

<style scoped lang="scss">
@import "../colors.scss";
  input {
    background: transparent;
    width: 328px;
    padding: 20px;
    border: 1px solid gray;
    border-radius: 5px;
    outline: none;
    color:  $text-color-white;
    font-size: 1em;
  }
</style>
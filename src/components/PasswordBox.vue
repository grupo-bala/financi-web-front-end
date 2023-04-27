<template>
    <div class="password">
        <input type="password" name="password" placeholder="Digite sua senha">
    </div>
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
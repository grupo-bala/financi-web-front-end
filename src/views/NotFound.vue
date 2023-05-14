<template>
  <main class="not_found">
    <h1>Essa página não existe...</h1>
  </main>
</template>

<style scoped lang="scss">
@import "../variables.scss";
.not_found {
  height: 100svh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: $bg-color;
  color: $text-color-white;
}
</style>
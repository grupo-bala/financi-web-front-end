<template>
  <main class="not_found">
    <h1>Essa página não existe...</h1>
    <img
      alt="Imagem de gato confuso"
      src="../assets/NotFoundImage.png"
      class="not_found__image"
    >
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
  flex-direction: column;
  padding: 2rem;
  background-color: $bg-color;
  color: $text-color-white;

  &__image {
    width: 20em;
  }
}

@media (min-width: 800px){
  .not_found{
    flex-direction: row;
  }
}
</style>
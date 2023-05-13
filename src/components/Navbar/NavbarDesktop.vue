<template>
  <div class="container">
    <div class="container__logo">
      <img src="../../assets/FinanciLogo.png">
      <button class="container__button">
        Financi
      </button>
    </div>
    <div class="container__navbuttons">
      <router-link
        class="container__navbuttons_navbutton"
        to="/"
      >
        Início
      </router-link>
      <router-link
        class="container__navbuttons_navbutton"
        to="/"
      >
        Transações
      </router-link>
      <router-link
        class="container__navbuttons_navbutton"
        to="/"
      >
        Metas
      </router-link>
      <router-link
        class="container__navbuttons_navbutton"
        to="/"
      >
        Aulas
      </router-link>
      <router-link
        class="container__navbuttons_navbutton"
        to="/"
      >
        Relatórios
      </router-link>
      <router-link
        class="container__navbuttons_navbutton"
        to="/news"
      >
        Noticias
      </router-link>
      <router-link
        class="container__navbuttons_navbutton"
        to="/"
      >
        Perfil
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">

@import "../../variables.scss";

.container {
  width: 100%;
  background-color: $financi-green;
  display: flex;
  justify-content: space-between;
  padding-left: 1.5rem;
  height: 4rem;

  &__button {
    background-color: $financi-green;
    border:none;
    color: $text-color-white;
    font-weight: 500;
    padding-left: 0.7rem;
    border-bottom: 0;
    font-weight: 700;
  }
  &__logo {
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .container {
    &__navbuttons{
      width: auto;
      display: flex;
      gap: 1.5rem;
      justify-content: end;
      align-items: center;
      padding-right: 1.5rem;

      &_navbutton {
        text-decoration: none;
        color: $text-color-white;
        background-color: $financi-green;
        cursor: pointer;
        font-size: 1.1em;
        border-bottom: 1px solid transparent;
        &:hover {
          border-bottom-color: $text-color-white;
        }
      }
    }
  }

  button {
      border: none;
      color: $text-color-white;
      background-color: $financi-green;
      cursor: pointer;
      font-size: 1.1em;
  }
}

</style>
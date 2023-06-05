<template>
  <div class="container">
    <div class="container__logo">
      <router-link
        class="container__logo__button"
        to="/"
      >
        <img src="../../assets/FinanciLogo.png">
        Financi
      </router-link>
    </div>
    <div class="container__navbuttons">
      <router-link
        class="container__navbuttons_navbutton"
        to="/dashboard"
      >
        Início
      </router-link>
      <router-link
        class="container__navbuttons_navbutton"
        to="/transactions"
      >
        Transações
      </router-link>
      <router-link
        class="container__navbuttons_navbutton"
        to="/goals"
      >
        Metas
      </router-link>
      <router-link
        class="container__navbuttons_navbutton"
        to="/courses"
      >
        Cursos
      </router-link>
      <router-link
        class="container__navbuttons_navbutton"
        to="/reports"
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
        to="/profile"
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
  height: $navbar-height;

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;

      &__button {
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: $text-color-white;
        gap: 10%;
        font-weight: 700;
    }
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
}

</style>
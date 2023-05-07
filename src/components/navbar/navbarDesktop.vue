<template>
  <div id="container">
    <div id="logo">
      <img src="../../assets/FinanciLogo.png">
      <button id="textFinanci">
        Financi
      </button>
    </div>
    <div id="navbuttons">
      <button>Início</button>
      <button>Transações</button>
      <button>Metas</button>
      <button>Aulas</button>
      <button>Relatórios</button>
      <button>Noticias</button>
      <button>Perfil</button>
    </div>
  </div>
</template>

<style scoped>
#container {
  display: flex;
  background-color: #49AD5A;
  padding: 0 1.5rem;
  justify-content: space-between;
}

button {
  background-color: #49AD5A;
  border:none;
  color: white;
  font-family: "Montserrat";
  font-weight: 500;
  cursor: pointer;
  font-size: 1.1em;
 }

 #textFinanci {
  font-weight: bold;
  padding-left: 0.5em;
 }

#logo {
  cursor: pointer;
  display: flex;
  align-items: center;
}

#navbuttons {
  display: flex;
  gap: 1.5rem;
  justify-content: end;
  align-items: center;
}

</style>
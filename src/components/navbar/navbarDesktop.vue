<template>
    <nav>
        <div id="logo">
            <img src="../../assets/FinanciLogo.png">
            <button id="logoFinanci">Financi</button>
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
    </nav>
</template>

<style scoped>
  
nav {
  display: flex;
  gap: 42em;
  background-color: #49AD5A;
  height: 10vh;
  width: 100vw;
}

button {
  background-color: #49AD5A;
  border:none;
  color: white;
  font-family: "Montserrat";
  font-weight: 600;
  cursor: pointer;
  font-size: 1.0em;

 }

 #logoFinanci {
  font-weight: bold;
 }

#logo {
  cursor: pointer;
  display: flex;
  padding-left: 1rem;
  align-items: center;
}

#navbuttons {
  display: flex;
  gap: 5%;
}

img {
  padding-right: 1rem;
}


</style>
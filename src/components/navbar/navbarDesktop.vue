<template>
    <nav>
        <div id="logo">
            <img src="../../assets/FinanciLogo.png">
            <button id="textFinanci">Financi</button>
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
  background-color: #49AD5A;
  height: 7vh;
  max-width: 100vw;
  padding: 0 1rem;
}

button {
  background-color: #49AD5A;
  border:none;
  color: white;
  font-family: "Montserrat";
  font-weight: 600;
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
  gap: 1rem;
  width: 100%;
  justify-content: end;
}

</style>
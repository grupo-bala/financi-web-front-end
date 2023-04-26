<template>
    <nav>
        <div id="logo">
            <img src="../assets/FinanciLogo.png">
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

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&display=swap');

* {
  margin: 0;
  padding: 0;
}
  
nav {
  display: flex;
  gap: 45%;
  background-color: #49AD5A;
  height: 10vh;
  width: 100vw;
}

button {
  background-color: #49AD5A;
  border:none;
  color: white;
  font-size: 17px;
  font-family: "Montserrat";
  font-weight: 600;
  cursor: pointer;

 }

 #logoFinanci {
  font-weight: bold;
 }

#logo {
  cursor: pointer;
  display: flex;
  padding-left: 1%;
  align-items: center;
}

#navbuttons {
  display: flex;
  gap: 5%;
 
}

img {
  height: 30px;
  padding-right: 10px;
}


</style>
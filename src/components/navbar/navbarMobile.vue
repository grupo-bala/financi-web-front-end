<template>
    <div id="container">
        <nav>
            <button id="home">
                <img src="../../assets/Home.png">
            </button>
            <button>
                <img src="../../assets/Transaction.png">
            </button>

            <button id="buttonContainer">
                <div id="addButton"> + </div>
            </button>
            <button>
                <img src="../../assets/Courses.png">
            </button>
            <button id="charts">
                <img src="../../assets/Charts.png">
            </button>
        </nav>
    </div>
</template>

<style scoped>

#home {
    padding-left: 5%;
    border-radius: 10%;
}



#charts {
    padding-right: 5%;
    border-radius: 10%;

}

#container {
    display: flex;
    justify-content: center;
    align-items: center;
}

#buttonContainer {
    display: flex;
    justify-content: center;
    align-items: center;
}

#addButton {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 3.5em;
    color: #49AD5A;
    height: 1.7em;
    width: 1.7em;
    background-color: #383838;

}

nav {
  display: flex;
  background-color: #1E1E1E;
  min-height: 50px;
  max-width: 400px;
  height: 6vh;
  width: 90vw;
  justify-content: space-between;
  border-radius: 10%;

}

button {
    background-color: #1E1E1E;
    color: white;
    border: none;
}


</style>
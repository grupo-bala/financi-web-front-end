<template>
    <div class="email">
        <input type="text" id="email_login" name="email" placeholder="insira o seu email">
    </div>
</template>

<style scoped lang="scss">
.email {
  width: 100%;
  height: fit-content;
}

#email_login{
  width: 100%;
  border: 1px solid gray;
  border-radius: 5px;
  background: transparent;
  color:  rgb(255, 255, 255);
  outline: none;
  padding: 20px;
}

::placeholder{
  font-size: 16px;
  color: rgb(255, 255, 255);
}
</style>
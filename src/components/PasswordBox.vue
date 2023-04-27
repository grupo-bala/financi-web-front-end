<template>
    <div class="password">
        <input type="password" id="password_login" name="password" placeholder="  *****************">
    </div>
</template>

<style scoped>
#password_login{
  width: 328px;
  height: 72px;
  border-radius: 5px;
  border-color: gray;
  background: transparent;
  box-shadow: none;
  color:  rgb(255, 255, 255);
}

::placeholder{
  font-size: 16px;
  color: rgb(255, 255, 255);
}
</style>
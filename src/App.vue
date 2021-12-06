<template>
  <div id="app">
    <router-link to="/HelloWorld">home</router-link>
    <!-- <router-link to="/Calculator">Calculator</router-link> -->
    <router-view/>
  </div>

</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  margin: 0px;
  padding: 0px;
  top: 0;
  left: 0;
  z-index: -1;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  position: absolute;
  /* background-image: url(../static/background.jpg); */
  background-size: cover;
}
</style>

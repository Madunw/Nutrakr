<template>
  <div id="app">
    <!-- page header -->
    <!-- header -->
    <el-header id="page-header">
      <span id="header">IntakeCalculator</span>
      <!-- navigation -->
      <ul id="navigation">
        <li class="navigation-bar">
          <span><router-link to="/">Home</router-link></span>
        </li>
        <li class="navigation-bar">
          <span><router-link to="/test">test</router-link></span>
        </li>
      </ul>
    </el-header>
    <!-- main contents area -->
    <el-main><router-view /></el-main>
    
  </div>
</template>

<style>
#app {
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
  background-color: rgb(217, 180, 252);
  background-size: cover;
}
#page-header {
  height: 10%;
  background-color: aquamarine;
}
#header {
  float: left;
}
#navigation {
  float: right;
  list-style-type: none;
}
.navigation-bar {
  margin: 5px;
  display: inline-block;
}
</style>

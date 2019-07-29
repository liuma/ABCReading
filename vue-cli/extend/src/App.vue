<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
#app {
  font-family: PingFangSC-Regular, 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: .2rem;
  background-color: #0F66A6;
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
    &:link, &:visited, &:hover {
      text-decoration: none;
    }
  }
}
</style>

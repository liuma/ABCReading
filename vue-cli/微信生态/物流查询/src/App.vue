<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <img src="./assets/imgs/img_hd.png" class="img_hd">
    <router-view/>
    <img src="./assets/imgs/img_ft.png" class="img_ft">
  </div>
</template>

<script>
export default {
  name: 'App',
  // provide (){
  //   return {
  //     reload: this.reload
  //   }
  // },
  data(){
    return {
      isRouterAlive: true
    }
  },
  created(){
  },
  methods:{
    
  }
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
.Hidden{
  display: none;
}
#app {
  font-family: PingFangSC-Regular, 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: .2rem;
  background-color: #EE9923;
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
    &:link, &:visited, &:hover {
      text-decoration: none;
    }
  }
  .img_hd,.img_ft{
      display: block;
      width: 100%;
  }
}
</style>

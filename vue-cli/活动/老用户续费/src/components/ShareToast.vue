<template>
  <div class='toast_wrap'>
     <div class="arrow"></div>
  </div>
</template>
<script>
  export default{
    name:'eject',
    data(){
      return{
        showStatus: this.showState
      }
    },
    props:['message','showState'],
    methods:{
      hideEject(){
        this.showStatus = false
        this.$parent.initEject()
      }
    }
  }
</script>
<style scoped lang="less">
  .toast_wrap{
    position: fixed;
    left: 0;
    top:0;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,.7);
    font-size: .4rem;
    color: #fff;
    text-align: right;
    .arrow{
      display: inline-block;
      width: 2.19rem;
      height: 1.89rem;
      background: url('../assets/images/share_arrow.png');
      background-size: cover;
      margin: .25rem .45rem;
    }
  }
</style>

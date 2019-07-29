<template>
  <div class='toast_wrap' v-show='perfectStatus'>
    <div class="perfect"></div>
  </div>
</template>
<script>
  export default{
    name:'perfect',
    data(){
      return{
        perfectStatus: this.showState
      }
    },
    props:['showState'],
    methods:{
      hidePerfect(){
        this.perfectStatus = false
        this.$parent.initPerfect()
      }
    },
    watch:{
      showState:function (val,oldVal) {
        if(val){
          this.perfectStatus = true
          setTimeout(this.hidePerfect,2400)
        }
      }
    }
  }
</script>
<style scoped lang="less">
  .toast_wrap{
    position: fixed;
    left: 0;
    top:0;
    z-index: 10001;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,.5);
    /*margin-top: 35%;*/
    .perfect{
      width: 5.81rem;
      height: 4.69rem;
      margin: .5rem auto;
      background: url('../../assets/imgs/perfect.png');
      background-size: cover;
      animation: scaleDraw 1.2s ease-in-out forwards;
      -webkit-animation: scaleDraw 1.2s ease-in-out forwards;
    }
    @keyframes scaleDraw {
      from{transform: scale(.2)}
      to{transform: scale(1)}
    }
    @-webkit-keyframes scaleDraw {
      from{transform: scale(.2)}
      to{transform: scale(1)}
    }
  }
</style>

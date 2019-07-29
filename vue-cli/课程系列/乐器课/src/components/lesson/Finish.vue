<template>
  <div class="finish">
    <div class="bg">
      <p class="txt1">Good job!</p>
      <p class="txt2">表现太棒了！</p>
      <div class="next" @click="next()"></div>
    </div>
  </div>
</template>
<script scoped>
  export default {
    name: 'Part',
    data () {
      return {
        titleTxt:'',
      }
    },
    created(){
      // this.getInfo()
      // this.shareConfig()
    },
    mounted(){
    },
    methods: {
      next(){
        let target = parseInt(this.$route.query.id)+1
        this.$router.replace({name:'Part',query:{id:target}})
      }
    }
  }
</script>

<style lang="less">
  .finish{
    width: 100vw;
    min-height: calc(~'100vh - .22rem');
    background: rgba(0,0,0,.5);
    padding-top: .22rem;
    .bg{
      width: 7.07rem;
      height: 4.99rem;
      margin: auto;
      background: url('../../assets/imgs/feed_bg.png');
      background-size: cover;
      position: relative;
      .txt1{
        font-family: Helvetica;
        font-size: .36rem;
        color: #FFF;
        letter-spacing: .02rem;
        text-align: center;
        line-height: 1;
        padding-top: 1.3rem;
      }
      .txt2{
        font-family: Helvetica;
        font-size: .3rem;
        color: #FFF;
        letter-spacing: .015rem;
        text-align: center;
        line-height: 1;
        padding-top: 1.2rem;
      }
      .next{
        width: 3.4rem;
        height: 1.24rem;
        position: absolute;
        top: 3.4rem;
        left: 50%;
        margin-left: -1.7rem;
        background: url('../../assets/imgs/next.png');
        background-size: cover;
      }
    }
  }
</style>

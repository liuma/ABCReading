<template>
  <div class='cf_wrap' v-show='showStatus'>
        <div class="cf_box">
            <img class="cf_close" src="../assets/images/eject_close.png" @click="hideCf()">
            <p v-html="message"></p>
            <div class="btn" @click="toApp()">开始学习</div>
        </div>
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
      hideCf(){
        this.showStatus = false
        this.$parent.initCf()
      },
      toApp(){
          window.location.href = "http://www.abctime.com/download.html?source_id=xf";
          _hmt.push(['_trackEvent', 'button', 'click', '弹框-开始学习']);
      }
    },
    watch:{
      showState:function (val,oldVal) {
        if(val){
          this.showStatus = true
        }
      }
    }
  }
</script>
<style scoped lang="less">
  .cf_wrap{
    position: fixed;
    left: 0;
    top:0;
    z-index: 101;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,.7);
    .cf_box{
        width: 4.8rem;
        background: #FFF1E3;
        border-radius: .16rem;
        margin: 40vh auto 0;
        transform: translate3d(0,-50%,0);
        padding: .6rem 0 .28rem;
        position: relative;
        .cf_close{
            width: .81rem;
            height: .82rem;
            position: absolute;
            right: -.3rem;
            top: -.85rem;
        }
        p{
            margin: auto;
            // max-width: 3.8rem;
            font-family: FZY4JW--GB1-0;
            font-size: .3rem;
            color: #8D4E2B;
            letter-spacing: .02rem;
            text-align: center;
            line-height: .42rem;
        }
        .btn{
            width: 2.4rem;
            height: .8rem;
            background: url('../assets/images/eject_btn.png');
            background-size: cover;
            line-height: .8rem;
            margin: .2rem auto 0;
            font-family: FZY4JW--GB1-0;
            font-size: .26rem;
            color: #B12C13;
            letter-spacing: .027rem;
            font-weight: bold;
        }
        &::before{
            content: '';
            width: 6.46rem;
            height: 1.51rem;
            background: url('../assets/images/eject_hd.png');
            background-size: cover;
            position: absolute;
            left: -.83rem;
            top: -.98rem;
        }
    }

  }
</style>

<template>
  <div class="suc">
    <div class="hd">
      <p class="title"><span class="icon"></span>领取成功！</p>
      <p class="desc">您获得ABC Reading亲子伴读体验课！</p>
      <img src="../assets/imgs/suc_card.png" class="card">
    </div>
    <p class="text">Let's go!</p>
    <router-link :to="{name:'List'}">
      <div class="toList">立即使用</div>
    </router-link>
    <script src="https://jic.talkingdata.com/app/h5/v1?appid=3CC753A079FF4043A1E53A00E9C15F8A&vn=devSuc"></script>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '恭喜您获得7天vip&&5天体验课'
    }
  },
  mounted () {
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .suc{
    width: 100%;
    min-height: 100vh;
    background: #35ADF2;
    .hd{
      width: 100%;
      height: 6.75rem;
      background: url('../assets/imgs/suc_hd.png') no-repeat;
      background-size: cover;
      position: relative;
      .title{
        font-family: PingFangSC-Semibold;
        font-weight: bold;
        font-size: .48rem;
        color: #FFFFFF;
        letter-spacing: .012rem;
        text-align: center;
        height: .58rem;
        line-height: .58rem;
        padding-top: 1.35rem;
        .icon{
          display: inline-block;
          width: .58rem;
          height: .58rem;
          background: url('../assets/imgs/suc_tag.png') no-repeat;
          background-size: cover;
          vertical-align: top;
          margin-right: .2rem;
        }
      }
      .desc{
        font-family: PingFangSC-Medium;
        font-size: .34rem;
        color: #FFFFFF;
        letter-spacing: .005rem;
        padding-top: .25rem;
      }
      .card{
        width: 5.54rem;
        height: 3.2rem;
        margin: .5rem auto 0;
      }
    }
    .text{
      font-family: PingFangSC-Regular;
      font-size: .54rem;
      color: #FFFBBF;
      letter-spacing: .008rem;
      text-align: center;
      padding: .8rem;
    }
    .toList{
      width: 4.88rem;
      height: .86rem;
      line-height: .86rem;
      text-align: center;
      font-weight: bold;
      margin: auto;
      font-family: PingFangSC-Semibold;
      font-size: .4rem;
      letter-spacing: .016rem;
      border-radius: .5rem;
      position: relative;
      background-image: linear-gradient(0deg, #F38E10 0%, #FCD926 100%);
      text-shadow: 0 .02rem .12rem #D28307;
      color: #9B510F;
      &::before{
        content: '';
        width: 5rem;
        height: .98rem;
        background: linear-gradient(0deg, #FF8C05 0%, #FFF009 100%);
        position: absolute;
        left: -.06rem;
        top: -.06rem;
        right: -.06rem;
        bottom: -.06rem;
        border-radius: .5rem;
        z-index: -1;
        box-shadow: 0 .06rem 0 0 rgba(0,0,0,0.14);
      }
    }
  }
</style>

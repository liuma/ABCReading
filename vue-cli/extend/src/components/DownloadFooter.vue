<template>
  <div class="download_box">
    <div class="logo"></div>
    <p>ABC Reading<br>美国小学图书馆
    </p>
    <div class="btn" @click="download">立即下载</div>
  </div>
</template>

<script>
export default {
  name: 'download',
  data () {
    return {
      msg: '我是体验页'
    }
  },
  methods: {
    getList () {
      console.log(this.$axios)
    },
    download()
    {
      window.location.href = "http://www.abctime.com/download.html"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .download_box {
    width: 100%;
    height: 1.18rem;
    line-height: 1.18rem;
    background: rgba(17,129,193,1);
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 101;
    p {
      text-align: left;
      font-size: .28rem;
      color: #FFFFFF;
      letter-spacing: .012rem;
      line-height: .4rem;
      padding: .16rem 0 0 1.56rem;
    }
    .logo {
      width: .9rem;
      height: .93rem;
      background: url('../assets/imgs/logo_ft.png');
      background-size: cover;
      position: absolute;
      top: .11rem;
      left: .35rem;
    }
    .btn {
      width: 2rem;
      height: .7rem;
      text-align: center;
      background: #FFCE65;
      box-shadow: 0 .04rem 0 0 rgba(0, 0, 0, 0.25);
      border-radius: .5rem;
      font-family: PingFangSC-Semibold;
      font-weight: bold;
      font-size: .28rem;
      color: #FFFFFF;
      letter-spacing: .012rem;
      line-height: .7rem;
      text-shadow: 0 .05rem .1rem #EDA50A;
      position: absolute;
      right: .53rem;
      top: .27rem;
    }
  }
</style>

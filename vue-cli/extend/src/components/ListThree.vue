<template>
  <div class="listThree">
    <div class="hd"></div>
    <div class="title_box">
      <div class="title">{{content.title}}</div>
    </div>
    <div class="video_wrap">
      <div class="video_mask">
        <video ref="video" :src="videoSrc" webkit-playsinline="" playsinline="" x5-playsinline="" x-webkit-airplay="allow" controls class="video"></video>
      </div>
    </div>
    <p class="video_tip">（视频内容来源于网络）</p>
    <div class="title_box">
      <div class="title">亲子互动指导</div>
    </div>
    <ul class="content_box">
      <li v-for="con in content.list">
        {{con}}
      </li>
    </ul>
  </div>
</template>

<script>
  import Con from "../utils/content"
  export default {
    name: 'list.two',
    data () {
      return {
        content:{
          "title": "",
          "list":[]
        },
        videoSrc:""
      }
    },
    mounted(){
      let info = Con.nueContent.part3;
      if(info.length >= this.$route.query.ind){
        let ind = this.$route.query.ind-1;
        this.content = info[ind];
        this.$refs.video.src = info[ind].videoSrc
      }
    },
    methods:{
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .listThree{
    background: #57CDE9;
    min-height: 100vh;
    .hd{
      width: 100%;
      height: 1.45rem;
      background: url('../assets/imgs/part3_hd.png');
      background-size: cover;
    }
    .title_box{
      position: relative;
      z-index: 3;
      margin-top: .37rem;
      &::before{
        content: '';
        width: 7rem;
        height: .02rem;
        background: #FE6F49;
        position: absolute;
        top: .24rem;
        left: .25rem;
        z-index: -1;
      }
      .title{
        z-index: 3;
        display: inline-block;
        padding: 0 .5rem;
        height: .5rem;
        line-height: .5rem;
        background: #FF781B;
        border-radius: .29rem;
        font-family: PingFangSC-Semibold;
        font-size: .28rem;
        color: #FFFFFF;
        letter-spacing: .005rem;
        text-align: center;
      }
    }
    .video_wrap{
      width: 6.7rem;
      background: #FFFFFF;
      box-shadow: 0 .06rem 0 0 rgba(0,0,0,0.10);
      border-radius: .2rem;
      margin: auto;
      margin-top: .55rem;
      padding: .15rem .15rem .1rem;
      .video_mask{
        border-radius: .2rem;
        overflow: hidden;
        padding: 0;
        .video{
          width: 6.7rem;
        }
      }
    }
    .video_tip{
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: .24rem;
      color: #4A4A4A;
      letter-spacing: 0;
      padding-top: .1rem;
    }
    .content_box{
      margin-top: .4rem;
      width: 6.7rem;
      padding-left: .5rem;
      text-align: left;
      font-family: PingFangSC-Regular;
      font-size: .24rem;
      color: #4A4A4A;
      letter-spacing: 0;
      line-height: .4rem;
      padding-bottom: .4rem;
    }
  }
</style>

<template>
  <div class="listOne">
    <div class="hd"></div>
    <div class="title_box">
      <div class="title">今日主题：{{content.title}}</div>
    </div>
    <div class="desc">{{content.desc}}</div>
    <div class="parent_box">
      <div class="parent_icon"></div>
      <ul>
        <li v-for="(p,$index) in content.parent" class="con_li li_parent">
          <div :class="{'audio_icon_active':p.active,'audio_icon':!p.active}" @click="setSrc(p.audioSrc,p,$index)">
            <div v-if="p.active" class='list_play_tag spinner'><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div></div>
            <span v-else class="icon"></span>
          </div>
          <div class="icon_left"></div>
          <div class="con">
            <p class="sentence">{{p.sentence}}</p>
            <p class="translate">{{p.translate}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="child_box">
      <div class="child_icon"></div>
      <ul>
        <li v-for="(c,$index) in content.child" class="con_li li_child">
          <div :class="{'audio_icon_active':c.active,'audio_icon':!c.active}" @click="setSrc(c.audioSrc,c,$index)">
            <div v-if="c.active" class='list_play_tag spinner'><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div></div>
            <span v-else class="icon"></span>
          </div>
          <div class="icon_right"></div>
          <div class="con">
            <p class="sentence">{{c.sentence}}</p>
            <p class="translate">{{c.translate}}</p>
          </div>
        </li>
      </ul>
    </div>
    <audio id="myAudio" ref='audio' :src="audioSrc" @ended="stopAudio"></audio>
  </div>
</template>

<script>
import Con from "../utils/content"
import Vue from 'vue'
export default {
  name: 'list.one',
  data () {
    return {
      content:{
        "title": "",
        "desc": "",
        "parent": [],
        "child": []
      },
      audioSrc:""
    }
  },
  mounted(){
    let info = Con.nueContent.part1;
    if(info.length >= this.$route.query.ind){
      let ind = this.$route.query.ind-1;
      this.content = info[ind];
    }
  },
  methods:{
    setSrc(audioSrc,item,index){
      this.$refs.audio.src = audioSrc
      this.playAudio();
      this.$nextTick(function () {
        this.stopAudio()
        Vue.set(item,'active',true);
      });
    },
    playAudio(){
      let videoPlayer = this.$refs.audio
      if(videoPlayer.paused){
        videoPlayer.play();
      }else{
        videoPlayer.pause();
      }
    },
    stopAudio(){
      this.content.parent.forEach(function (item) {
        Vue.set(item,'active',false);
      });
      this.content.child.forEach(function (item) {
        Vue.set(item,'active',false);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .listOne{
    background: #FCD152;
    min-height: 100vh;
    .hd{
      width: 100%;
      height: 1.45rem;
      background: url('../assets/imgs/part1_hd.png');
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
    .desc{
      width: 6.72rem;
      text-align: left;
      margin: .35rem auto 0;
      font-family: PingFangSC-Regular;
      font-size: .24rem;
      color: #9F6139;
      letter-spacing: 0;
      line-height: .4rem;
    }
    .parent_box{
      position: relative;
      ul{
        width: 6rem;
        padding-left: 1.26rem;
      }
      .parent_icon{
        width: .88rem;
        height: .88rem;
        background: url('../assets/imgs/part1_parent.png');
        background-size: cover;
        position: absolute;
        top: .22rem;
        left: .22rem;
      }
    }
    .child_box{
      position: relative;
      margin-top: .4rem;
      ul{
        width: 6rem;
        padding: 0 0 .4rem .22rem;
      }
      .child_icon{
        width: .88rem;
        height: .88rem;
        background: url('../assets/imgs/part1_child.png');
        background-size: cover;
        position: absolute;
        top: .22rem;
        right: .22rem;
      }
    }
    .con_li{
      width: 6rem;
      padding: .15rem 0;
      margin-top: .2rem;
      background: #fff;
      border-radius: .2rem;
      line-height: .4rem;
      position: relative;
      .audio_icon{
        width: .44rem;
        height: .44rem;
        border-radius: 50%;
        background: #FF781B;
        position: absolute;
        left: .25rem;
        top: calc(~'50% - .22rem');
        .icon{
          display: inline-block;
          vertical-align: middle;
          width: .24rem;
          height: .2rem;
          background: url('../assets/imgs/part1_audio.png');
          background-size: cover;
        }
      }
      .audio_icon_active{
        width: .44rem;
        height: .44rem;
        border-radius: 50%;
        background: #75BE44 ;
        position: absolute;
        left: .25rem;
        top: calc(~'50% - .22rem');
        .icon{
          display: inline-block;
          vertical-align: middle;
          width: .24rem;
          height: .2rem;
          background: url('../assets/imgs/part1_current.png');
          background-size: cover;
        }
      }
      .con{
        width: 4.8rem;
        margin-left: 1.2rem;
        text-align: left;
        p{
          width: 4.6rem;
          &.sentence{
            font-family: PingFangSC-Medium;
            font-weight: bold;
            font-size: .28rem;
            color: #56536C;
            letter-spacing: 0;
          }
          &.translate{
            font-family: PingFangSC-Regular;
            font-size: .24rem;
            color: #9796A4;
          }
        }
      }
      .icon_left{
        width: .14rem;
        height: .32rem;
        background: url('../assets/imgs/part1_left.png');
        background-size: cover;
        position: absolute;
        left: -.13rem;
        top: calc(~'50% - .16rem');
      }
      .icon_right{
        width: .14rem;
        height: .32rem;
        background: url('../assets/imgs/part1_right.png');
        background-size: cover;
        position: absolute;
        right: -.13rem;
        top: calc(~'50% - .16rem');
      }
    }
    .list_play_tag {
      margin: auto;
      width: .3rem;
      height: .18rem;
      text-align: center;
      font-size: 10px;
      position: absolute;
      left: .07rem;
      top: .1rem;
    }
    .list_play_tag > div {
      background: #FFFFFF;
      height: 100%;
      width: .03rem;
      margin-right: .03rem;
      display: inline-block;
    }
    .spinner {
      margin: auto;
      width: .3rem;
      height: .18rem;
      text-align: center;
      font-size: 0px;
      /*position: absolute;*/
      /*right: .7rem;*/
    }
    .spinner > div {
      background: #FFF;
      height: 100%;
      width: .03rem;
      border-radius: .015rem;
      margin-right: .03rem;
      display: inline-block;
      -webkit-animation: stretchdelay .7s infinite ease-in;
      animation: stretchdelay .7s infinite ease-in;
    }
    .spinner .rect1{
      /*height: 40%;*/
    }
    .spinner .rect2 {
      -webkit-animation-delay: -.4s;
      animation-delay: -.4s;
    }
    .spinner .rect3 {
      -webkit-animation-delay: -.3s;
      animation-delay: -.3s;
    }
    .spinner .rect4 {
      -webkit-animation-delay: -0.2s;
      animation-delay: -0.2s;
    }
    @-webkit-keyframes stretchdelay {
      0%, 50%, 100% { -webkit-transform: scaleY(0.4) }
      25%,75% { -webkit-transform: scaleY(1.0) }
    }
    @keyframes stretchdelay {
      0%, 50%, 100% {
        transform: scaleY(0.4);
      }
      25%,75% {
        transform: scaleY(1.0);
      }
    }
  }
</style>

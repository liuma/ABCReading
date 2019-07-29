<template>
  <div class="listTwo">
    <div class="hd"></div>
    <div class="title_box">
      <div class="title">{{content.title}} —{{content.level}}级别</div>
    </div>
    <div class="words_box">
      <ul>
        <li v-for="(word,$index) in content.wordList" class="word_li" @click="setSrc(word.audio_path,word,$index)">
          <div :class="{'audio_icon_active':word.active,'audio_icon':!word.active}">
            <div v-if="word.active" class='list_play_tag spinner'><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div></div>
            <span v-else class="icon"></span>
          </div>
          <img :src="word.pic_path" class="pic">
          <p class="name">{{word.name}}</p>
        </li>
      </ul>
    </div>
    <div class="title_box">
      <div class="title">精读拓展Tips</div>
    </div>
    <div class="second_box">
      <ul class="tips_box">
        <li v-for="(tip,index) in content.tipList" class="tip_li">
          <div class="title"><span class="index">{{index+1}}</span>{{tip.title}}</div>
          <p v-if="tip.content" class="content_txt">{{tip.content}}</p>
          <ul>
            <li v-for="pa in tip.paragraph0">
              <p class="content_txt">{{pa}}</p>
            </li>
          </ul>
          <ul v-if="tip.list0" class="qa_box">
            <li v-for="q in tip.list0">
              <p class="qa_ques">{{q.ques}}</p>
              <p class="qa_ans">{{q.ans}}</p>
              <ul>
                <li v-for="an in q.ansList">
                  <p class="qa_ans">{{an}}</p>
                </li>
              </ul>
            </li>
          </ul>
          <ul>
            <li v-for="para in tip.paragraph">
              <p class="content_txt content_txt2">{{para}}</p>
            </li>
          </ul>
          <img v-if="tip.pic" :src="tip.pic" class="content_pic">
          <ul>
            <li v-for="par in tip.para2">
              <p class="content_txt content_txt2">{{par}}</p>
            </li>
          </ul>
          <ul v-if="tip.list" class="qa_box">
            <li v-for="qa in tip.list">
              <p class="qa_ques">{{qa.ques}}</p>
              <p class="qa_ans">{{qa.ans}}</p>
              <ul>
                <li v-for="a in qa.ansList">
                  <p class="qa_ans">{{a}}</p>
                </li>
              </ul>
            </li>
          </ul>
          <ul>
            <li v-for="pe in tip.paraend">
              <p class="content_txt">{{pe}}</p>
            </li>
          </ul>
          <div class="worksheets_box">
            <ul class="ws_list">
              <li v-for="ws in tip.ws_content" class="ws_li">
                <p class="ws_hd">{{ws.hd}}</p>
                <p class="ws_bd">{{ws.bd}}</p>
                <img class="ws_pic" :src="ws.pic" alt="">
                <p v-show="ws.pic" class="ws_pic_tag">长按保存图片</p>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <audio id="myAudio" ref='audio' :src="audioSrc" @ended="stopAudio"></audio>
  </div>
</template>

<script>
  import Con from "../utils/content"
  import Vue from "vue"
  export default {
    name: 'list.two',
    data () {
      return {
        content:{
          "title": "",
          "level": "",
          "wordList": [],
          "tipList": []
        },
        audioSrc:""
      }
    },
    mounted(){
      let info = Con.nueContent.part2;
      if(info.length >= this.$route.query.ind){
        let ind = this.$route.query.ind-1;
        this.content = info[ind];
      }
    },
    methods:{
      setSrc(audioSrc,item,$index){
        this.$refs.audio.src = audioSrc
        this.playAudio()
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
        this.content.wordList.forEach(function (item) {
          Vue.set(item,'active',false);
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .listTwo{
    background: #FEA85F;
    min-height: 100vh;
    padding-bottom: .5rem;
    .hd{
      width: 100%;
      height: 1.45rem;
      background: url('../assets/imgs/part2_hd.png');
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
    .words_box{
      ul{
        text-align: left;
        font-size: 0;
        margin: .48rem auto .6rem;
        width: 7.2rem;
        .word_li{
          display: inline-block;
          width: 2.2rem;
          height: 2.8rem;
          background: #fff;
          border-radius: .2rem;
          margin: .24rem .1rem 0;
          text-align: center;
          position: relative;
          .pic{
            width: 1.6rem;
            height: auto;
            max-height: 1.96rem;
            border-radius: .1rem;
            margin: .11rem;
          }
          p{
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            font-size: .3rem;
            color: #56536C;
            letter-spacing: .018rem;
            line-height: .28rem;
            padding-top: .1rem;
          }
          .audio_icon{
            width: .44rem;
            height: .44rem;
            line-height: .44rem;
            border-radius: 50%;
            background: #FF781B;
            position: absolute;
            right: .23rem;
            top: .2rem;
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
            line-height: .44rem;
            border-radius: 50%;
            background: #75BE44 ;
            position: absolute;
            right: .23rem;
            top: .2rem;
            .icon{
              display: inline-block;
              vertical-align: middle;
              width: .24rem;
              height: .2rem;
              background: url('../assets/imgs/part1_current.png');
              background-size: cover;
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
      }
    }
    .second_box{
      width: 7rem;
      border-radius: .2rem;
      background: #fff;
      margin: .48rem auto 0;
      padding: .35rem 0;
      .tips_box{
        margin: auto;
        .tip_li{
          .title{
            text-align: left;
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            font-size: .3rem;
            color: #3C85FF;
            padding: .28rem 0 .1rem .44rem;
            span{
              display: inline-block;
              width: .34rem;
              height: .34rem;
              margin-right: .13rem;
              vertical-align: top;
              line-height: .34rem;
              text-align: center;
              background: #FFE1BA;
              border-radius: 50%;
              font-family: PingFangSC-Semibold;
              font-size: .24rem;
              color: #FEA85F;
            }
          }
          .content_txt{
            width: 6rem;
            margin: auto;
            font-family: PingFangSC-Regular;
            font-size: .24rem;
            color: #56536C;
            letter-spacing: 0;
            text-align: justify;
            line-height: .4rem;
            &.content_txt2{
              padding-top: .2rem;
            }
          }
          .content_pic{
            width: 6.36rem;
            margin: auto;
          }
          .qa_box{
            width: 6.2rem;
            background: #FFFCF8;
            border-radius: .2rem;
            text-align: left;
            padding: .1rem 0;
            margin: .2rem auto;
            .qa_ques{
              width: 5.2rem;
              margin: auto;
              font-family: PingFangSC-Medium;
              font-size: .28rem;
              color: #FF6565;
              letter-spacing: 0;
              line-height: .4rem;
              padding-top: .1rem;
              position: relative;
              &::before{
                content: "";
                width: .08rem;
                height: .08rem;
                background: #FF6565;
                border-radius: 50%;
                position: absolute;
                left: -.25rem;
                top: .25rem;
              }
            }
            .qa_ans{
              width: 5.2rem;
              margin: auto;
              font-family: PingFangSC-Regular;
              font-size: .18rem;
              color: #56536C;
              letter-spacing: 0;
              line-height: .4rem;
            }
          }
          .worksheets_box{
            width: 6.36rem;
            margin: auto;
            text-align: left;
            .ws_list{
              font-family: PingFangSC-Regular;
              font-size: .24rem;
              letter-spacing: 0;
              text-align: justify;
              line-height: .4rem;
              color: #262300;
              .ws_hd{
                width: 6rem;
                padding: .33rem 0 0 .18rem;
                color: #FEA85F;
              }
              .ws_bd{
                width: 6rem;
                padding-left: .18rem;
              }
              .ws_pic{
                width: 100%;
                margin: auto;
              }
              .ws_pic_tag{
                font-family: PingFangSC-Regular;
                font-size: .24rem;
                color: #FF6565;
                letter-spacing: 0;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
</style>

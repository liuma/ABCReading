<template>
  <div class="game" id="game">
    <div class="game_back" @click="back()"></div>
    <div class="game_play_btn" v-show="page<3" @click="playAudio(gameArr[page].title)"></div>
    <audio id="audio" ref="audio" class="Hidden" preload :src="titleSrc" autoplay controls></audio>
    <div class="game_que_box" id="game_que_box">
      <ul>
        <li :class="$index<3?'default_1':'default_2'" v-for="(item,$index) in gameArr" v-show="$index <= page">
          <div class="game_icon_a" v-show="$index==page-1"></div>
          <div class="img_wrap" v-if="$index>=3 && $index==page">
            <img :src="item.title">
          </div>
        </li>
      </ul>
    </div>
    <div class="game_ans_box" v-for="(item,$index) in gameArr" v-show="$index == page">
      <div v-if="$index < 3">
        <v-touch class="drag_img drag_img1 drag1" :style="{top:imgTop1+'px',left:imgLeft1+'px'}"
                 v-on:panstart="startDrag" v-on:panend="endDrag" v-on:panmove="ingDrag" :flag="item.answer[0].is_answer"
        >
          <img :src="item.answer[0].content.path">
        </v-touch>
        <v-touch class="drag_img drag_img2 drag2" :style="{top:imgTop2+'px',left:imgLeft2+'px'}"
                 v-on:panstart="startDrag" v-on:panend="endDrag" v-on:panmove="ingDrag" :flag="item.answer[1].is_answer"
        >
          <img :src="item.answer[1].content.path">
        </v-touch>
      </div>
      <div v-else>
        <v-touch class="drag_sen drag_sen1 drag3" :style="{top:senTop1+'px',left:senLeft1+'px'}"
                 v-on:panstart="startDrag" v-on:panend="endDragSen" v-on:panmove="ingDrag" :flag="item.answer[0].is_answer"
        ><span class="icon" @click="playAudio(item.answer[0].content.path)"></span>{{item.answer[0].content.subtitles}}
        </v-touch>
        <div class="touch_wrap twp1"></div>
        <v-touch class="drag_sen drag_sen2 drag4" :style="{top:senTop2+'px',left:senLeft2+'px'}"
        v-on:panstart="startDrag" v-on:panend="endDragSen" v-on:panmove="ingDrag" :flag="item.answer[1].is_answer"
        ><span class="icon" @click="playAudio(item.answer[1].content.path)"></span>{{item.answer[1].content.subtitles}}
        </v-touch>
        <div class="touch_wrap twp2"></div>
      </div>
    </div>
    <div class="game_ans_box" v-show="page>4" v-for="item in gameArr">
      <div class="drag_sen drag_sen1 drag3" :style="{top:senTop1+'px',left:senLeft1+'px'}" v-show="!gameArr[4].answer[0].is_answer"
      ><span class="icon"></span>{{gameArr[4].answer[0].content.subtitles}}
      </div>
      <div class="touch_wrap twp1"></div>
      <div class="drag_sen drag_sen2 drag4" :style="{top:senTop2+'px',left:senLeft2+'px'}" v-show="!gameArr[4].answer[1].is_answer"
      ><span class="icon"></span>{{gameArr[4].answer[1].content.subtitles}}
      </div>
      <div class="touch_wrap twp2"></div>
    </div>
  </div>
</template>
<script scoped>
  export default {
    name: 'Part3',
    data () {
      return {
        imgTop1:0,
        imgLeft1:0,
        imgTop2:0,
        imgLeft2:0,

        senTop1:0,
        senLeft1:0,
        senTop2:0,
        senLeft2:0,

        posX:0,
        posY:0,
        quizArr:[
          {
            title:''
          }
        ],
        gameArr:[],
        page:0,
        titleSrc:''
      }
    },
    mounted(){
      this.setData()
    },
    methods: {
      back(){
        let id = this.$route.query.id;
        this.$router.replace({name:'Part',query:{id:id}})
      },
      setData(){
        let conObj = JSON.parse(window.localStorage.getItem('musicalContent'));
        this.gameArr = conObj.game;
        // this.playTitleAudio(this.gameArr[0].title);
        this.autoPlayTitleAudio(this.gameArr[0].title);
      },
      playTitleAudio(src){
        let media = document.querySelector('audio')
        this.titleSrc = src;
        if(this.$common.VL.isIpad()||this.$common.VL.isIphone()){
          wx.ready(function(){
            media.play();
          });
        }else {
          media.play();
        }
      },
      autoPlayTitleAudio(src){
        let music = document.getElementById('audio');
        music.src = src;
        let _that = this;
        if (window.WeixinJSBridge) {
          window.WeixinJSBridge.invoke('getNetworkType', {}, (res) => {
            // _that.$refs.audio.load()
          setTimeout(() => {
            _that.$refs.audio.play()
        }, 300)
        })
        } else {
          document.addEventListener('WeixinJSBridgeReady', () => {
            window.WeixinJSBridge.invoke('getNetworkType', {}, (res) => {
            // _that.$refs.audio.load()
          setTimeout(() => {
            _that.$refs.audio.play()
        }, 300)
        })
        }, false)
        }
      },
      startDrag (args) {
        let className = args.target.className;
        console.log(className)
        if(className.indexOf('drag1')>=0){
          this.posX = this.imgLeft1;
          this.posY = this.imgTop1;
        }else if(className.indexOf('drag2')>=0){
          this.posX = this.imgLeft2;
          this.posY = this.imgTop2;
        }else if(className.indexOf('drag3')>=0){
          this.posX = this.senLeft1;
          this.posY = this.senTop1;
        }else if(className.indexOf('drag4')>=0){
          this.posX = this.senLeft2;
          this.posY = this.senTop2;
        }
      },
      ingDrag (args) {
        let className = args.target.className;
        if(className.indexOf('drag1')>=0){
          this.imgLeft1 = this.posX + args.deltaX;
          this.imgTop1 = this.posY + args.deltaY;
        }else if(className.indexOf('drag2')>=0){
          this.imgLeft2 = this.posX + args.deltaX;
          this.imgTop2 = this.posY + args.deltaY;
        }else if(className.indexOf('drag3')>=0){
          this.senLeft1 = this.posX + args.deltaX;
          this.senTop1 = this.posY + args.deltaY;
        }else if(className.indexOf('drag4')>=0){
          this.senLeft2 = this.posX + args.deltaX;
          this.senTop2 = this.posY + args.deltaY;
        }
      },
      endDrag (args) {
        let flag = parseInt(args.target.attributes.flag.value);
        let className = args.target.className;
        let p = this.page;
        let currentLeft = args.target.offsetLeft;
        let currentTop = args.target.offsetTop;
        let targetLeft = document.getElementsByClassName('default_1')[p].offsetLeft - document.getElementById('game').scrollLeft
        let targetWidth = document.getElementsByClassName('default_1')[p].offsetWidth
        let targetTop = document.getElementsByClassName('default_1')[p].offsetTop
        let targetHeight = document.getElementsByClassName('default_1')[p].offsetHeight
        if((currentLeft>targetLeft-currentLeft)
          && (currentLeft<targetLeft+targetWidth)
          && (currentTop>targetTop-1/2*targetHeight)
          && (currentTop<targetTop+3/2*targetHeight)
          && flag>0
        ){
          this.playAudio('https://qnfile.abctime.com/right.mp3');
          if(className.indexOf('drag1')>=0){
            // this.imgLeft1 = this.posX + args.deltaX;
            // this.imgTop1 = this.posY + args.deltaY;
            this.imgLeft1 = this.posX + args.deltaX - (currentLeft-targetLeft);
            this.imgTop1 = this.posY + args.deltaY - (currentTop-targetTop);
            let _that = this;
            setTimeout(function () {
              document.getElementsByClassName('default_1')[p].className = 'default_1 active'
              _that.imgLeft1 = 0;
              _that.imgTop1 = 0;
              _that.page++;
              _that.autoPlayTitleAudio(_that.gameArr[_that.page].title);
              document.getElementById('game').scrollLeft += 500;
            },2000)
          }else if(className.indexOf('drag2')>=0){
            // this.imgLeft2 = this.posX + args.deltaX;
            // this.imgTop2 = this.posY + args.deltaY;
            this.imgLeft2 = this.posX + args.deltaX - (currentLeft-targetLeft);
            this.imgTop2 = this.posY + args.deltaY - (currentTop-targetTop);
            let _that = this;
            setTimeout(function () {
              document.getElementsByClassName('default_1')[p].className = 'default_1 active'
              _that.imgLeft2 = 0;
              _that.imgTop2 = 0;
              _that.page++;
              _that.playTitleAudio(_that.gameArr[_that.page].title)
              document.getElementById('game').scrollLeft += 500;
            },2000)
          }
        }else {
          this.playAudio('https://qnfile.abctime.com/wrong.mp3');
          this.imgLeft1 = 0;
          this.imgTop1 = 0;
          this.imgLeft2 = 0;
          this.imgTop2 = 0;
        }
      },
      endDragSen (args) {
        let flag = parseInt(args.target.attributes.flag.value);
        let className = args.target.className;
        let p = this.page - 3;
        let currentLeft = args.target.offsetLeft;
        let currentTop = args.target.offsetTop;
        let targetLeft = document.getElementsByClassName('default_2')[p].offsetLeft - document.getElementById('game').scrollLeft
        let targetWidth = document.getElementsByClassName('default_2')[p].offsetWidth
        let targetTop = document.getElementsByClassName('default_2')[p].offsetTop
        let targetHeight = document.getElementsByClassName('default_2')[p].offsetHeight
        if((currentLeft>targetLeft-currentLeft)
          && (currentLeft<targetLeft+targetWidth)
          && (currentTop>targetTop-1/2*targetHeight)
          && (currentTop<targetTop+3/2*targetHeight)
          && flag>0
        ){
          this.playAudio('https://qnfile.abctime.com/right.mp3');
          if(className.indexOf('drag3')>=0){
            this.senLeft1 = this.posX + args.deltaX - (currentLeft-targetLeft);
            this.senTop1 = this.posY + args.deltaY - (currentTop-targetTop);
            let _that = this;
            setTimeout(function () {
              document.getElementsByClassName('default_2')[p].className = 'default_2 active'
              _that.senLeft1 = 0;
              _that.senTop1 = 0;
              _that.page++;
              if(_that.page==5){
                _that.activeGame()
              }
            },2000)
          }else if(className.indexOf('drag4')>=0){
            this.playAudio('https://qnfile.abctime.com/right.mp3');
            this.senLeft2 = this.posX + args.deltaX - (currentLeft - targetLeft);
            this.senTop2 = this.posY + args.deltaY - (currentTop - targetTop);
            let _that = this;
            setTimeout(function () {
              document.getElementsByClassName('default_2')[p].className = 'default_2 active'
              _that.senLeft2 = 0;
              _that.senTop2 = 0;
              _that.page++;
              if(_that.page==5){
                _that.activeGame()
              }
            },2000)
          }
        }else {
          this.playAudio('https://qnfile.abctime.com/wrong.mp3');
          this.senLeft1 = 0;
          this.senTop1 = 0;
          this.senLeft2 = 0;
          this.senTop2 = 0;
        }
      },
      playAudio(src){
        let audio = document.querySelector('#audio');
        audio.src = src;
        audio.play()
      },
      activeGame(){
        let member_id = localStorage.getItem('extendAbcMemberid'),lesson_id=this.$route.query.id;
        let wUrl = this.$common.config.gzhUrl + "v3/marketingcourse/course/lesson-location"
        let fd = this.$common.getParam('get', {course_id:2,member_id: member_id,lesson_id:lesson_id,location:3});
        let _that = this;
        this.$axios.get(wUrl+'?'+fd).then((res) => {
          if(res.data.code == 200){
          if(res.data.data.is_finish){
            let len = parseInt(localStorage.getItem('extendAbcLength'))
            if(lesson_id == len){
              this.$router.push({name:'End'})
            }else{
              let les = 'extendAbcFinish'+lesson_id;
              if(!localStorage.getItem(les)){
                this.showFinish = true
                this.next_id = parseInt(lesson_id)+1
                localStorage.setItem(les,true)
              }
            }
          }
          _that.$router.replace({name:'Transition',query:{id:_that.$route.query.id,part:4}})
        }
      })
      },
    }
  }
</script>

<style scoped lang="less">
  .game{
    width: 100vw;
    height: 100vh;
    position: relative;
    background: #A0EFFF;
    overflow-x: scroll;
    /*overflow: hidden;*/
    .game_back{
      position: fixed;
      width: .54rem;
      height: .59rem;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA7CAMAAAAHBYkxAAAAz1BMVEUAAACtXSfsgDmsXCfadjSsWyesWyjtgTzlfDfsgDnHay/sgDmrXCjsgDnrgDnsgDqsXCjsgDmsXCjrgDmsWyfsgDqsXSntgDnsgDvsgTqtWyjrgTutXCjtgTutXinrgTvugj6wYCjwgz6yXS7/qlXScDKrWyjrfzm4YyzrfzmrWyf////1wqH87ePtjE27ZCzmfDfScDH98ergeTXDaC70uZPtkFS0YCn76t741L330Lfyq33++PX75dfwoW3528jvmmPulFrrgTvxpnXsiUiyFroIAAAAKXRSTlMAQOzs/t2WP/z5/fv639rLy7+/tradnZiUbW1nZ1dXQS0tISED/Pnv7wOIpW0AAAIjSURBVEjHndXpeppQEIDhYRfjHpdo3DXLDE0ApcUtpml7/9dUKDYpnI3m++vzPnM2FXjNh4N2XXddvd4eDOdQKqenYy695yjRpIGcGhMpmjVRUHMmRMtrlHS9FGxKR2k6d4u3Lipybxm0vsES3awLLFNqV1ghliy3Tscty1znQy2FZ/hzvz8XzvPjHoT39cVLOhbu7/1tSJW3w3yzC2tKlbcpvrNMTeTKO2Ch7F035OrpF/N9SJWjUM/I5CSsp1JsvYTpKsWmA8zVim0OQ7ViG8JArdgG0FYrtjbUsdCrWmEdHtSz2B7gCvNtWMV2JWKbb3JWwXxfvRKuwjA8qF3CTMT/n2fCHX7C3UEVxe7lh4BV4REl7ruAPYIVcJ2UBRZ0QhS6nWCRYQdsH7kdn06vyZG8vSGbb8OItijs+SU5F+aZbWkEC4rEbO8l7bFQRAsAQzLulLITM8wAgD75Qrbj/Zj71E+YRmSK2JHz12ESaZBkURyI3PlwOBfuLCYL0qZEPpbOJ5rCn1pEUVkVEbUgSyOisJwKKd3ZpW7BSVUX/rYyiCgqtUIyVvCeViMiP5CjwCeimgb/NKak2JQpM6akMeSyKc3fitDWpzQb8q0zR9GWiyLK1BqKjWuUTQyDwp5CP/ukNgZOmkGX4mpoVoIEVMywGtMlQwNuqy5J6q5AlNYSoZYGsqYWD1lTUKX1jbwx+hqUajGyO5Zxf29YHXu0AE6/AZNVmZgnIaFjAAAAAElFTkSuQmCC');
      background-size: cover;
      top: .18rem;
      left: .23rem;
    }
    .game_play_btn{
      width: .58rem;
      height: .58rem;
      background: url('data:image/png;base64,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');
      background-size: cover;
      position: fixed;
      top: .23rem;
      right: .32rem;
    }
    .game_que_box{
      width: 16.2rem;
      height: calc(~'100vh - 1.8rem');
      background: url('../../assets/imgs/game_bg.png') no-repeat;
      background-size: auto 100%;
      z-index: 4;
      background-color: #A0EFFF;
      /*position: absolute;*/
      /*top: 0;*/
      /*left: 0;*/
      li{
        width: 1.64rem;
        height: 1.44rem;
        margin: .08rem;
        background: rgba(46,100,158,.8);
        border-radius: .2rem;
        position: absolute;
        z-index: 4;
        &.default_1{
          &::before{
            display: block;
            content: '';
            width: 1.42rem;
            height: 1.22rem;
            border-radius: .17rem;
            border: .04rem dotted #C0E3F6;
            margin: .07rem auto;
          }
          &.active{
            &::before{
              display: none;
            }
            width: 1.8rem;
            height: 1.6rem;
            margin: 0 0;
            background: url('../../assets/imgs/game_ed_bg1.png') no-repeat;
            background-size: cover;
            img{
              display: none;
            }
            .game_icon_a{
              display: block;
              bottom: 1.55rem;
              left: .2rem;
            }
          }
        }
        .game_icon_a{
          width: 1.26rem;
          height: 1.48rem;
          background: url('../../assets/imgs/game_icon_a.png');
          background-size: cover;
          position: absolute;
          display: none;
        }
        &.default_2{
          width: 3.2rem;
          height: 1rem;
          background: none;
          /*position: relative;*/
          .img_wrap{
            width: 1.64rem;
            height: 1.44rem;
            border-radius: .2rem;
            box-shadow: 0 .02rem .04rem #000;
            background: #fff;
            position: absolute;
            bottom: .9rem;
            left: .78rem;
            z-index: -4;
            img{
              width: 1.46rem;
              height: 1.2rem;
              margin: .14rem auto;
            }
          }
          &::after{
            display: block;
            content: '';
            width: 2.98rem;
            height: .78rem;
            border-radius: .17rem;
            border: .04rem dotted #C0E3F6;
            margin: .07rem auto;
            z-index: 4;
            position: relative;
          }
          &::before{
            display: block;
            content: '';
            width: 100%;
            height: 100%;
            border-radius: .17rem;
            position: absolute;
            top: 0;
            left: 0;
            background: rgba(46,100,158,.8);
            z-index: 3;
          }
          &.active{
            &::before,&::after{
              display: none;
            }
            width: 3.36rem;
            height: 1.16rem;
            margin: 0 0;
            background: url('../../assets/imgs/game_ed_bg2.png') no-repeat;
            background-size: cover;
            img{
              display: none;
            }
            .game_icon_a{
              display: block;
              bottom: 1.1rem;
              left: 1rem;
            }
          }
        }

        &:nth-child(1){
          bottom: 2.32rem;
          left: .4rem;
        }
        &:nth-child(2){
          left: 3.6rem;
          bottom: 3.05rem;
        }
        &:nth-child(3){
          left: 6.6rem;
          bottom: 2.16rem;
        }
        &:nth-child(4){
          left: 9.07rem;
          bottom: 3.12rem;
        }
        &:nth-child(5){
          left: 12.2rem;
          bottom: 1.9rem;
        }
      }
    }
    .game_ans_box{
      background: #2E649E;
      width: 100vw;
      height: 1.8rem;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 5;
      text-align: center;
      .drag_img{
        width: 1.64rem;
        height: 1.44rem;
        background: #F5EFE9;
        border-radius: .2rem;
        position: fixed;
        margin: calc(~'100vh - 1.65rem') .85rem 0 4.2rem;
        img{
          width: 1.46rem;
          height: 1.2rem;
          margin: .12rem auto;
          pointer-events: none;
        }
        &.drag_img2{
          margin: calc(~'100vh - 1.65rem') .85rem 0 7.5rem;
        }
      }
      .drag_sen{
        width: 3.6rem;
        height: 1rem;
        line-height: 1rem;
        background: #FFF;
        border-radius: .2rem;
        position: fixed;
        margin: 4.82rem .4rem 0 2.43rem;
        font-family: PingFangSC-Semibold;
        font-size: .26rem;
        color: #393939;
        letter-spacing: -.01rem;
        text-align: center;
        img{
          width: 1.46rem;
          height: 1.2rem;
          margin: .12rem auto;
          pointer-events: none;
        }
        .icon{
          display: inline-block;
          vertical-align: top;
          width: .36rem;
          height: .32rem;
          background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAgCAMAAABNTyq8AAAAe1BMVEUAAABy0wNx0wJy1AJx1AJy1AJx1ANy1QSI6Dhy1gV11gd75Bty1ANz1wVx1ANy1ANy1QNy1AJz1QJz1ANy1gNy1AJy1AJy1AJy1AJy1AJy1ANy1QJy1QNy1QNz1QR21AZx0wJx1QJy1AJ62gpx1AN01gR22Apx1Q5x0wLdU3QxAAAAKHRSTlMAV/v4zfOwiwQuIQm6NMSgl3xtTUrm4+Dc1adnYlo/Ke91cBiRRBoSMwyd9QAAAQ9JREFUOMud1OuOgjAQhuGRFkQEzwdQEXVP7/1f4U7ghxRs3ez8mZA8SdspX2VUl30+lzc1BXZhMk/QmgTNt6WPvhabsZkdcFAMq6HZxrgoB9auecAAfVjg2iPpihGSnxKqVORuIIoiE+GgYm8L0QZcRG6MS9EJzE7VEqyIeY222uJMD6y98SBVBhLtFs4SeZCcgay9ppMfpSXowGuwfiTLdt5XOAbQHZJ253EArZ+IPywXQCV6eJmA9aP6OQIvKm7dMBew8aEmBtOIZMDMdy1rbXWXi0q/zEuUVcetaDPw6P10nw7qKtUdHZwUbqIhmifjfO3iAdINsXwXKV0sT4dI4+GgIp+mgZj//8EIPz2/mxlTkCjukXkAAAAASUVORK5CYII=');
          background-size: cover;
          margin: .36rem .14rem 0 0;
        }
        &.drag_sen2{
          margin: 4.82rem .4rem 0 6.84rem;
        }
      }
      .touch_wrap{
        width: 3.6rem;
        height: 1rem;
        line-height: 1rem;
        background: #26588D;
        border-radius: .2rem;
        position: fixed;
        margin: .36rem .4rem 0 2.43rem;
        font-family: PingFangSC-Semibold;
        letter-spacing: 0;
        text-align: center;
        z-index: -1;
        &.twp2{
          margin: .36rem .4rem 0 6.84rem;
        }
      }

      li{
        display: inline-block;
        &.default_1{
          width: 1.64rem;
          height: 1.44rem;
          background: #F5EFE9;
          border-radius: .2rem;
          margin: .14rem .85rem;
        }
      }
    }
  }
</style>

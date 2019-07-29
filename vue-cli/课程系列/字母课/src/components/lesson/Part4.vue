<template>
  <div class="part3">
    <div class="back" @click="back()"></div>
    <ul class="song_list">
      <li v-for="(item,index) in songArr" :class="index == currentId?'active':''" :key="index">{{item.subtitle}}
        <div class="tag" v-show="index != currentId"></div>
        <div class="tag_active" v-show="index == currentId"></div>
        <div class="def_bg" v-show="index != currentId" :class="item.completed?'completed_bg':'inner_bg'">
          <div class="btn_box" @click="playAudio(index,item.letter_url,item.subtitle)"></div>
        </div>
        <!--{{item.completed}}-->

        <div class="ing_bg" v-show="index == currentId">
          <div class="btn_box" @click="pauseAudio(index,item.letter_url)">
            <div class='spinner'><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div></div>
          </div>
        </div>
      </li>
    </ul>
    <p class="song_txt">{{song_txt}}</p>
    <audio id="audio" ref="audio" class="Hidden" @ended="endAu()" :src="songUrl" controls @pause="onPause" @play="onPlay" @timeupdate="onTimeupdate"></audio>

    <div class="audio_box">
      <div class="progress_box">
        <div class="current_box" :style="'width:'+proLeft+'%'"></div>
        <div class="process" :style="'left:'+proLeft+'%'"></div>
        <span class="current_time">{{audio.currentTime}}</span>
        <span class="total_time">{{audio.duration}}</span>
      </div>
      <div class="record_box">
        <div class="btn_record"></div>
        <div class="start_record" @click="isRecord?stopRecord():startRecord()"></div>
        <div class="btn_repeat" @click="playVo()"></div>
      </div>
      <audio ref="perfectAudio" id="perfectAudio" src="https://qnfile.abctime.com/extend/audio/perfect_1.mp3" preload="auto" class="Hidden" controls></audio>
    </div>
    <perject :showState="perStatus"></perject>
    <div class="part4_guide" v-if="part4_guide">
      <div @click="hideGuide">知道了</div>
    </div>
    <div class="finish" v-if="showFinish" @click="showFinish = false">
      <div class="bg">
        <p class="txt1">Good job!</p>
        <p class="txt2">表现太棒了！</p>
        <div class="next" @click="next($event)"></div>
      </div>
    </div>
    <div class="hv_tip">
      <div class="icon"></div>
      <p>请旋转至横屏，体验更佳</p>
    </div>
  </div>
</template>

<script>
  import Perfect from './Perfect'
  export default {
    name: 'part4',
    components: {
      perject: Perfect,
    },
    data() {
      return {
        songArr: [],
        tagArr:[false,false,false,false,false,false,false,false],
        localIdArr: [],
        recordFlag:false,
        songUrl:'',
        song_txt:'',
        audio: {
          currentTime: '0:00',
          maxTime: 0,
          playing: false,
          muted: false,
          speed: 1,
          waiting: true,
          preload: 'auto',
          duration:'0:00'
        },
        currentId:-1,
        proLeft:0,
        localId:'',
        perStatus:false,
        isRecord:false,
        saveInd:0,
        part4_guide:false,
        showFinish:false
      }
    },
    mounted() {
      let guide = localStorage.getItem('extendAbcPart4Guide')
      if(!guide){
        this.part4_guide = true
      }else {
        this.part4_guide = false
      }
      this.setData(),
      this.localIdArr = [],
      this.shareConfig()
      this.isRecord = false;
      let _this = this;
      this.$nextTick(function () {
        document.addEventListener('visibilitychange',function() {
          _this.isRecord = false;
        })
      });
        // this.$refs.audio.addEventListener('ended',this.endAu);
    },
    watch:{
      songUrl : function(newUrl){
        let _this = this;
        if(newUrl){
          _this.$nextTick(() => {
            _this.$refs.audio.play();
        })
        }
      }
    },
    methods:{
      next(event){
        if (event) event.preventDefault()
        this.$router.replace({name:'Part',query:{id:this.next_id}})
      },
      hideGuide(){
        this.part4_guide = false
        localStorage.setItem('extendAbcPart4Guide',true)
      },
      back(){
        let id = this.$route.query.id;
        this.$router.replace({name:'Part',query:{id:id}})
      },
      showPerfect: function () {
        this.perStatus = true
        this.$refs.perfectAudio.play()
      },
      initPerfect: function () {
        this.perStatus = false
      },
      //音频时长
      onTimeupdate(){
        if(this.$refs.audio.duration){
          this.updateProgress()
          this.audio.duration = this.transTime(this.$refs.audio.duration)
        }
      },
      transTime(time) {
        var duration = parseInt(time);
        var minute = parseInt(duration/60);
        var sec = duration%60+'';
        var isM0 = ':';
        // if(minute == 0){
        //   minute = '00';
        // }else if(minute < 10 ){
        //   minute = '0'+minute;
        // }
        if(sec.length == 1){
          sec = '0'+sec;
        }
        return minute+isM0+sec
      },
      //更新进度条
      updateProgress(){
        let au = this.$refs.audio
        this.audio.currentTime = this.transTime(au.currentTime);
        this.proLeft = Math.round((Math.floor(audio.currentTime) / Math.floor(audio.duration)) * 100, 0);
        if(audio.duration == audio.currentTime){
          this.endAu()
        }
      },
      onPlay(){
        // console.log(this.$refs.audio)
      },
      onPause(){
        this.currentId = -1;
        this.songUrl = '';
        this.proLeft = 0;
        this.audio.currentTime = '0:00'
      },
      endAu(){
        this.songArr[this.saveInd].completed = true;
        this.$set(this.songArr,this.saveInd,this.songArr[this.saveInd])
        document.getElementsByClassName('def_bg')[this.saveInd].className='def_bg completed_bg'
        let haveCompleted = false;
        let canGo = true
        this.songArr.forEach(function (value) {
          if(canGo){
            if(!value.completed){
              haveCompleted = false
              canGo = false
              return false;
            }else {
              haveCompleted = true
            }
          }
        });
        if(haveCompleted){
          this.activeSong()
        }
      },
      pauseAudio(){
        this.$refs.audio.pause();
      },
      playAudio(ind,url,txt){
        this.songUrl = url;
        this.saveInd = ind;
        this.currentId = ind;
        this.song_txt = txt;
        // let audio = document.querySelector('#audio');
        // audio.src = url
        // audio.src = 'https://qnfile.abctime.com/1999_p1.mp3'
        // audio.play();

      },
      //解锁该关卡
      activeSong(){
        let member_id = localStorage.getItem('extendAbcMemberid'),lesson_id=this.$route.query.id;
        let wUrl = this.$common.config.gzhUrl + "v3/marketingcourse/course/lesson-location"
        let fd = this.$common.getParam('get', {course_id:1,member_id: member_id,lesson_id:lesson_id,location:4});
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
          }
        })
      },
      setData(){
        let conObj = JSON.parse(window.localStorage.getItem('letterContent'));
        // let sArr = conObj.song.resource
        this.songArr = conObj.song.resource
        // this.songArr = conObj.song.resource
        for(var i in this.songArr){
          this.songArr[i].completed = false
        }
        // this.songArr = sArr
      },
      startRecord(){
        let _this = this;
        wx.ready(function(){
          _this.pauseAudio()
          _this.isRecord = true;
          wx.startRecord();
        });
      },
      stopRecord(){
        let _this = this;
        wx.ready(function(){
          wx.stopRecord({
            success: function (res) {
              _this.showPerfect();
              _this.isRecord = false;
              _this.localId = res.localId;
            }
          });
        });
      },
      playVo(){
        let _this = this
        wx.ready(function(){
          _this.pauseAudio()
          wx.playVoice({
            localId: _this.localId
          });
        });
      },
      shareConfig(){
        let member_id = localStorage.getItem('extendAbcMemberid')
        let lUrl = encodeURIComponent(window.location.href)
        let wUrl = this.$common.config.gzhUrl + "v3/wechat/wechat/get-wechat"
        let fd = this.$common.getParam('get', {url: lUrl, member_id: member_id});
        let link = window.location.origin + '/extend/letter/index.html'
        let configObj = {
          title:'零基础宝宝也能学会的字母课，26节课让孩子轻松爱上英语！',
          desc: 'AI动画互动课，孩子轻松掌握26个字母，养成良好阅读习惯，英文水平超车同龄宝宝~',
          imgUrl: 'https://qnfile.abctime.com/extend/letter/letter_share.png',
        };
        this.$axios.post(wUrl+'?'+fd).then((res) => {
          if(res.data.code == 200){
          let data = res.data.data
          // 微信配置
          wx.config({
            debug: false,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'startRecord','stopRecord','playVoice','pauseVoice','onVoiceRecordEnd','onVoicePlayEnd'] // 功能列表，我们要使用JS-SDK的什么功能
          });
          wx.ready(function () {
            wx.checkJsApi({
              jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'startRecord','stopRecord','playVoice','pauseVoice','onVoiceRecordEnd','onVoicePlayEnd'],
              success: function (res) {
              }
            });
            wx.showMenuItems({ menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline']
            });
            wx.onMenuShareTimeline({
              title: configObj.title,
              link: link,
              imgUrl: configObj.imgUrl,
              success: function () {
              }
            });
            wx.onMenuShareAppMessage({
              title: configObj.title,
              desc: configObj.desc,
              link: link,
              imgUrl: configObj.imgUrl,
              type: 'link',
              dataUrl: '',
              success: function () {
              }
            });
          });
        }
      })
      }
    }
  }
</script>
<style scoped lang="less">
  .part3{
    width: 100vw;
    height: 100vh;
    background: url('data:image/png;base64,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') repeat-y;
    background-size: 100% 100%;
    position: relative;
    overflow-x: scroll;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
    .song_list{
      font-size: 0;
      white-space: nowrap;
      width: 100vw;
      height: 3.9rem;
      overflow-x: scroll;
      background: url('../../assets/imgs/song_bg_f.png');
      background-size: cover;
      margin-top: .5rem;
      &::-webkit-scrollbar {display:none}
      &::-webkit-scrollbar { width: 0 !important }
      li{
        width: 3.74rem;
        height: 3.74rem;
        display: inline-block;
        vertical-align: top;
        background: url('../../assets/imgs/songBG.png');
        background-size: cover;
        position: relative;
        .inner_bg{
          width: 2.74rem;
          height: 2.74rem;
          margin: .5rem auto;
          background: url('../../assets/imgs/song_def_bg.png');
          background-size: cover;
          position: relative;
          .btn_box{
            width: .78rem;
            height: .78rem;
            background: url('../../assets/imgs/song_def_bg_sm.png');
            background-size: cover;
            position: absolute;
            top: .92rem;
            left: .98rem;
          }
        }
        .completed_bg{
          width: 2.74rem;
          height: 2.74rem;
          margin: .5rem auto;
          background: url('../../assets/imgs/song_ed_bg.png');
          background-size: cover;
          position: relative;
          .btn_box{
            width: .78rem;
            height: .78rem;
            background: url('../../assets/imgs/song_ed_sm.png');
            background-size: cover;
            position: absolute;
            top: .92rem;
            left: .98rem;
          }
        }
        .ing_bg{
          width: 2.98rem;
          height: 2.98rem;
          margin: .32rem auto;
          background: url('../../assets/imgs/song_ing_bg.png');
          background-size: cover;
          position: relative;
          -webkit-transform: rotate(360deg);
          animation: rotation 8s linear infinite;
          -moz-animation: rotation 8s linear infinite;
          -webkit-animation: rotation 8s linear infinite;
          -o-animation: rotation 8s linear infinite;
          @-webkit-keyframes rotation {
            from {-webkit-transform: rotate(0deg);
            }to {
               -webkit-transform: rotate(360deg);
             }}
          .btn_box{
            width: .78rem;
            height: .78rem;
            background: url('../../assets/imgs/song_ing_sm.png');
            background-size: cover;
            position: absolute;
            top: 1.1rem;
            left: 1.1rem;
            /*-webkit-transform: rotate(360deg);*/
            animation: rotation2 8s linear infinite;
            -moz-animation: rotation2 8s linear infinite;
            -webkit-animation: rotation2 8s linear infinite;
            -o-animation: rotation2 8s linear infinite;
            @-webkit-keyframes rotation2 {
              from {-webkit-transform: rotate(360deg);
              }to {
                 -webkit-transform: rotate(0deg);
               }}
            .spinner {
              margin: auto;
              width: .3rem;
              height: .32rem;
              text-align: center;
              font-size: 0px;
              margin-top: .2rem;
              /*position: absolute;*/
              /*right: .7rem;*/
            }
            .spinner > div {
              background: #FFF;
              height: 100%;
              width: .04rem;
              border-radius: .015rem;
              /*margin-right: .05rem;*/
              display: inline-block;
              margin: auto .05rem 0 0;
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
        .tag{
          width: .53rem;
          height: 2.46rem;
          background: url('../../assets/imgs/song_tag.png');
          background-size: cover;
          position: absolute;
          top: .55rem;
          left: 2.8rem;
          z-index: 10;
        }
        .tag_active{
          width: .53rem;
          height: 2.46rem;
          background: url('../../assets/imgs/song_tag.png');
          background-size: cover;
          position: absolute;
          top: .7rem;
          left: 2.8rem;
          z-index: 10;
          -webkit-transform: rotate(30deg);
          -webkit-animation: go 1s ease-in-out alternate infinite;
          -moz-animation: go 1s ease-in-out alternate infinite;
          animation: go 1s ease-in-out alternate infinite;
          @keyframes go {
            0% {
              -webkit-transform: rotate(30deg);
              -webkit-transform-origin: top center;
              -moz-transform: rotate(30deg);
              -moz-transform-origin: top center;
              transform: rotate(30deg);
              transform-origin: top center;
            }
            100% {
              -webkit-transform: rotate(27deg);
              -webkit-transform-origin: top center;
              -moz-transform: rotate(27deg);
              -moz-transform-origin: top center;
              transform: rotate(27deg);
              transform-origin: top center;
            }
          }
        }
        .tag_box{
          width: .6rem;
          height: .6rem;
          border-radius: 50%;
          position: absolute;
          left: 1.645rem;
          top: 1.59rem;
          &.current{
            background: #458D3B;
            text-align: center;
            .spinner {
              margin: auto;
              width: .3rem;
              height: .32rem;
              text-align: center;
              font-size: 0px;
              margin-top: .1rem;
              /*position: absolute;*/
              /*right: .7rem;*/
            }
            .spinner > div {
              background: #FFF;
              height: 100%;
              width: .04rem;
              border-radius: .015rem;
              /*margin-right: .05rem;*/
              display: inline-block;
              margin: auto .05rem 0 0;
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
          &.default{
            background: #DB4C47;
            .icon{
              display: inline-block;
              width: .24rem;
              height: .34rem;
              margin: .13rem 0 0 .05rem;
              background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAiCAYAAABFlhkzAAAAAXNSR0IArs4c6QAAAqZJREFUSA21Vs9LG0EU3tmskRAo1lsRQg+FQHu1SsFLD+2hOQs9WWppC+0f0YCIBw8iPXiwWMFipLBRkthoSYylCdI0afojpTVtUhs1StqYmuiq7K++OSxskt1kN9k8eMzMm+99X2Ze3u4iAkwURRKGy+Bm8ARCSITRGAPyHvAYuGRfYHLVGHZgATJaYpaNLMyfgFMtCwFJCVzNorBhb0lEjVkWZ2D+GBw1JSQjajRdBUCPbpFGrFX7B7C+rUukikDr0gXA85qEtDIq4HYgdqOhiEKinpAA4KfgFlUhPWx1sN9hT7k56yTp3VJuTr0sGvCVzakhoRkIbs47uC4IZ6sWqLUNzHuznQL4573A74G2GccwlnYKiFuRSKj1573C+QWeZzf9fnpjauqd4QJMoZANT07Ob8fjecJqzRhXZFHks9FoIDg2FhA4joG7XxleXs4YcoLTcjkfnZ6e/xkMbhMk+cvc3f16aG7uGN9eqwLifjIZCY6MeE+Ojk5Jknxzz+f7JC9L0wIswxwmXK6FpNudgnfpHovQyiOfrygnb/oEhXQ6sTY6Spfz+WMg38j29b13Op1CNTle6yoyz7LMV4+Hjs3MfITcg47OzldDi4t5JWIppvmKSrnc5vr4+MLfVKokkOSHS7294etOJycRqY0NT4CbJh0Ked9OTETgH1LmEFp96PVm1Qir44jnuDPSZMLfpDUmNc1OPP4HPgG/XSCItVt+/1kNsE6AKu3u/uiy2a5UYKqaBqoXeOD3pyowGhemazzfZevvt3dYLOdwzkmxmINnyPPY7GwClhloGvcwTe9r5KuBoWcOhwMKYb84MAA3QBBb4fAe/GKOoKj1+x7P55oMnQGKEYSAFWoAxFLqb8psDt5dWvonBQwZXw4OmrAbQiYj+Q+olvGFRiwbwQAAAABJRU5ErkJggg==');
              background-size: cover;
            }
          }
        }
        /*&.active{*/
          /*background: url('../../assets/imgs/disco_active.png');*/
          /*background-size: cover;*/
        /*}*/
        margin: 0 .15rem;
      }
    }
    .song_txt{
      font-size: .34rem;
      width: 80%;
      margin: auto;
      color: #fff;
      z-index: 80;
      position: relative;
      line-height: 1;
    }
    .audio_box{
      width: 100vw;
      height: 1.28rem;
      background: #9D4E47;
      position: absolute;
      bottom: 0;
      left: 0;
      .progress_box{
        width: 66%;
        height: .1rem;
        background: #7F3A34;
        border-radius: .05rem;
        margin: .59rem 0 0 6.6%;
        position: relative;
        .current_box{
          height: .1rem;
          position: absolute;
          left: 0;
          top: 0;
          background: #D98043;
          border-radius: .05rem;
        }
        .process{
          width: .12rem;
          height: .36rem;
          background: #FFB841;
          box-shadow: 0 .02rem .09rem 0 rgba(12,12,12,0.50);
          border-radius: .06rem;
          position: absolute;
          top: -.16rem;
          left: 0;
        }
        span{
          font-family: HiraginoSansGB-W6;
          font-weight: bold;
          font-size: .2rem;
          color: #733530;
          letter-spacing: .0125rem;
          text-align: center;
          position: absolute;
          &.current_time{
            left: -.3rem;
            top: .25rem;
          }
          &.total_time{
            right: -.3rem;
            top: .25rem;
          }
        }
      }
      .record_box{
        width: 2.61rem;
        height: 1.72rem;
        background: url('data:image/png;base64,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');
        background-size: cover;
        position: absolute;
        right: .21rem;
        bottom: .05rem;
        .btn_record{
          width: 1.26rem;
          height: 1.32rem;
          background: url("../../assets/imgs/song_speak.png");
          background-size: cover;
          position: absolute;
          top: .19rem;
          right: .2rem;
        }
        .start_record{
          width: 1.26rem;
          height: 1.32rem;
          position: absolute;
          top: .19rem;
          right: .2rem;
        }
        .btn_repeat{
          width: .76rem;
          height: .82rem;
          background: url("../../assets/imgs/song_repeat.png");
          background-size: cover;
          position: absolute;
          bottom: .18rem;
          left: .2rem;
        }
      }
    }
    .back{
      position: absolute;
      width: .44rem;
      height: .36rem;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAkCAMAAADFCSheAAAAUVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////8IN+deAAAAG3RSTlMAr4wEoiB3q30+j4mna1lFnZaSLRuEdHBcNgzuTD/HAAAAh0lEQVQ4y+XKORLCMBAEwFnLQrfki/P/D8UqIiigZlPouPEipLxUA4Y5SRcNcw/ycFFcmRVXnOJKVFxpius11/zulWV4L5Vrz2chFaAJreHI54TM54yZzxGFzxW3ib2DAezITBfrfp+3C/jiT/em2R6KPYLfPfPbg9/OgrGl/U4rSDasBh/cATbkBoDdSRHxAAAAAElFTkSuQmCC');
      background-size: cover;
      top: .16rem;
      left: .23rem;
    }
  }
  .part4_guide{
    width: 100vw;
    height: 100vh;
    background: url('../../assets/imgs/part4_guide.png');
    background-size: 100% 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    div{
      width: 1.5rem;
      height: .8rem;
      line-height: .8rem;
      font-family: Helvetica;
      font-size: .36rem;
      margin: auto;
      color: #FF9E45;
      letter-spacing: 0;
      text-align: center;
      border: .03rem solid #FF9E45;
      border-radius: 12px;
      position: absolute;
      bottom: .35rem;
      left: calc(~'50% - .75rem');
    }
  }
  .hv_tip{
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .8);
    z-index: 1001;
    font-size: .32rem;
    font-family: PingFangSC-Semibold;
    font-weight: bold;
    color: #FFD356;
    .icon{
      width: 2.04rem;
      height: 1.53rem;
      margin: 4rem auto 0;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMkAAACWCAMAAABDwFwVAAAApVBMVEUAAADr9f/+///////////+/v/////////7+//////t9v/x9f/////////////w+//////u9v/////u9P/0+f/////+/v/y+f/r9//w+P/1/P////////////////////////////////////////////////////////////////////////////////////////////////////////////////9YCPw6AAAANnRSTlMAGpaLjpuQkQb3GATdoWEJ6BawFAxllB4RDwvx5+Hrh3Uq2cRbtqVtUSMCu518PNBoSqo/ODTmdfBCAAAFfklEQVR42u3d7XKiMBiG4Sd2tYGoiKCCWq3W2s9tt/uR8z+07ZoKVqxg4M0C4/2HX51yTYwMDCbY5Hf7bUuelNXud32UrUFPatUboFTxjtSuw1GiFESXgvI0kLkqzwdsPM0nmY5RkrpS1e60Nt3KlPqtTZ0rqeqiJPXlpiaH6iVN8gcqp/MhQ0lqqxHh+IhPjkNmAlvKlfpTlCR1QXxG1N1xSRdRa3WJREmSmy4Qd3Sm9BF3KTehJCUl4rv1lcO6FlWSAKMf88sDzQcMqJbk686SA50lZ8lZkl71JN3Xyc0vHKhqkob81wFK1SQKIm+QqGKShlRNkKhaki1EviJRpSQRRK6QqEySVixJgQyRrEKSGCKt5VPz+2qB3aoj6cpE0+f7EFGVkbzKQ1k3KwFVZSQT+UXtOwf/qozkRn7Z7HsAoDKSF3mk6RtQGQm68lidoDqSHcp0dXfxtDdxrt6qI9mhzPHe4vrz3PlWHUlMaUM1ms9k3JpXRhJRZtjm3E1iypNfGQlWyYew9jqm3LiVkWBl/RuSB+z2axlRlm5lJFg0buf7p8sb8ajwykgOdx1fWEog+ZZDgntrS7kuVHLpO9ysBL+j7+P7IiUNxpjt+dygBC/bUZksCpWo7IAbk2AVzfrCJQoTCkOSeNr/KFYS53EzEjSlajKikMQWeomzlKo+iUQVCAMS/LGk6p5GogoNSPBdqq44oYS5nF4iXuNJTyNR+eQS/I4HhVLCPEEtwc+d10ge7hdUEuYKasnDx6RfisfG++HJJZIwmxNLcCFVK3Wh7FNIVA6xxN4OykQdAzIJG9NK0JCfeqCTMIdQIhaLhdxt9kgoYZxM8nsp5WyyK2mBUmJzIonXk/s9kEqYLWgkgwTkFrQS5tJI5gnJG7WEhSSS+31IG+QSxikkeNqTXBuQuI8UEmc+2YVYgQEJC2iujOHdMpY0YULCeLGSuLfb7ZAszEhcConqoTWJZwm9hDkkEpXfbbZeYEri7knK+PZgNgkb10Zi10bCnNpIvNpImKiNJKyNxK6NhDm1kYS1kbi1kTBRG8m4NpKgNhK7NhL2mEEyVgtTUBYvZzHWlfB0yWAqDTYdaEqcNAnvSMN1uJbET5OYg8QULUmQIhnI/9BAR+Lho4uDEr8n/0M9X0PiHpd0pepq3cjf5UVKz22p6hYv6ctN6xErIB9p8abc1NeQ2MclbTUihUCYg3SK+oft4iXqgviTFRLPvIaPVbxEbmoWArFPeEVWQ8LMSbwTJOUeE59W4pqTcFqJZ0xig1YSGJMExJLQmIQjPf5yqy3xTUlspKd+l6MpcUxJQqQl1HjoSoQpicj0Zqu+xIYhiYe0RlYuiZdRMhr2esMR6Xz/IVMl72chE32cV5hRMpTvDSmHBPN0yTDpiM7LySjpbfSkX8GX6ZIDIxKdl8goUcccV0VqiQczEnGyRE3/deZP1xhRz+oWh0QS4lRJfLOaccaLxG0nhcTF6ZK+OnYUJTUv+SiAQsI1JNFDnZ/NLA1bH3WixzMEEh8akvwrwBYv8aAjyb8qb+ESV+hI8q+UXLjEFtCR5F69ungJh5Yk94rihUsc6ElyrvJevGQMXUmuipc4qIfE5qiH5B1SD4krUA9JCNRC4nKUVXLa3W/wiNJK1BMJggGJm9NI9J8SuQ70GpiRZM0eQzdmlUjiOcjRtQHJ0MsyHKFArkSfXtKC8I9j3NBB/gYzesl7wgk9++BgBGOBYhJ/+gYkUBw/DDzXZrZtu64X+A5/RJG1qCXHOkvOkrOkLhLL9I5hHaJNfuItlIij33gp3taKNvLNsOKtxp4vDvbtxFp7XX5qXeQGZWV5y/ZTZdiSr0wb+XWkXuXbXJFrUsq44aXxX20UU0l+SfMXG4eQsma3QiYAAAAASUVORK5CYII=');
      background-size: cover;
    }
    p{
      padding-top: .4rem;
    }
  }
  /*竖屏*/
  @media screen and (orientation:portrait){
    .hv_tip{
      display: block;
    }
  }
  /*横屏*/
  @media screen and (orientation:landscape){
    .hv_tip{
      display: none;
    }
  }
  .finish{
    width: 100vw;
    min-height: calc(~'100vh - .22rem');
    background: rgba(0,0,0,.5);
    padding-top: .22rem;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
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

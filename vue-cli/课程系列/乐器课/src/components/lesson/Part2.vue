<template>
  <div class="part2">
    <div class="swiper-container_box">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <swiper-slide class="myslide" v-for="(slide, index) in swiperSlides" :key="index">
            <img :src="slide.pic_url">
            <div class="txt">
              <p v-html="slide.content"></p>
            </div>
            <audio id="audio" class="Hidden" @ended="onEnd(index)" :src="slide.audio_url" controls></audio>
            <div class="completed_icon" :class="slide.completed?'':'Hidden'"></div>
          </swiper-slide>
        </div>
      </div>
    </div>
    <div class="play_btn" @click="playAudio"></div>
    <div class="back" @click="back()"></div>
    <span class="page"><span>{{currentId+1}}</span>/{{swiperSlides.length}}</span>
    <audio ref="perfectAudio" id="perfectAudio" src="https://qnfile.abctime.com/extend/audio/perfect_1.mp3" preload="auto" class="Hidden" controls></audio>
    <div class="audio_box">
      <div class="btn_record" @click="isRecord?stopRecord():startRecord()"></div>
      <div class="btn_repeat" @click="playVo()"></div>
    </div>
    <perject :showState="perStatus"></perject>
    <div class="part2_guide" v-if="part2_guide">
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
  import Swiper from 'swiper';
  import Perfect from './Perfect'
  export default {
    name: 'part2',
    components: {
      perject: Perfect,
    },
    data() {
      return {
        swiperSlides: [],
        localIdArr: [],
        recordFlag:false,
        localId:'',
        completeId:-1,
        perStatus:false,
        isRecord:false,
        canShowPerfect:true,
        currentId:0,
        part2_guide:false,
        showFinish:false
      }
    },
    mounted() {
      let guide = localStorage.getItem('extendAbcPart2Guide')
      if(!guide){
        this.part2_guide = true
      }else {
        this.part2_guide = false
      }
      let _this = this;
      this.setData()
      this.localIdArr = []
      new Swiper('.swiper-container',{
        loop: false,
        observer:true,
        on:{
          slideChange: function(){
            _this.currentId = this.activeIndex
            _this.playAudio(this.activeIndex)
          },
        },
      });
      this.shareConfig();
      this.isRecord = false;
      this.$nextTick(function () {
        document.addEventListener('visibilitychange',function() {
          _this.isRecord = false;
        })
      })
    },
    watch:{
      swiperSlides : function(newUrl){

      }
    },
    methods:{
      next(event){
        if (event) event.preventDefault()
        this.$router.replace({name:'Part',query:{id:this.next_id}})
      },
      hideGuide(){
        this.part2_guide = false
        localStorage.setItem('extendAbcPart2Guide',true)
      },
      back(){
        let id = this.$route.query.id;
        this.$router.replace({name:'Part',query:{id:id}})
      },
      showPerject: function () {
        this.perStatus = true
        this.$refs.perfectAudio.play()
      },
      initPerfect: function () {
        this.perStatus = false
      },
      onEnd(){
        this.swiperSlides[this.currentId].completed = true;
        this.$set(this.swiperSlides,this.currentId,this.swiperSlides[this.currentId])
        let haveCompleted = false
        let canGo = true
        this.swiperSlides.forEach(function (value) {
          if(canGo){
            if(!value.completed){
              haveCompleted = false
              canGo = false;
              return false;
            }else {
              haveCompleted = true
            }
          }
        })
        if(haveCompleted){
          this.activeBook()
        }
      },
      activeBook(){
        let member_id = localStorage.getItem('extendAbcMemberid'),lesson_id=this.$route.query.id;
        let wUrl = this.$common.config.gzhUrl + "v3/marketingcourse/course/lesson-location"
        let fd = this.$common.getParam('get', {course_id:2,member_id: member_id,lesson_id:lesson_id,location:2});
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
          _that.$router.replace({name:'Transition',query:{id:_that.$route.query.id,part:3}})
        }
        })
      },
      playAudio(ind){
        this.stopVo()
        this.completeId = this.currentId;
        let audio = document.querySelector('#audio');
        audio.src = this.swiperSlides[this.currentId].audio_url
        // audio.src = 'https://qnfile.abctime.com/1999_p1.mp3'
        audio.play();
      },
      setData(){
        let conObj = JSON.parse(window.localStorage.getItem('musicalContent'));
        this.swiperSlides = conObj.book.book_pages;
        console.log(this.swiperSlides)
        for(var i in this.swiperSlides){
          this.swiperSlides[i].completed = false
        }
      },
      startRecord(){
        this.stopVo()
        this.recordFlag = !this.recordFlag
        wx.ready(function(){
          wx.startRecord();
        });
      },
      startRecord(){
        let audio = document.querySelector('#audio');
        let _this = this;
        wx.ready(function(){
          audio.pause()
          _this.isRecord = true;
          wx.startRecord();
        });
      },
      stopRecord(){
        let _this = this;
        wx.ready(function(){
          wx.stopRecord({
            success: function (res) {
              _this.showPerject();
              _this.isRecord = false;
              _this.localId = res.localId;
            }
          });
        });
      },
      playVo(){
        let _this = this;
        let audio = document.querySelector('#audio');
        wx.ready(function(){
          audio.pause()
          wx.playVoice({
            localId: _this.localId
          });
        });
        // }
      },
      stopVo(){
        let _this = this;
        if(_this.localId){
          wx.stopVoice({
            localId: _this.localId
          });
        }
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
  @import '../../../node_modules/swiper/dist/css/swiper.min.css';
  .part2{
    width: 100vw;
    height: calc(~'100vh - .12rem');
    overflow: scroll;
    background-image: linear-gradient(-180deg, #272D39 0%, #384152 100%);
    padding-top: .12rem;
  }
  .swiper-container_box{
    width: 8.6rem;
    height: 5.6rem;
    margin: auto;
    padding-top: .3rem;
    /*background: url('../../assets/imgs/book_bg.png');*/
    /*background-size: 100% 100%;*/
    background: #1E222C;
    box-shadow: inset 0 0 .2rem 0 rgba(0,0,0,.3);
    border-radius: .3rem;
    position: relative;
    .swiper-container{
      width: 8rem;
      height: 5.4rem;
      margin: auto;
      background: url('../../assets/imgs/book_bg.png');
      background-size: 100% 100%;
      position: relative;
      .completed_icon{
        width: 1.3rem;
        height: 1.3rem;
        position: absolute;
        right: 0;
        top: 0;
        background: url('../../assets/imgs/completed_icon.png');
        background-size: cover;
      }
      img{
        height: 3.8rem;
        width: auto;
        margin-top: .13rem;
      }
      .txt{
        display: table;
        margin: auto;
        width: 8.18rem;
        height: 1.25rem;
        overflow-y: scroll;
        p{
          display: table-cell;
          font-family: Helvetica;
          letter-spacing: .01rem;
          /*line-height: .44rem;*/
          vertical-align: middle;
          font-size: .3rem;
          color: #20A1E7;
        }
      }
    }
  }
  .back{
    position: absolute;
    width: 1.36rem;
    height: .78rem;
    background: url('../../assets/imgs/btn_back.png');
    background-size: cover;
    top: .16rem;
    left: 0;
  }

  .page{
    position: absolute;
    right: .7rem;
    top: .4rem;
    font-family: Helvetica;
    font-size: .24rem;
    color: #D7A944;
    letter-spacing: .05rem;
    text-align: center;
    text-shadow: 0 .03rem .06rem rgba(0,0,0,0.50);
    span{
      font-size: .36rem;
    }
  }
  .play_btn{
    width: 1.4rem;
    height: 1.4rem;
    position: absolute;
    left: .43rem;
    bottom: .27rem;
    background: url('../../assets/imgs/play_btn.png');
    background-size: cover;
  }
  .audio_box{
    width: 2.19rem;
    height: 1.44rem;
    position: absolute;
    right: .1rem;
    bottom: .28rem;
    background: url('../../assets/imgs/book_audio_bg.png');
    background-size: cover;
    z-index: 101;
    .btn_record{
      width: 1.13rem;
      height: 1.15rem;
      background: url("../../assets/imgs/btn_record.png");
      background-size: cover;
      position: absolute;
      top: .16rem;
      right: .13rem;
    }
    .btn_repeat{
      width: .82rem;
      height: .82rem;
      background: url("../../assets/imgs/btn_repeat.png");
      background-size: cover;
      position: absolute;
      bottom: .07rem;
      left: .09rem;
    }
  }
  .part2_guide{
    width: 100vw;
    height: 100vh;
    background: url('../../assets/imgs/part2_guide.png');
    background-size: 100% 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 102;
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
    z-index: 105;
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
    z-index: 104;
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

<template>
  <div class="part4">
    <div class="back" @click="back()"></div>
    <div class="video_wrap">
      <video ref="video1" :preload="true" autoplay controls x5-video-player-type="h5" x5-video-orientation="landscape" :src="url" @ended="activeSong"></video>
    </div>
    <audio ref="perfectAudio" id="perfectAudio" src="https://qnfile.abctime.com/extend/audio/perfect_1.mp3" preload="auto" class="Hidden" controls></audio>
    <perject :showState="perStatus"></perject>
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
        url:'',
        song_txt:'',
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
      this.setSrc(),
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
      setSrc(){
        let conObj = JSON.parse(window.localStorage.getItem('musicalContent'));
        this.url = conObj.song.url
      },
      //解锁该关卡
      activeSong(){
        let member_id = localStorage.getItem('extendAbcMemberid'),lesson_id=this.$route.query.id;
        let wUrl = this.$common.config.gzhUrl + "v3/marketingcourse/course/lesson-location"
        let fd = this.$common.getParam('get', {course_id:2,member_id: member_id,lesson_id:lesson_id,location:4});
        this.$axios.get(wUrl+'?'+fd).then((res) => {
          if(res.data.code == 200){
            if(res.data.data.is_finish){
              let len = parseInt(localStorage.getItem('extendAbcLength'))
              console.log('len',len)
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
        let conObj = JSON.parse(window.localStorage.getItem('musicalContent'));
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
  .part4{
    width: 100vw;
    height: 100vh;
    background: url('../../assets/imgs/part4_bg.png') repeat-y;
    background-size: 100% auto;
    background-color: #C0E8FF;
    position: relative;
    overflow-x: scroll;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
    video{
      /*width: 50vw;*/
      height: 100vh;
      width: auto;
      z-index: 999;
    }
    .back{
      position: absolute;
      width: .54rem;
      height: .59rem;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA7CAMAAAAHBYkxAAAAz1BMVEUAAACtXSfsgDmsXCfadjSsWyesWyjtgTzlfDfsgDnHay/sgDmrXCjsgDnrgDnsgDqsXCjsgDmsXCjrgDmsWyfsgDqsXSntgDnsgDvsgTqtWyjrgTutXCjtgTutXinrgTvugj6wYCjwgz6yXS7/qlXScDKrWyjrfzm4YyzrfzmrWyf////1wqH87ePtjE27ZCzmfDfScDH98ergeTXDaC70uZPtkFS0YCn76t741L330Lfyq33++PX75dfwoW3528jvmmPulFrrgTvxpnXsiUiyFroIAAAAKXRSTlMAQOzs/t2WP/z5/fv639rLy7+/tradnZiUbW1nZ1dXQS0tISED/Pnv7wOIpW0AAAIjSURBVEjHndXpeppQEIDhYRfjHpdo3DXLDE0ApcUtpml7/9dUKDYpnI3m++vzPnM2FXjNh4N2XXddvd4eDOdQKqenYy695yjRpIGcGhMpmjVRUHMmRMtrlHS9FGxKR2k6d4u3Lipybxm0vsES3awLLFNqV1ghliy3Tscty1znQy2FZ/hzvz8XzvPjHoT39cVLOhbu7/1tSJW3w3yzC2tKlbcpvrNMTeTKO2Ch7F035OrpF/N9SJWjUM/I5CSsp1JsvYTpKsWmA8zVim0OQ7ViG8JArdgG0FYrtjbUsdCrWmEdHtSz2B7gCvNtWMV2JWKbb3JWwXxfvRKuwjA8qF3CTMT/n2fCHX7C3UEVxe7lh4BV4REl7ruAPYIVcJ2UBRZ0QhS6nWCRYQdsH7kdn06vyZG8vSGbb8OItijs+SU5F+aZbWkEC4rEbO8l7bFQRAsAQzLulLITM8wAgD75Qrbj/Zj71E+YRmSK2JHz12ESaZBkURyI3PlwOBfuLCYL0qZEPpbOJ5rCn1pEUVkVEbUgSyOisJwKKd3ZpW7BSVUX/rYyiCgqtUIyVvCeViMiP5CjwCeimgb/NKak2JQpM6akMeSyKc3fitDWpzQb8q0zR9GWiyLK1BqKjWuUTQyDwp5CP/ukNgZOmkGX4mpoVoIEVMywGtMlQwNuqy5J6q5AlNYSoZYGsqYWD1lTUKX1jbwx+hqUajGyO5Zxf29YHXu0AE6/AZNVmZgnIaFjAAAAAElFTkSuQmCC');
      background-size: cover;
      top: .18rem;
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

<template>
  <div class="Lesson">
    <div class="video_wrap">
      <div class="video" id="video">
        <!--<script  src="https://p.bokecc.com/player?vid=E0ABAE9D4F509B189C33DC5901307461&siteid=FE644790DE9D154A&autoStart=false&width=100%&height=100%&playerid=FA25B02F7A04F6AC&playertype=1" type="text/javascript"></script>-->
      </div>
    </div>
    <div class="lesson_title"><span>第{{lesson_no}}节</span>{{title}}</div>
    <div class="questions">
      <div class="que_hd">小试牛刀</div>
      <div class="que_content">
        <ul>
          <li v-for="(item,index) in questions">
            <p class="q_no">第{{index+1}}题</p>
            <p class="q_title">{{item.title}}</p>
            <div :class="opt.active?'ans_box active':'ans_box'" v-for="(opt,$index) in questions[index].options" @click="checkAns(opt,$index,index,opt.title)">
              <span class="ans_title">{{opt.title}}</span>
              <p class="ans_content">{{opt.content}}</p>
              <div v-show="(hasAnswer&&item.answer==opt.title)||(hasAnswer&&item.self_answer==opt.title)" :class="item.answer==opt.title?'ans_icon ans_icon_right':'ans_icon'"></div>
            </div>
          </li>
        </ul>
      </div>
      <div class="submit_btn" v-if="!hasAnswer" @click="recordAnswer()">提交答案</div>
    </div>
    <eject :message="ejectText" :showState="ejectStatus"></eject>
    <!--<div class="back" @click="back()"></div>-->
  </div>
</template>
<script>
  import Eject from '../Eject'
  export default {
    name: 'Lesson',
    components: {
      eject: Eject,
    },
    data () {
      return {
        url:'',
        ejectText:'',
        ejectStatus: false,
        showFinish:false,
        next_id:1,
        vid:'',
        title:'',
        lesson_no:'',
        questions:[],
        intervalTimer:0,
        ansBox:[],
        hasAnswer:true
      }
    },
    created(){
      // this.getInfo()
      this.shareConfig()
      this.lesson_no = parseInt(this.$route.query.no) + 1
    },
    mounted(){
      this.getCourseInfo(1)
      this.shareConfig()
      // this.setSrc()
      this.$nextTick(function () {

      })
    },
    methods: {
      next(event){
        if (event) event.preventDefault()
        this.$router.replace({name:'Part',query:{id:this.next_id}})
      },
      back(){
        this.$router.replace({name:'Cata'})
      },
      checkAns(item,$index,ind,ans){
        if(!this.hasAnswer){
          this.ansBox[ind] = ans;
          let _this = this;
          this.$nextTick(function () {
            this.questions[ind].options.forEach(function (item) {
              _this.$set(item,'active',false);
            });
            _this.$set(item,'active',true);
          });
        }
      },
      recordAnswer(){
        let ans = this.ansBox.join(',');
        if(this.ansBox.length < this.questions.length){
          this.showEject('还有未选择的题目哦～')
          return
        }
        let member_id = localStorage.getItem('extendAbcMemberid');
        let lesson_id = this.$route.query.id,_this=this;
        let wUrl = this.$common.config.gzhUrl + "v3/marketingcourse/course/record-answer"
        let fd = this.$common.getParam('get', {course_id:3,member_id: member_id,lesson_id:lesson_id,answer:ans});
        let conf = {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
        this.$axios.post(wUrl,fd,conf).then((res) => {
          if(res.data.code == 200){
            _this.activeLesson(2);
            _this.getCourseInfo(0);
          }
        })
      },
      setSrc(){
        let videoScript= document.createElement("script"),_this=this;
        videoScript.type = "text/javascript";
        videoScript.src = this.vid.replace(/\s+/g,"");
        document.getElementById('video').appendChild(videoScript);
        this.intervalTimer = setInterval(() => {
          if(document.querySelector('video')){
            document.querySelector('video').addEventListener('play',function(){
              _this.activeLesson(1)
            });
            clearInterval(this.intervalTimer);
          }
        }, 100)
      },
      toPart(){
        this.$router.push({name:'Part'})
      },
      getCourseInfo(flag){
        let member_id = localStorage.getItem('extendAbcMemberid');
        let lesson_id = this.$route.query.id,_this=this;
        let wUrl = this.$common.config.gzhUrl + "v3/marketingcourse/course/info"
        let fd = this.$common.getParam('get', {course_id:3,member_id: member_id,lesson_id:lesson_id});
        this.$axios.get(wUrl+'?'+fd).then((res) => {
          if(res.data.code == 200){
            let con = res.data.data.content
            this.vid = con.vid;
            this.title = con.intro
            this.questions = con.questions;
            if(flag>0){
              console.log(flag)
              this.setSrc();
            }
            for(let i in this.questions){
              if(!this.questions[i].self_answer){
                this.hasAnswer = false;
                return
              }else {
                this.hasAnswer = true;
              }
            }
          }
        })
      },
      activeLesson(lid){
        let member_id = localStorage.getItem('extendAbcMemberid'),lesson_id=this.$route.query.id;
        let wUrl = this.$common.config.gzhUrl + "v3/marketingcourse/course/lesson-location"
        let fd = this.$common.getParam('get', {course_id:3,member_id: member_id,lesson_id:lesson_id,location:lid});
        this.$axios.get(wUrl+'?'+fd).then((res) => {
          if(res.data.code == 200){
          }
        })
      },
      showEject: function (text) {
        this.ejectText = text
        this.ejectStatus = true
      },
      initEject: function () {
        this.ejectStatus = false
      },
      shareConfig(){
        let member_id = localStorage.getItem('extendAbcMemberid')
        let lUrl = encodeURIComponent(window.location.href)
        let wUrl = this.$common.config.gzhUrl + "v3/wechat/wechat/get-wechat"
        let fd = this.$common.getParam('get', {url: lUrl, member_id: member_id});
        let link = window.location.origin + '/extend/gk/index.html'
        let configObj = {
          title:'孩子超爱的科普课——奇妙世界365问',
          desc: '大千世界的365个视频，天天都有新知识',
          imgUrl: 'https://qnfile.abctime.com/extend/gk/gk_share.png',
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
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseWXPay', 'showMenuItems'] // 功能列表，我们要使用JS-SDK的什么功能
          });
          wx.ready(function () {
            wx.checkJsApi({
              jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseWXPay', 'showMenuItems'],
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
  .Lesson{
    width: 100vw;
    min-height: calc(~'100vh - .9rem');
    background: #EFF9EA;
    position: relative;
    padding: .3rem 0 .6rem;
    .video_wrap{
      width: 6.54rem;
      height: 3.78rem;
      margin: auto;
      background: #FFFFFF;
      box-shadow: 0 .03rem .09rem 0 rgba(0,0,0,0.08);
      border-radius: .24rem;
      .video{
        width: 100%;
        height: 100%;
        border-radius: .24rem;
      }
    }
    .lesson_title{
      display: inline-block;
      width: 4.9rem;
      /*height: .9rem;*/
      line-height: 1.5;
      /*line-height: .9rem;*/
      font-family: FZY4JW--GB1-0;
      font-size: .3rem;
      color: #333333;
      letter-spacing: 0;
      background: #FFFFFF;
      box-shadow: 0 .03rem .09rem 0 rgba(0,0,0,0.08);
      border-radius: .45rem;
      padding: .2rem .2rem .2rem 1.3rem;
      text-align: left;
      /*padding: .2rem .4rem .2rem 0;*/
      margin: .4rem auto;
      position: relative;
      span{
        width: 1.3rem;
        height: .4rem;
        display: inline-block;
        text-align: center;
        position: absolute;
        top: calc(~'50% - .2rem');
        left: 0;
        /*padding-right: .2rem;*/
      }
    }
    .questions{
      .que_hd{
        width: 7rem;
        height: 1rem;
        line-height: 1rem;
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArwAAABkCAMAAABTlhMaAAAAmVBMVEUAAAD/0yf90iX/0ib90ib90iX90yb/0yf/4Dj90iX80ib90yb90ib80yb/0yj/1Cv90iX90iX80iX90iX80ib/1Cj/0ij/2y390iX90iX90iX90ib80yf/0yb90SX80iX90yb90iX/1Cb/1Sb90iX80iX90iX90ib/1Sv90ib80ib90iX90iX/0yj/2ij//1b/1yn80iX80SUjSzCtAAAAMnRSTlMATNE+35BoNwfwvHhwXCUd4smspWNGMw346p6GV1L8w5qUQjvXsIqBEea1e2wrFAMZuVuEy4YAAAPDSURBVHja7NzXctpQEIDhPWpIqFdQR4BAGDD2vv/DZcFJJg0HO4mjY+93f3T1z86qjOAZptAVvKoJwqjbJyJ7OAFjL3R6yESy76IwaPAqRRcmvIZaWHibJlcei9KpVG8Axp4xeGrllMWjkjd4G6tQ4YVMQ8PXaHbKNNbtREy8GTBGZt5EJLYeT5Vdg6+hGeZL0nV2+OfmAYXcbR03zXwu+UOZ+VnqOtuOgg3m+Od2zs35Cg3/ujmN5GixsY0qzbyBt+R35jR4WVoZ9mYR0YCd41+nCbiF3+O/Z2khtVzahitWR57L8pn5x5VwDbukWkPNwn+v9+G3agvfXmNpStvH3aXmZeY9cM6jMnvwsuWl1S7uW0WzGnx7Vg3PM3Uch8YKlPAxKvTSPiSVUM9B87LxBk7nUFVRJQe71IvoMVQCSnUcdBOeMbQ4ZvNcU8JpHy/0cu8Ybp2q2dG/5yn9KrN7/5ipae0azr7UF3E/DRUtn+OYtQNc5a9RSvM8WFPVdxFlvdna1HUllqvs6FHZJnxYJvXpHbPVUlRUqL3dUKLRHTW6DkYe6VVrH67wAnyP5tal7fYcd0F1l9s99Z24VS1SdUKJU+PDzJRmKTmZs4GqpCwnairqyk2ozP22pDaLc5ztpU5L0jx/I/CuzN332e7tGso8DzSNSg9bav2uj6I4LopF1+kbap6itx3ncDCMhLiuW1V1XQsh0jRdEvXJikx+sCLqkyWhA3SMDlcVXSYhhnE4OI5NEVKFG73rFkURx1HU31GNbUg9alqQU5Jj2T//l8CHXxgk3RnYx7Ie4CfmuO/VGPusNeFHY3lGxthv6PCDGhmTRA3f8S1kTBKWD9/qkTFp9PANgYxJRMBXpoaMSUQz4QsHGZOKA5+ZO2RMKjsTnhjImGQMeMIbL5OOBhcqMiYdFc4KZEw6BRCTX64xCVkmv6BgshL8ORmTlQ4ACjImIQXgHhmT0j2kyJiUUjggY1I6QIeMSamDKTImpSk/bGCyUvirHCYrDXJkTEo5vM9fWrEPYA7ImKQ4XiYtjpdJi+Nl0uJ42Sd26YAEAAAAQND/1+0IdINb8rIlL1vysiUvW/KyJS9b8rIlL1vysiUvW/KyJS9b8rIlL1vysiUvW/KyJS9b8rIlL1vysiUvW/KyJS9b8rIlL1vysiUvW/KyJS9b8rIlL1vysiUvW/KyJS9b8rIlL1vysiUvW/KyJS9b8rJVu3RAAgAAACDo/+t2BLpBedmSly152ZKXLXnZkpctedmSly152ZKXLXnZkpctedkKaqY7lPPtl4cAAAAASUVORK5CYII=');
        background-size: cover;
        margin: auto;
        font-family: FZY4JW--GB1-0;
        font-size: .32rem;
        color: #FFFFFF;
        letter-spacing: 0;
      }
      .que_content{
        width: 7rem;
        margin: auto;
        background: #fff;
        border-radius: 0 0 .4rem .4rem;
        padding-bottom: .4rem;
        .q_no{
          font-family: FZY4JW--GB1-0;
          font-size: .32rem;
          color: #333333;
          letter-spacing: 0;
          text-align: left;
          padding: .4rem 0 .2rem 1.1rem;
        }
        .q_title{
          font-family: FZY4JW--GB1-0;
          font-size: .3rem;
          color: #A4A4A4;
          letter-spacing: 0;
          width: 6rem;
          margin: auto;
          text-align: center;
        }
        .ans_box{
          text-align: left;
          padding-left: .5rem;
          margin-top: .4rem;
          position: relative;
          .ans_title{
            display: inline-block;
            vertical-align: top;
            width: .74rem;
            height: .74rem;
            border-radius: 50%;
            background: #FCD125;
            font-family: FZY4JW--GB1-0;
            font-size: .5rem;
            line-height: .74rem;
            color: #FFFFFF;
            letter-spacing: 0;
            text-align: center;
          }
          .ans_content{
            display: inline-block;
            vertical-align: middle;
            width: 5rem;
            /*min-height: .74rem;*/
            font-family: FZY4JW--GB1-0;
            font-size: .32rem;
            color: #333333;
            letter-spacing: 0;
            padding-left: .5rem;
            padding-top: .2rem;
          }
          .ans_icon{
            width: .52rem;
            height: .52rem;
            background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAgVBMVEUAAAD/TU3/Tk7/Tk7/UVH/Tk7/Tk7/Tk7/UFD/TU3/UFD/TU3/T0//Tk7/TU3/TU3/WFj/Tk7/VVX/TU3/Tk7/Tk7/Tk7/T0//Tk7/UFD/X1//Tk7/fHz/TU3/Tk7/Tk7/TU3/Tk7/Tk7/TU3/UFD/Tk7/Tk7/Tk7/Tk7/Tk7/TU3ASJrxAAAAKnRSTlMA+byUJvCpzi6KIeg+3K96EmYM4mTsyFA0HQeZBLZ/WcB8RPUZpKFKxmxvLF9bAAACMElEQVRIx5VW7WKCMAxMCwyKogLCYIif++T9H3A911FpcXH3Q4EQktwlbWkGYR7IrBKiymSQh/QAElUOE5QqYVwaOcxANn+4pE/mrUW9CtbrYFUvzIOn9I7LTokBiPfJTbb7eACE2s35bOTV2KVe/E7AIjczlGWwrMJZOlewZZ7tHKGUJd3BEsVFZ+db8Ilbuos2hlc4qScDQwX9gQLMZjd17SR8iAG8pOVQIbeCcyqQoRo5FZqDlli0mg2R3sQFbyyWtooG+tBDgF4NAVIH/eUyj+rUb8k6yo0yuhCJi0R7d2QQ6eoSd1h0KZG57vTLiaFu/PoREi6nhUD3429QQ2Cp6bYqg1bxTBbPAnqMomp7qdPUz/Y3Ykh4bcf7LXyk1XCvb0PKr1lavFwH8WTuTtcJfLFmMJBToEunCQK8GDiXIxb6AQivaYr1z+dN0PXUWIP0zCrrFPJqyvP0zaga47uUCUOkl3xFYkzAFcdI5ucu6AInH4cBONCsE7RVTCQvPUj8ztTkEQHKe4Y9n3KEY3TyxUXFIdcRbhu1+GV7z2lY0Hfku3w6GqTgy86TM4Tmn5lcZ9xB+qXl1wi7sAAf2vttXI36mdWoj3J3CSOJy38ulpQIRwx2WQaU08/8BgCcR8L4rcYHv6k5SA4Fv306aMRQfnAbtYvtAL02Dx8JbNsNlyBkDh9T7E7aCOsXc8xx0vgcflD174o9UFnBeuboNo9QZTOHRB6vh66Py8v94+g3HFdjhz3932gAAAAASUVORK5CYII=');
            background-size: cover;
            position: absolute;
            right: 1rem;
            top: .12rem;
            &.ans_icon_right{
              background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAA1CAMAAADWOFNCAAAAolBMVEUAAAA37k1X/2E37kw37k037kxE+ldZ/3E37kw47k0470068U837kw37k068U5D/1o47kw47k037k037kw47k0470058E457k437kw37kw47U0470058E878VU37k047kw47k4771E99VE47k0/81U37k037k037k037k037kw370047k438E458E4+81A37Uw570058E837k047U047kw37Uywqcf3AAAANXRSTlMA+wX38u4NAtWGeiq6tjUJ6Y9Y5HNcUjvaz5+VJhHEpWQgGWsV38m/r6uKTUVAHJ5HMJqCaPfPHK8AAAK0SURBVEjHlZbpgqowDIXDJqvI4i64MI67Xmfp+7/aTXrrdLAVuN+PGUNoS3JORNBjbjdFGBa3HnSlzD6n7IG19K8utHI9WuyJ3K+gkbDPdNh+w6Pe5gYjjCgYXcKyis/fqXjY5M0EPWObV3IclbXjgxkjZjfQEfDkaqNmzh4/LlYzgxVl9jHocNcJPUWmCLSkRQG8Ysvzb1BnTp0aw2vMP9SmS+3akGT5gEboHqcAyR07bsXQwgmXeVK4noNxBm24ZIE/P6GPkQ/t9DwsLRRBZaGGLnTgA7fvi8+f+PkOnSBRJ0AUBqoL3djgvcufqlr6Vy1tIXCKN4fUmZyxHTSy9VAp4WXRuJic1Nw6Mn0kgilqJiQPoYHBktQtf0m9BUDp3qEBk7SdViCYYHQGeGds3mSII1l0I2Ps4hD/Sl/c94sBaIYhkZ7lpyxg8GtsElTeBIHstFMbhh1jB+jh5cdcUa+ONWt90dhN4DcH6ietelwOEzL100hZF6ixQHfUVsEHjUwKD9Y0vmO10D2vSyYmNoZfIsgMDEbwRES2NzGzltcuFqPOEmeDN+oZdNcKwKLNJWNDbHO19FZzuFI77jHJiIrJILb1A17SplwRu9btN1o2dBipqTL6N1dj+qf56qbH13DEQ0yAylA29RlxMHVetkVB6GlnoCjJIt0iOD/EGKuquKl9kBs9udDu8UMTnLABdCKT3gmEMO2YU6ymFCP+jsduoQNDub+srI0rtjuXtfSZs4FWiqeXiDnZdns3sBP8Hxua9L6rtnVkwksmiXjnqQ3yYtDjftPcTAs1w1/XqVbu+4wh+xJUwpxSzummPFzEiIWpb9InzxqH71B297LIGeGsX8v4+GGYRKs08OeRZzOOdSqbjJbtmIqxavVAPM/ra7zgBl0o1vNolltWMu2nWQUqfwEh8HqoslWUuwAAAABJRU5ErkJggg==');
              background-size: cover;
            }
          }
          &.active{
            .ans_title{
              color: #4ec371;
            }
          }
        }
      }
      .submit_btn{
        width: 6.28rem;
        height: 1rem;
        line-height: 1rem;
        background-image: linear-gradient(133deg, #FFDB14 0%, #83FAD9 100%);
        box-shadow: 0 .03rem .18rem 0 rgba(26,62,21,.5);
        border-radius: .5rem;
        font-family: PingFangSC-Semibold;
        font-size: .4rem;
        color: #FFFFFF;
        letter-spacing: 0;
        margin: .6rem auto 0;
      }
    }
    .back{
      position: fixed;
      width: .54rem;
      height: .59rem;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA7CAMAAAAHBYkxAAAAz1BMVEUAAACtXSfsgDmsXCfadjSsWyesWyjtgTzlfDfsgDnHay/sgDmrXCjsgDnrgDnsgDqsXCjsgDmsXCjrgDmsWyfsgDqsXSntgDnsgDvsgTqtWyjrgTutXCjtgTutXinrgTvugj6wYCjwgz6yXS7/qlXScDKrWyjrfzm4YyzrfzmrWyf////1wqH87ePtjE27ZCzmfDfScDH98ergeTXDaC70uZPtkFS0YCn76t741L330Lfyq33++PX75dfwoW3528jvmmPulFrrgTvxpnXsiUiyFroIAAAAKXRSTlMAQOzs/t2WP/z5/fv639rLy7+/tradnZiUbW1nZ1dXQS0tISED/Pnv7wOIpW0AAAIjSURBVEjHndXpeppQEIDhYRfjHpdo3DXLDE0ApcUtpml7/9dUKDYpnI3m++vzPnM2FXjNh4N2XXddvd4eDOdQKqenYy695yjRpIGcGhMpmjVRUHMmRMtrlHS9FGxKR2k6d4u3Lipybxm0vsES3awLLFNqV1ghliy3Tscty1znQy2FZ/hzvz8XzvPjHoT39cVLOhbu7/1tSJW3w3yzC2tKlbcpvrNMTeTKO2Ch7F035OrpF/N9SJWjUM/I5CSsp1JsvYTpKsWmA8zVim0OQ7ViG8JArdgG0FYrtjbUsdCrWmEdHtSz2B7gCvNtWMV2JWKbb3JWwXxfvRKuwjA8qF3CTMT/n2fCHX7C3UEVxe7lh4BV4REl7ruAPYIVcJ2UBRZ0QhS6nWCRYQdsH7kdn06vyZG8vSGbb8OItijs+SU5F+aZbWkEC4rEbO8l7bFQRAsAQzLulLITM8wAgD75Qrbj/Zj71E+YRmSK2JHz12ESaZBkURyI3PlwOBfuLCYL0qZEPpbOJ5rCn1pEUVkVEbUgSyOisJwKKd3ZpW7BSVUX/rYyiCgqtUIyVvCeViMiP5CjwCeimgb/NKak2JQpM6akMeSyKc3fitDWpzQb8q0zR9GWiyLK1BqKjWuUTQyDwp5CP/ukNgZOmkGX4mpoVoIEVMywGtMlQwNuqy5J6q5AlNYSoZYGsqYWD1lTUKX1jbwx+hqUajGyO5Zxf29YHXu0AE6/AZNVmZgnIaFjAAAAAElFTkSuQmCC');
      background-size: cover;
      top: .18rem;
      left: .23rem;
      z-index: 1000;
    }
  }
</style>

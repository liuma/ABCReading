<template>
  <div class="Lesson">
    <div class="video_wrap">
      <div class="video" id="video" ref="video">
        <!--<script  src="https://p.bokecc.com/player?vid=E0ABAE9D4F509B189C33DC5901307461&siteid=FE644790DE9D154A&autoStart=false&width=100%&height=100%&playerid=FA25B02F7A04F6AC&playertype=1" type="text/javascript"></script>-->
      </div>
      <div class="lesson_info"><p>{{title}}</p></div>
    </div>
    <div class="questions">
      <div class="que_hd">小试牛刀</div>
      <span class="que_num">共{{questions.length}}个题目</span>
      <div class="que_content">
        <ul>
          <li v-for="(item,index) in questions">
            <p class="q_no">第{{index+1}}题</p>
            <p class="q_title">{{item.title}}</p>
            <div :class="opt.active?'ans_box active':'ans_box'" v-for="(opt,$index) in questions[index].options" @click="checkAns(opt,$index,index,opt.title,item.answer)">
              <span :class="hasAnswer&&item.answer==opt.title?'ans_title ans_title_r':item.self_answer==opt.title?'ans_title ans_title_w':'ans_title'">{{opt.title}}</span>
              <p class="ans_content">{{opt.content}}</p>
              <div v-show="(hasAnswer&&item.answer==opt.title)||(hasAnswer&&item.self_answer==opt.title)" :class="item.answer==opt.title?'':'ans_icon'"></div>
            </div>
            <div class="explain_box" v-if="hasAnswer">
                <p class="explain_title">答案详解</p>
                <div :class="item.showEx?'icon_arrow icon_arrow_active':'icon_arrow'" @click="item.showEx = !item.showEx"></div>
                <p class="explain_content" v-show="item.showEx">正确答案 {{item.answer}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="!hasAnswer" class="submit_btn" @click="recordAnswer()">提交答案</div>
      <div v-show="hasAnswer&&next_lesson_id>0" class="submit_btn next_btn" @click="nextLesson()">下一讲</div>
    </div>
    <eject :message="ejectText" :showState="ejectStatus"></eject>
    <div class="right_wrap" v-if="showRight">
        <img src="../../assets/imgs/right_icon.png" class="right_img">
        <div v-show="next_lesson_id>0" class="next" @click="nextLesson()">继续学习</div>
        <div class="hold" @click="showRight=false">复习一下</div>
    </div>
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
        rightBox:[],
        hasAnswer:true,
        showRight:false,
        next_lesson_id:'',
        configData:{
            title:'用手绘重新定义阅读',
            desc: '全面锻炼逻辑思考、多维学习力、图像记忆力等六大能力！',
            imgUrl: 'https://qnfile.abctime.com/extend/list_share6.png',
        },
        lessonUrl: '/extend/swdt/index.html',
      }
    },
    created(){
      // this.getInfo()
      this.shareConfig()
      this.lesson_no = parseInt(this.$route.query.no) + 1;
    },
    mounted(){
      this.getCourseInfo(1)
      this.shareConfig()
      // this.setSrc()
      this.$nextTick(function () {

      })
    },
    methods: {
      nextLesson(event){
        if (event) event.preventDefault();
        this.showRight = false;
        if(this.next_lesson_id){
            let queryObj = {id:this.next_lesson_id}
            this.$router.replace({path:'/lesson',query:queryObj});
            this.$refs.video.innerHTML = "";
            this.ansBox = [];
            this.rightBox = [];
            this.hasAnswer = false;
            this.getCourseInfo(1);
            video.scrollIntoView();
        };
      },
      back(){
        this.$router.replace({name:'Cata'})
      },
      Explain(item,flag){
        let _this = this;
        this.$nextTick(function () {
            this.questions.forEach(function (item) {
                _this.$set(item,'showEx',!flag);
            });
        });
      },
      checkAns(item,$index,ind,ans,r_ans){
        if(!this.hasAnswer){
          this.ansBox[ind] = ans;
          if(ans == r_ans){
            this.rightBox[ind] = 1;
          } else {
            this.rightBox[ind] = 0;
          }
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
        let ansTag = this.rightBox.join(',');
        if(this.ansBox.length < this.questions.length){
          this.showEject('还有未选择的题目哦～')
          return
        }else{
            for(let i=0; i < this.ansBox.length; i++){
                if(!this.ansBox[i]){
                    this.showEject('还有未选择的题目哦～');
                    return;
                }
            }
        }
        let member_id = localStorage.getItem('extendAbcMemberid');
        let lesson_id = this.$route.query.id,_this=this;
        let wUrl = this.$common.config.gzhUrl + "v3/marketingcourse/course/record-answer"
        let fd = this.$common.getParam('get', {member_id: member_id,lesson_id:lesson_id,answer:ans});
        let conf = {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
        this.$axios.post(wUrl,fd,conf).then((res) => {
          if(res.data.code == 200){
            _this.activeLesson(2);
            _this.getCourseInfo(0);
            if(ansTag.indexOf('0')<0){
                _this.showRight = true;
            };
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
            this.next_lesson_id = res.data.data.next_lesson_id
            if(flag>0){
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
            this.questions.forEach(function (item) {
                _this.$set(item,'showEx',false);
            });
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
        let link = window.location.origin + this.lessonUrl
        let configObj = {
          title: this.configData.title,
          desc: this.configData.desc,
          imgUrl: this.configData.imgUrl,
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
    height: 100vh;
    background: #FCFCFC;
    position: relative;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    .video_wrap{
      width: 100vw;
      margin: auto;
      .video{
        width: 100%;
        height: 4.22rem;
        background: #000;

      }
      .lesson_info{
        width: 100%;
        background: #FFF;
        box-shadow: 0 .02rem .06rem 0 rgba(0,0,0,.1);
        text-align: left;
        p{
            padding: .24rem 0 .32rem .32rem;  
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            font-size: .36rem;
            color: #333;
            letter-spacing: 0;          
        }
      }
    }
    .questions{
        margin-top: .28rem;
        background: #FFF;
        box-shadow: 0 .02rem .06rem 0 rgba(0,0,0,.1);
        position: relative;
        padding-bottom: .4rem;
      .que_hd{
        padding: .24rem 0 0 .32rem;
        text-align: left;
        font-family: PingFangSC-Semibold;
        font-weight: bold;
        font-size: .32rem;
        color: #333;
        letter-spacing: 0;
      }
      .que_num{
          font-family: PingFangSC-Regular;
            font-size: .24rem;
            color: #999;
            letter-spacing: 0;
            position: absolute;
            right: .32rem;
            top: .3rem;
      }
      .que_content{
        li{
             width: 6.86rem;
            margin: .28rem auto 0;
            background: #fff;
            box-shadow: 0 .02rem .06rem .01rem rgba(0,0,0,.12);
            border-radius: .16rem;
            padding: .29rem 0 .28rem 0;
        }
        .q_no{
          font-family: PingFangSC-Semibold;
          font-weight: bold;
          font-size: .24rem;
          color: #FFF;
          letter-spacing: 0;
          width: 1.32rem;
          height: .32rem;
          line-height: .32rem;
          text-align: center;
          background: #FFAA72;
          border-radius: 0 1rem 1rem 0;
          position: relative;
          &::before{
            content: '';
            width: .04rem;
            height: .42rem;
            background: #FC8F48;
            border-radius: 0 1rem 1rem 0;  
            position: absolute;
            left: 0;
            top: -.05rem;        
          }
        }
        .q_title{
          font-family: PingFangSC-Regular;
          font-size: .32rem;
          color: #333;
          letter-spacing: 0;
          width: 6.2rem;
          margin: .15rem auto 0;
          text-align: left;
        }
        .ans_box{
          text-align: left;
          padding-left: .5rem;
          margin-top: .4rem;
          position: relative;
          font-family: PingFangSC-Regular;
          font-size: .32rem;
          color: #333;
          .ans_title{
            display: inline-block;
            vertical-align: top;
            width: .64rem;
            height: .64rem;
            line-height: .64rem;
            border-radius: 50%;
            background: #FFF;
            border: .01rem solid #aaa;
            text-align: center;
            &.ans_title_r{
                background: #6EBC2F;
                border: .01rem solid #6EBC2F;
                color : #FFF;
            }
            &.ans_title_w{
                background: #FF7263;
                border: .01rem solid #FF7263;
                color : #FFF;
            }
          }
          .ans_content{
            display: inline-block;
            vertical-align: top;
            width: 5rem;
            margin-top: .1rem;
          }
          .ans_icon{
            width: .26rem;
            height: .26rem;
            background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaBAMAAABbZFH9AAAAGFBMVEUAAAD/c2T/c2P/c2P/dGT/c2b/c2P/cmNKeydVAAAAB3RSTlMAgezacDxxJEUOAwAAAGtJREFUGNNlkMENgDAMA8MG5cUCCCZA/PkwQCcpIHl9BFwlrPYRy7mqaRx5inq2JVYlTKczZhXcoCN2KYF0PaWAlGp9u0hFKD0gCNh/CCgQEAQEtY6b/opPaKb7z1Cgb+TbehKekieYx1+6N4pdN6n8gRCvAAAAAElFTkSuQmCC');
            background-size: cover;
            position: absolute;
            right: .4rem;
            top: .19rem;
          }
          &.active{
            .ans_title{
              background: #FFAA72;
              color: #FFF;
              border: .01rem solid #FFAA72;
            }
          }
        }
        .explain_box{
            width: 6.38rem;
            margin: .36rem auto 0;
            border-top: .02rem solid #DDD;
            text-align: left;
            position: relative;
            .explain_title{
                font-family: PingFangSC-Regular;
                font-size: .24rem;
                color: #333;
                letter-spacing: 0;
                padding: .28rem 0 0;
            }
            .icon_arrow{
                width: .26rem;
                height: .16rem;
                background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAMAAAA/D5+aAAAAYFBMVEUAAACkpKSampqampqZmZmcnJyhoaGampqZmZmZmZmampqZmZmbm5uhoaGampqampqampqampqampqampqZmZmampqbm5uampqcnJyampqcnJyampqZmZmampqcnJyZmZkzL15cAAAAH3RSTlMABcd82B0L+PLsimRPEuO3r6ail5BvYlg5KBjR0L0seLNkAQAAAJVJREFUGNNtkFkOwyAMRIdA9rXNni6+/y3bgVZBkPcBth8aSwBHhpj9Wa7QUjSRSTuREoVIvgamNSJikMiXGj4ZZ/mG1NDNnlE9J9xyPFjpU93YLy7ZZlZ/M/kvsxe70TWa9XSmD+zvCkBtK3+zzR8UGt69gs/IWVLlPMPvqeSHaRGinelSxMw05Y4rFpFiwzXv2k/7AOKaDo7rMESNAAAAAElFTkSuQmCC');
                background-size: cover;
                position: absolute;
                top: .3rem;
                right: .2rem;
                &.icon_arrow_active{
                    -webkit-transform: rotateX(180deg);
                    -moz-transform: rotateX(180deg);
                    -o-transform: rotateX(180deg);
                    transform: rotateX(180deg);
                }
            }
            .explain_content{
                font-family: PingFangSC-Regular;
                font-size: .28rem;
                color: #6EBC2F;
                padding-top: .28rem;
            }
        }
      }
      .submit_btn{
        width: 6.52rem;
        height: 1.08rem;
        line-height: 1.08rem;
        background-image: linear-gradient(90deg, #FFAA6C 0%, #FF564D 100%);
        box-shadow: 0 .04rem .08rem 0 rgba(79,28,24,.3);
        border-radius: .54rem;
        font-family: PingFangSC-Semibold;
        font-weight: bold;
        font-size: .4rem;
        color: #FFFFFF;
        letter-spacing: 0;
        margin: .6rem auto;
        &.next_btn{
            background-image: linear-gradient(90deg, #94D328 0%, #51AA35 100%);
            box-shadow: 0 .02rem .06rem 0 rgba(0,0,0,.3);
        }
      }
    }
    .right_wrap{
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100001;
        background: rgba(0,0,0,.7);
        .right_img{
            width: 4.26rem;
            height: 2.81rem;
            margin: 3rem auto 0;
        }
        .next{
            width: 4.8rem;
            height: .88rem;
            line-height: .88rem;
            margin: 1.09rem auto .44rem;
            background-image: linear-gradient(90deg, #94D328 0%, #51AA35 100%);
            box-shadow: 0 .02rem .06rem 0 rgba(0,0,0,.3);
            border-radius: .44rem;
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            font-size: .28rem;
            color: #FFF;
            letter-spacing: 0;
            text-align: center;
        }
        .hold{
            width: 2.56rem;
            height: .68rem;
            line-height: .68rem;
            margin: auto;
            background-image: linear-gradient(269deg, #BC6E3C 0%, #D48C5C 100%);
            box-shadow: 0 .04rem .08rem 0 rgba(79,28,24,0.20);
            border-radius: .34rem;
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            font-size: .24rem;
            color: #FFF;
            letter-spacing: 0;
            text-align: center;
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

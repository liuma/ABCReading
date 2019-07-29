<template>
  <div class="detail">
    <div class="video_player" v-show="showVideo">
    <div class="close" @click="closeVideo()">关闭</div>
    <video 
        ref="video" src="" id="video" controls
        webkit-playsinline="true"
        playsinline="true"
        x5-playsinline="true"
        x-webkit-airplay="true"
        x5-video-player-type="h5"
        x5-video-player-fullscreen="true"
        x5-video-ignore-metadata="true"
    ></video>    
    </div>
    <img src="../assets/images/detail_hd.png" class="detail_hd">
    <div class="detail_hd_title">
      <img src="../assets/images/detail_title_bg.png">
      <span>2019.6.1~2019.6.30</span>
    </div>
    <div class="works">
      <p class="works_name">{{works.nick_name}}的代言</p>
      <p v-show="view_self" class="works_dval">当前排名为第 <span>{{rank_info.rank}}</span> 名</p>
      <p v-show="view_self" class="works_dval">距离上一名还差 <span>{{rank_info.dValue}}</span> 赞，快去分享吧！</p>
      <div class="works_video">
        <div class="video_box_wrap">
          <div class="video_box">
              <div class="btn_play" @click="playVideo(works.video)"></div>
              <div class="use_time">
                  <span v-if="item.val == works.use_time" v-for="item in timeList">
                    阅读{{item.name}}
                  </span>
              </div>
              <span class="like_num">{{works.like_num}}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-show="view_self" class="share_btn" @click="toSubmit()">邀请好友为你加油吧～</div>
    <div v-show="!view_self && !has_like" class="share_btn" @click="like(0)">支持TA</div>
    <div v-show="!view_self && has_like" class="share_btn dis">谢谢支持</div>
    <div class="rank_list">
      <ul>
        <li v-for="(item,$index) in rankList">
          <div class="video_wrap">
            <div :class="'rank_ind rank'+item.rank">{{item.rank}}</div>
            <div class="video_box">
              <span class="time">阅读{{timeList[item.use_time].name}}</span>
              <div class="like_num"><span class="icon"></span>{{item.like_num}}</div>
              <div class="btn_play"></div>
            </div>
          </div>
          <p class="user_info"><span class="nick_name">{{item.nick_name}}</span><span class="age">{{item.age}}岁</span></p>
          <div :class="item.has_like?'like_btn liked':'like_btn'" @click="like(item.has_like,item.member_id)">{{item.has_like?'成功支持':'支持TA'}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Eject from './Eject'
export default {
  name: 'Index',
  components: {
    eject: Eject,
  },
  data(){
    return{
      works:{
        nick_name:'',
        dValue: 0,
      },
      rank_info:{

      },
      my:{},
      has_expire: 0,
      rankList: [],
      timeList: [],
      view_self: 1,
      showVideo: false,
      has_like: 0,
    }
  },
  created(){
  },
  mounted(){
    this.getDetails();
    this.timeList = this.$parent.$data.timeList;
  },
  methods:{
    playVideo(src){
        let vSrc = src;  
        if(vSrc){
            this.showVideo = true;
        } 
        this.$refs.video.src = 'https://abcreading-video.oss-cn-beijing.aliyuncs.com/' + vSrc;     
        this.$refs.video.play();
    },
    closeVideo(){
        this.$refs.video.pause();
        this.showVideo = false;
    },
    like(flag,au_id){
      if(!flag){
        let openid = window.localStorage.getItem('voteOpenid')
        let memberId = window.localStorage.getItem('voteMemberid')
        let auhtor_id = this.$common.GetRequest().au_id || memberId
        let likeUrl = this.$common.config.gzhUrl + 'v3/vote/vote/like'
        let fd = this.$common.getParam('get',{openid:openid,member_id:memberId,author_id:auhtor_id});
        let conf = {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
        this.$axios.post(likeUrl,fd,conf).then((res) => {
          if(res.data.code == 200){
          this.getIndexInfo();
        }
      })
      }
    },
    getDetails(){
      let openid = window.localStorage.getItem('voteOpenid')
      let memberId = window.localStorage.getItem('voteMemberid')
      let indexUrl = this.$common.config.gzhUrl + 'v3/vote/vote/detail'
      console.log(this.$common.GetRequest());
      let au_id = this.$common.GetRequest().au_id || memberId
      console.log(au_id);
      let fd = this.$common.getParam('get',{openid:openid,member_id:memberId,author_id:au_id});
      this.$axios.get(indexUrl+'?'+fd).then((res) => {
        if(res.data.code == 200){
          this.has_expire = res.data.data.has_expire
          this.rankList = res.data.data.list
          this.works = res.data.data.works
          this.has_like = res.data.data.has_like
          if(!this.works.use_time){
              this.works.use_time = 1;
          }
          this.view_self = res.data.data.view_self
          if(res.data.data.rank_info){
              this.rank_info = res.data.data.rank_info
          }
          if(res.data.data.my){
              this.my = res.data.data.my
          }
        }
      })
    },
    toSubmit(){
      this.$router.push({name:'Submit'})
    },
    shareConfig(){
      let member_id = localStorage.getItem('voteMemberid')
      let lUrl = encodeURIComponent(window.location.href)
      let wUrl = this.$common.config.gzhUrl + "v3/wechat/wechat/get-wechat"
      let fd = this.$common.getParam('get', {url: lUrl, member_id: member_id});
      let link = window.location.origin + '/extend/letter/index.html?view_member_id='+member_id
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
  },
}
</script>
<style scoped lang="less">
  *{
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }
  img{
    display: block;
    margin: auto;
  }
  .detail{
    position: relative;
    background: #392E70;
    padding-bottom: .3rem;
    .detail_hd{
      width: 100%;
      height: auto;
    }
    .detail_hd_title{
      position: absolute;
      top: 3.6rem;
      left: 0;
      img{
        width: 6.16rem;
        height: auto;
        margin-left: .9rem;
      }
      span{
        position: absolute;
        left: 2.7rem;
        top: .24rem;
        transform: rotate(-3deg);
        font-family: FZY4JW--GB1-0;
        font-size: .3rem;
        color: #F3DA2A;
        letter-spacing: -.003rem;
        text-align: center;
      }
    }
    .works{
      .works_name{
        font-family: PingFangSC-Semibold;
        font-weight: bold;
        font-size: .5rem;
        color: #F6DB2E;
        letter-spacing: .023rem;
        text-align: center;
        text-shadow: 0 .04rem .02rem rgba(0,0,0,.78);
        padding: .6rem 0 .2rem;
      }
      .works_dval{
        font-family: FZY4JW--GB1-0;
        font-size: .28rem;
        color: #FFF;
        letter-spacing: .009rem;
        line-height: .53rem;
        text-align: left;
        padding: 0 0 0 1rem;
        span{
            font-family: FZPTYJW--GB1-0;
            font-size: .5rem;
            color: #EF3A5C;
            letter-spacing: .09rem;
        }
      }
      .works_video{
        width: 6.95rem;
        height: 6.07rem;
        background: url('../assets/images/detail_works_bg.png');
        background-size: cover;
        margin: .5rem 0 0 .5rem;
        padding-top: .55rem;
        .video_box_wrap{
          width: 4.34rem;
          height: 5.33rem;
          padding-top: .17rem;
          background: #8159C9;
          border-radius: .2rem;
          margin-left: 1.1rem;
          .video_box{
            width: 4.04rem;
            height: 5.16rem;
            background: #FFFFFF;
            border-radius: .2rem;
            margin:auto;
            position: relative;
            .btn_play{
              width: 1.15rem;
              height: 1.15rem;
              background: url('../assets/images/icon_play.png');
              background-size: cover;
              position: absolute;
              left: 1.45rem;
              top: 2rem;
            }
            .use_time{
                font-family: FZY4JW--GB1-0;
                font-size: .26rem;
                color: #8159C9;
                letter-spacing: .008rem;
                line-height: 1;
                position: absolute;
                left: .16rem;
                bottom: .3rem;
            }
            .like_num{
                font-family: FZY4JW--GB1-0;
                font-size: .28rem;
                color: #8159C9;
                letter-spacing: .008rem;
                line-height: 1;
                position: absolute;
                right: .16rem;
                bottom: .3rem;
                &::before{
                    content: '';
                    width: .66rem;
                    height: .61rem;
                    background: url('../assets/images/like_icon.png');
                    background-size: cover;
                    position: absolute;
                    left: -.7rem;
                    top: -.1rem;
                }
            }
          }
        }
      }
    }

    .share_btn{
      width: 4.84rem;
      height: 1.04rem;
      line-height: 1.04rem;
      margin: .45rem auto 1.1rem;
      background-image: linear-gradient(180deg, #FFA9A9 0%, #FF2844 100%);
      box-shadow: 0 .06rem .18rem 0 #FF1E00;
      border-radius: .67rem;
      font-family: PingFangSC-Semibold;
      font-weight: bold;
      font-size: .39rem;
      color: #FFF;
      letter-spacing: 0;
      text-align: center;
      &.dis{
        background-image: linear-gradient(180deg, #D5D5D5 0%, #8D8D8D 100%);
        box-shadow: 0 .06rem .18rem 0 #4F4F4F;
        border-radius: .67rem;
      }
    }
  }
</style>

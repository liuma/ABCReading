<template>
  <div class="index">
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
    
    <img src="../assets/images/index_hd.png" class="index_hd">
    <div class="index_hd_title">
      <img src="../assets/images/index_title_bg.png">
      <span>{{start_time}}~{{end_time}}</span>
    </div>
    <div class="index_con1">
      <ul>
        <li>1.录制宝贝阅读ABC Reading绘本的视频（只需跟读绘本即可～）；</li>
        <li>2.视频作品将进行人气投票，前30名可获得超值大奖；</li>
        <li>3.本活动所收集素材，举办方有权使用。</li>
      </ul>
    </div>
    <div class="index_con2">
      <ul>
        <li>第1-3名:摩比盒子1个，大型电子玩具1个，陶艺1个，浮水印1个，皮影1个，ABC实体书-套
        <li>第3-10名:摩比盒子1个，3D折纸汽车模型1个，恐龙化石1个，快乐果园1个</li>
        <li>第10-20名: 3D折纸汽车模型1个，恐龙化石1个，9连珠</li>
        <li>第20-30名:认数，认形状思维教具，随机1个</li>
      </ul>
      <img src="../assets/images/index_con2_img.png" class="index_prize">
    </div>
    <div class="rank_list">
      <ul>
        <li v-for="(item,$index) in rankList">
          <div class="video_wrap">
            <div :class="'rank_ind rank'+item.rank">{{item.rank}}</div>
            <div class="video_box">
              <span class="time">阅读{{timeList[item.use_time].name}}</span>
              <div class="like_num"><span class="icon"></span>{{item.like_num}}</div>
              <div class="btn_play" @click="playVideo(item.video)"></div>
            </div>
          </div>
          <p class="user_info"><span class="nick_name">{{item.nick_name}}</span><span class="age">{{item.age}}岁</span></p>
          <div :class="item.has_like?'like_btn liked':'like_btn'" @click="like(item.has_like,item.member_id)">{{item.has_like?'成功支持':'支持TA'}}</div>
        </li>
      </ul>
    </div>
    <div :class="has_expire?'join_btn dis':'join_btn'" @click="toSubmit()">{{has_expire?'活动已结束':'立即参加'}}</div>
    <eject :message="ejectText" :showState="ejectStatus"></eject>
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
      has_expire: 0,
      rankList: [],
      start_time: '',
      end_time: '',
      timeList: [],
      ejectText: '',
      ejectStatus: false,
      videoSrc: '',
      showVideo: false
    }
  },
  created(){
  },
  mounted(){
    this.getIndexInfo();
    this.timeList = this.$parent.$data.timeList;
  },
  methods:{
    playVideo(src){
        let vSrc = src || 'http://qnfile.abctime.com/abctime_adv90.mp4';  
        if(vSrc){
            this.showVideo = true;
        } 
        this.$refs.video.src = vSrc;     
        this.$refs.video.play();
    },
    closeVideo(){
        this.$refs.video.pause();
        this.showVideo = false;
    },
    showEject: function (text) {
      this.ejectText = text
      this.ejectStatus = true
    },
    initEject: function () {
      this.ejectStatus = false
    },
    like(flag,au_id){
      if(!flag){
        let openid = window.localStorage.getItem('voteOpenid')
        let memberId = window.localStorage.getItem('voteMemberid')
        let auhtor_id = au_id
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
    getIndexInfo(){
      let openid = window.localStorage.getItem('voteOpenid')
      let memberId = window.localStorage.getItem('voteMemberid')
      let indexUrl = this.$common.config.gzhUrl + 'v3/vote/vote/home'
      let fd = this.$common.getParam('get',{openid:openid,member_id:memberId});
      this.$axios.get(indexUrl+'?'+fd).then((res) => {
        if(res.data.code == 200){
          this.has_expire = res.data.data.has_expire
          this.rankList = res.data.data.list
          this.start_time = res.data.data.start_time
          this.end_time = res.data.data.end_time
        }
      })
    },
    toSubmit(){
        if(this.has_expire){
            this.showEject('来晚了，活动已结束～')
        }else {
            if(this.$common.VL.isIphone() || this.$common.VL.isIpad()){
                this.$router.push({name:'Submit'})
            }else{
                this.showEject('此活动仅限iOS用户参加哦～')
            }
        }
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
  .index{
    position: relative;
    background: #392E70;
    padding-bottom: .3rem;
    
    .index_hd{
      width: 100%;
      height: auto;
    }
    .index_hd_title{
      position: absolute;
      top: 7.86rem;
      left: 0;
      img{
        width: 7.02rem;
        height: auto;
        margin-left: .48rem;
      }
      span{
        position: absolute;
        left: 2.67rem;
        top: .24rem;
        transform: rotate(-3deg);
        font-family: FZY4JW--GB1-0;
        font-size: .3rem;
        color: #F3DA2A;
        letter-spacing: -.003rem;
        text-align: center;
      }
    }
    .index_con1{
      width: 6.99rem;
      height: 3.44rem;
      background: url('../assets/images/index_con1_bg.png');
      background-size: cover;
      margin: .3rem 0 0 .3rem;
      ul{
        margin: auto;
        padding: 1.24rem 0 0 .34rem;
        li{
          font-family: FZY4JW--GB1-0;
          font-size: .24rem;
          color: #7A5757;
          letter-spacing: .008rem;
          line-height: .4rem;
          text-align: left;
          position: relative;
          width: 6rem;
          padding-left: .4rem;
          &::before{
            content: '';
            width: .14rem;
            height: .14rem;
            display: block;
            border-radius: 50%;
            background: #7A5757;
            position: absolute;
            top: .14rem;
            left: .14rem;
          }
        }
      }
    }
    .index_con2{
      width: 7.03rem;
      height: 9.8rem;
      background: url('../assets/images/index_con2_bg.png');
      background-size: cover;
      margin: .2rem 0 0 .35rem;
      position: relative;
      ul{
        margin: auto;
        padding: 1.24rem 0 0 .2rem;
        z-index: 2;
        position: relative;
        li{
          font-family: FZY4JW--GB1-0;
          font-size: .24rem;
          color: #7A5757;
          letter-spacing: .008rem;
          line-height: .4rem;
          text-align: left;
          position: relative;
          width: 6rem;
          padding: .3rem 0 0 .4rem;
          &::before{
            content: '';
            width: .14rem;
            height: .14rem;
            display: block;
            border-radius: 50%;
            background: #7A5757;
            position: absolute;
            top: .44rem;
            left: .14rem;
          }
          &:nth-child(1){
            padding-top: 0;
            &::before{
              position: absolute;
              top: .14rem;
              left: .14rem;
            }
          }
        }
      }
      img{
        width: 6.69rem;
        height: auto;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1;
      }
    }
    .join_btn{
      width: 6.3rem;
      height: 1.2rem;
      position: fixed;
      bottom: .3rem;
      left: .6rem;
      z-index: 11;
      line-height: 1.2rem;
      margin: -.2rem auto 0;
      background-image: linear-gradient(180deg, #FFA9A9 0%, #FF2844 100%);
      box-shadow: 0 .06rem .18rem 0 #FF1E00;
      border-radius: .67rem;
      font-family: FZY4JW--GB1-0;
      font-size: .48rem;
      font-weight: bold;
      color: #FFF;
      letter-spacing: .036rem;
      text-align: center;
      &.dis{
        background-image: linear-gradient(180deg, #D5D5D5 0%, #8D8D8D 100%);
        box-shadow: 0 .06rem .18rem 0 #4F4F4F;
        border-radius: .67rem;
      }
    }
  }
</style>

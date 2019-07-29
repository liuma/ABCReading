<template>
  <div class="rank">
    <img src="../assets/images/rank_hd.png" class="rank_hd">
    <div class="index_hd_title">
      <img src="../assets/images/rank_title_bg.png">
      <span>2019.6.1~2019.6.30</span>
    </div>
    <div class="rank_list">
      <div class="rank_list_wrapper" ref="bscroll">
        <!-- <div class="content" ref="bscroll"> -->
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
        <!-- </div> -->
      </div>
            <span v-for="(item,$index) in rankList">
              {{$index}}
            </span>

    </div>
    <div class="join_btn" @click="toSubmit()">{{has_expire?'活动已结束':'立即参加'}}</div>
  </div>
</template>
<script>
import Eject from './Eject'
import BScroll from 'better-scroll'
export default {
  name: 'Index',
  components: {
    eject: Eject,
  },
  data(){
    return{
      has_expire: 0,
      rankList: [],
      timeList: [],
      page:1,
    }
  },
  created(){
  },
  mounted(){
    this.getIndexInfo();
    this.timeList = this.$parent.$data.timeList;
  },
  methods:{

    scrollFn(){
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.bscroll, {
            click: true,
            scrollY: true,
            probeType: 3
          });
        }else{
          this.scroll.refresh();
        }
        this.scroll.on('scroll', (pos) => {
          console.log(pos.y,this.dropDown)
          //如果下拉超过50px 就显示下拉刷新的文字
          if(pos.y>50){
            this.dropDown = true
          }else{
            this.dropDown = false
          }
        })
        //touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
        this.scroll.on('touchEnd', (pos) => {
            console.log(pos)
          // 下拉动作
          if(pos.y > 50){
            console.log("下拉刷新成功")
            this.dropDown = false
          }
        //   console.log('mm',this.scroll.maxScrollY)
        //   console.log(pos.y+10)
          //上拉加载 总高度>下拉的高度+10 触发加载更多
          if(this.scroll.maxScrollY>pos.y+10){
            console.log(this.scroll.maxScrollY)
            console.log("加载更多")
            this.page++;
            this.getIndexInfo()
            //使用refresh 方法 来更新scroll  解决无法滚动的问题
            this.scroll.refresh()
          }
          console.log(this.scroll.maxScrollY+"总距离----下拉的距离"+pos.y)
        })
        console.log(this.scroll.maxScrollY)
      });
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

    getIndexInfo(p){
      let openid = window.localStorage.getItem('voteOpenid')
      let memberId = window.localStorage.getItem('voteMemberid')
      let indexUrl = this.$common.config.gzhUrl + 'v3/vote/vote/all'
      let fd = this.$common.getParam('get',{openid:openid,member_id:memberId,page:this.page});
      this.$axios.get(indexUrl+'?'+fd).then((res) => {
        if(res.data.code == 200){
          this.has_expire = res.data.data.has_expire;
          let rankArr = this.rankList;
          this.rankList = [...rankArr,...res.data.data.rows];
        //   alert(JSON.stringify(this.rankList));
          this.$nextTick(function(){
                this.scrollFn();
            })
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
  .rank{
    position: relative;
    background: #392E70;
    padding-bottom: .3rem;
    .rank_hd{
      width: 100%;
      height: auto;
    }
    .index_hd_title{
      position: absolute;
      top: 5rem;
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
    .rank_list_wrapper{
      height: 15rem;
      ul{
          overflow: scroll;
      }
    }
    .join_btn{
      width: 6.3rem;
      height: 1.2rem;
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
    }
  }
</style>

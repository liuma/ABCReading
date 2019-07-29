<template>
  <div class="rank">
    <img src="../assets/images/rank_hd.png" class="rank_hd">
    <div class="index_hd_title">
      <img src="../assets/images/rank_title_bg.png">
      <span>2019.6.1~2019.6.30</span>
    </div>
    <div class="rank_list">
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit" class="scrollView">
            <!-- <div class="rank_list_wrapper"> -->
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
            <!-- </div> -->

        </mescroll-vue>

    </div>
    <div class="join_btn" @click="toSubmit()">{{has_expire?'活动已结束':'立即参加'}}</div>      
  </div>
</template>
<script>
import Eject from './Eject'
// import BScroll from 'better-scroll'
import MescrollVue from 'mescroll.js/mescroll'
// import 'mescroll.js/mescroll.min.css'

export default {
  name: 'Index',
  components: {
    eject: Eject,
    MescrollVue
  },
  data(){
    return{
        has_expire: 0,
        rankList: [],
        timeList: [],
        page:1,
        // mescroll配置
        mescroll: null, // mescroll实例对象
        mescrollDown:{}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
        mescrollUp: { // 上拉加载的配置.
            callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
            //以下是一些常用的配置,当然不写也可以的.
            page: {
                num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
                size: 10 //每页数据条数,默认10
            },
            noMoreSize: 289, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
            toTop: {
                //回到顶部按钮
                src: "./static/mescroll/mescroll-totop.png", //图片路径,默认null,支持网络图
                offset: 1000 //列表滚动1000px才显示回到顶部按钮
            },
            htmlContent: '<p class="downwarp-progress"></p><p class="downwarp-tip">下拉刷新 </p>', //布局内容
        },
    }
  },
  created(){
  },
  mounted(){
    // this.getIndexInfo();
    this.timeList = this.$parent.$data.timeList;
  },
  methods:{
    mescrollInit(mescroll) {
        this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
        if(page.num>0){
            this.getIndexInfo(page.num,mescroll);

        }

        // 联网请求
        // axios.get('xxxxxx', {
        // params: {
        //     num: page.num, // 页码
        //     size: page.size // 每页长度
        // }
        // }).then((response) => {
        // // 请求的列表数据
        // let arr = response.data
        // // 如果是第一页需手动置空列表
        // if (page.num === 1) this.dataList = []
        // // 把请求到的数据添加到列表
        // this.dataList = this.dataList.concat(arr)
        // // 数据渲染成功后,隐藏下拉刷新的状态
        // this.$nextTick(() => {
        //     mescroll.endSuccess(arr.length)
        // })
        // }).catch((e) => {
        // // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
        // mescroll.endErr()
        // })
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
        //   this.getIndexInfo();
          }
      })
      }
    },

    getIndexInfo(p,mescroll){
      let openid = window.localStorage.getItem('voteOpenid')
      let memberId = window.localStorage.getItem('voteMemberid')
      let indexUrl = this.$common.config.gzhUrl + 'v3/vote/vote/all'
      let fd = this.$common.getParam('get',{openid:openid,member_id:memberId,page:p});
      this.$axios.get(indexUrl+'?'+fd).then((res) => {
        if(res.data.code == 200){
          this.has_expire = res.data.data.has_expire;
          let rankArr = res.data.data.rows;
          this.rankList = this.rankList.concat(rankArr);
          this.$nextTick(() => {
            mescroll.endSuccess(this.rankList.length)
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
    .mescroll {
        // position: fixed;
        // top: 44px;
        // bottom: 0;
        // height: auto;
        height: 16rem;
    }
  }
</style>

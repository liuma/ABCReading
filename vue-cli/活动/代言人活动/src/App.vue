<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  // provide (){
  //   return {
  //     reload: this.reload
  //   }
  // },
  data(){
    return {
      isRouterAlive: true,
      levelList:[
        {val: 1, name:'Leval aa'},
        {val: 2, name:'Leval A'},
        {val: 3, name:'Leval B'},
        {val: 4, name:'Leval C'},
        {val: 5, name:'Leval D'},
        {val: 6, name:'Leval E'},
        {val: 7, name:'Leval F'},
        {val: 8, name:'Leval G-Z'},
      ],
      ageList:[
        {val: 1, name:'1岁'},
        {val: 2, name:'2岁'},
        {val: 3, name:'3岁'},
        {val: 4, name:'4岁'},
        {val: 5, name:'5岁'},
        {val: 6, name:'6岁'},
        {val: 7, name:'7岁'},
        {val: 8, name:'8岁'},
        {val: 9, name:'9岁'},
        {val: 10, name:'10岁'},
        {val: 11, name:'11岁'},
        {val: 12, name:'12岁'},
        {val: 13, name:'12岁+'},
      ],
      timeList:[
        {val: 1, name:'0-0.5年'},
        {val: 2, name:'0.5-1年'},
        {val: 3, name:'1-1.5年'},
        {val: 4, name:'1.5-2年'},
        {val: 5, name:'2年以上'},
      ],
      beforeList:[
        {val: 1, name:'零基础'},
        {val: 2, name:'认识少量单词'},
        {val: 3, name:'会读英文句子'},
        {val: 4, name:'能进行英文对话'},
      ],
      afterList:[
        {val: 1, name:'认识少量单词'},
        {val: 2, name:'会读英文句子'},
        {val: 3, name:'熟练应用单词，自发组句'},
        {val: 3, name:'能进行英文对话'},
      ]
    }
  },
  created(){
    this.wxConfig()
  },
  methods:{
    wxConfig () {
      let lUrl = encodeURIComponent(window.location.href)
      let wUrl = this.$common.config.gzhUrl + "v3/wechat/wechat/get-wechat"
      let member_id = localStorage.getItem('monthCardCollageMemberid')
      let fd = this.$common.getParam('get', {url: lUrl, member_id: member_id});
      // let conf = {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
      this.$axios.post(wUrl + '?' + fd).then((res) => {
        if(res.data.code == 200){
          let data = res.data.data
          // 微信配置
          wx.config({
            debug: false,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseWXPay', 'startRecord','stopRecord','onVoiceRecordEnd','playVoice','pauseVoice','stopVoice','onVoicePlayEnd'] // 功能列表，我们要使用JS-SDK的什么功能
          });
          wx.ready(function () {
            wx.checkJsApi({
              jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseWXPay', 'startRecord','stopRecord','onVoiceRecordEnd','playVoice','pauseVoice','stopVoice','onVoicePlayEnd'],
              success: function (res) {
              }
            });
          });
        }
      })
    },
  }
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
.Hidden{
  display: none;
}
#app {
  font-family: PingFangSC-Regular, 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: .2rem;
  background-color: #FFF;
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
    &:link, &:visited, &:hover {
      text-decoration: none;
    }
  }
  select,input,textarea{
    border: none;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar{display: none;}
  .rank_list{
    padding-top: 1.58rem;
    width: 7.1rem;
    height: 16.37rem;
    background: url('assets/images/index_list_bg.png');
    background-size: cover;
    margin: .55rem auto 0;
    ul{
      width: 6.16rem;
      height: 14.9rem;
      overflow: scroll;
      padding-top: .2rem;
      font-size: 0;
      margin: auto;
      li{
        width: 3.08rem;
        display: inline-block;
        .video_wrap{
          width: 2.64rem;
          height: 3.24rem;
          background: #8159C9;
          border-radius: .2rem;
          padding-top: .1rem;
          margin: auto;
          position: relative;
          .rank_ind{
            width: .59rem;
            height: .66rem;
            background: #8159C9;
            box-shadow: 0 .02rem .04rem 0 rgba(99,99,99,.5);
            border-radius: 0 0 1rem 1rem;
            position: absolute;
            right: .22rem;
            top: 0;
            z-index: 4;
            font-family: FZY4JW--GB1-0;
            font-weight: bold;
            font-size: .4rem;
            color: #FFFFFF;
            letter-spacing: .012rem;
            line-height: .66rem;
            &.rank1{
              width: .86rem;
              height: 1.06rem;
              background: url('assets/images/icon1_sm.png');
              background-size: cover;
              box-shadow: none;
              line-height: .86rem;
              top: -.15rem;
            }
            &.rank2{
              width: .86rem;
              height: 1.06rem;
              background: url('assets/images/icon2_sm.png');
              background-size: cover;
              box-shadow: none;
              line-height: .86rem;
              top: -.15rem;
            }
            &.rank3{
              width: .86rem;
              height: 1.06rem;
              background: url('assets/images/icon3_sm.png');
              background-size: cover;
              box-shadow: none;
              line-height: .86rem;
              top: -.15rem;
            }
          }
          .video_box{
            width: 2.46rem;
            height: 3.14rem;
            background: #fff;
            border-radius: .2rem;
            margin: auto;
            position: relative;
            .btn_play{
              width: .9rem;
              height: .9rem;
              background: url('assets/images/icon_play.png');
              background-size: cover;
              position: absolute;
              left: .78rem;
              top: 1rem;
            }
            .time{
              font-family: FZY4JW--GB1-0;
              font-size: .2rem;
              color: #8159C9;
              letter-spacing: .006rem;
              position: absolute;
              bottom: .14rem;
              left: .08rem;
            }
            .like_num{
              font-family: FZY4JW--GB1-0;
              font-size: .2rem;
              color: #8159C9;
              letter-spacing: .006rem;
              position: absolute;
              bottom: 0;
              right: .08rem;
              height: .48rem;
              line-height: .48rem;
              .icon{
                display: inline-block;
                vertical-align: top;
                width: .48rem;
                height: .48rem;
                background: url('data:image/png;base64,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');
                background-size: cover;
              }
            }
          }
        }
        .user_info{
          font-family: FZY4JW--GB1-0;
          font-size: .28rem;
          font-weight: bold;
          color: #392E70;
          letter-spacing: .008rem;
          padding: .17rem 0 .13rem .25rem;
          text-align: left;
          position: relative;
          .age{
            position: absolute;
            right: .35rem;
            top: 0;
            padding-top: .17rem;
          }
        }
        .like_btn{
          width: 2.2rem;
          height: .6rem;
          line-height: .6rem;
          background-image: linear-gradient(180deg, #FFA9A9 4%, #FF2844 97%);
          box-shadow: 0 .04rem .07rem 0 rgba(54,35,62,.79);
          border-radius: .315rem;
          margin: 0 auto .4rem;
          font-family: FZY4JW--GB1-0;
          font-size: .3rem;
          color: #FFF;
          letter-spacing: .05rem;
          text-align: center;
          &.liked{
            background-image: linear-gradient(180deg, #D5D5D5 2%, #8D8D8D 95%);
            box-shadow: 0 .04rem .07rem 0 rgba(0,0,0,.77);
          }
        }
      }
    }
  }
  .video_player{
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 101;
        background: rgba(0,0,0,.7);
        video{
            height: 100%;
            width: 100%;
            display: block;
        }
        .close{
            display: block;
            position: absolute;
            top: .1rem;
            right: .2rem;
            font-size: .32rem;
            color: #FFF;
            z-index: 102;
        }
    }
}
</style>

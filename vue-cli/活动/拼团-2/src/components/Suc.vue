<template>
  <div class="suc">
    <div class="bg"></div>
    <div class="code_wrap">
        <p class="title">支付成功！</p>
        <p class="desc">请您“务必”扫码进课程群获得拼团权限和上课地址</p>
        <div class="code_box">
            <img  :src="codeUrl">
        </div>
        <div v-show="canShare" class="share_wrap">
            <p class="share_txt">快快邀请好友一起拼团吧！</p>
            <div class="btn" @click="showShareToast">邀请好友参团</div>
        </div>
    </div>
    <div class="ft_box"></div>
    <div v-show="shareStatus" class='toast_wrap' @click="hideShareToast">
      <div class="arrow"></div>
      <p class="time">
        邀请好友拼团
      </p>
      <div class="icon_a"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      canShare: false,  
      shareStatus: false,  
      codeUrl: '',
    }
  },
  mounted () {
      this.handleShare();
      this.getCode();
      this.shareConfig();
  },
  methods: {
      handleShare(){
        let type = this.$route.query.type
        if(type == 2){
            this.canShare = true
        }
      },
      getCode(){
        var _this = this;  
        let memberId = window.localStorage.getItem('monthCardCollageMemberid')
        let userUrl = this.$common.config.gzhUrl + 'v2/code/code/info';
        let fd = this.$common.getParam('get',{type:8,from_username:memberId,level:0,member_id:memberId});
        this.$axios.get(userUrl+'?'+fd).then((res) => {
            if(res.data.code==200){
                if(res.data.data.qrcode_url && res.data.data.qrcode_url!=''){
                    _this.codeUrl = res.data.data.qrcode_url || 'https://qnfile.abctime.com/abc_h5/collage_e/groupFullTag.png'
                }else {
                    _this.codeUrl = 'https://qnfile.abctime.com/abc_h5/collage_e/groupFullTag.png'
                }
            }else {
                _this.codeUrl = 'https://qnfile.abctime.com/abc_h5/collage_e/groupFullTag.png'
            }
        })
      },
      showShareToast(){
        this.shareStatus = true
      },
      hideShareToast(){
        this.shareStatus = false
      },
      shareConfig(){
      let member_id = localStorage.getItem('monthCardCollageMemberid')
      let lUrl = encodeURIComponent(window.location.href)
      let wUrl = this.$common.config.gzhUrl + "v3/wechat/wechat/get-wechat"
      let fd = this.$common.getParam('get', {url: lUrl, member_id: member_id});
      let link = '';
      let configObj = {
        title:'【限时拼团】32讲学而思轻课英语启蒙课拼团价仅39元！',
        desc: '哈佛大学教研专为学前学生打造，让孩子英语轻松超越同龄人~',
        imgUrl: 'https://qnfile.abctime.com/share_logo_new.png',
      };
      link = window.location.origin + window.location.pathname +'?view_member_id=' + member_id
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
    }, 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .suc{
    width: 100%;
    height: calc(~'100vh - .6rem');
    background: #62ABEF;
    padding-top: .6rem;
    background: url('http://file.abctime.com/abc_h5/collage_e/order_bg.png');
    background-size: 100% 100%;
    .code_wrap{
        width: 6.7rem;
        min-height: 8.45rem;
        padding-bottom: .5rem;
        margin: auto;
        background: #FFF;
        box-shadow: 0 0 .07rem 0 #DADADA;
        border-radius: .3rem;
        position: relative;
        z-index: 5;
        .title{
            font-size: .4rem;
            color: #343F49;
            font-weight: bold;
            letter-spacing: .046rem;
            padding: .57rem 0 .44rem;
        }
        .desc{
            font-size: .24rem;
            color: #7F8991;
            letter-spacing: .0124rem;
        }
        .code_box{
            width: 3.7rem;
            height: 3.7rem;
            margin: .4rem auto 0;
            border: .03rem solid #E7E593;
            border-radius: .24rem;
            img{
                width: 3.3rem;
                height: 3.3rem;
                margin: .2rem auto;
            }
        }
        .share_wrap{
            .share_txt{
                font-family: HiraginoSansGB-W3;
                font-size: .22rem;
                color: #F18F02;
                letter-spacing: .0075rem;
                padding: .7rem 0 .25rem;
            }
            .btn{
                width: 4.4rem;
                height: .98rem;
                line-height: .98rem;
                text-align: center;
                font-weight: bold;
                margin: auto;
                box-shadow: 0 .06rem 0 0 rgba(0,0,0,0.14);
                font-family: PingFangSC-Semibold;
                font-size: .4rem;
                letter-spacing: .016rem;
                border-radius: .5rem;
                position: relative;
                overflow: hidden;
                background-image: linear-gradient(0deg, #F38E10 0%, #FCD926 100%);
                text-shadow: 0 .02rem .12rem #D28307;
                color: #FFF;
            }
        }
    }
    .bg{
      width: 100%;
      height: 7.44rem;
      background: url('http://file.abctime.com/abc_h5/collage_e/order_mid.png') no-repeat;
      background-size: cover;
      position: absolute;
      top: 1rem;
      left: 0;
      z-index: 2;
    }
    .ft_box {
      width: 7.5rem;
      height: 4.57rem;
      margin: auto;
      background: url('http://file.abctime.com/abc_h5/collage_e/order_ft.png') no-repeat;
      background-size: cover;
      text-align: center;
      position: absolute;
      bottom: 0;
      z-index: 100;
      pointer-events: none;
    }
    .toast_wrap{
        position: fixed;
        left: 0;
        top:0;
        z-index: 100;
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0,.7);
        font-size: .4rem;
        color: #fff;
        text-align: right;
        .arrow{
        position: absolute;
        width: 2.19rem;
        height: 1.89rem;
        background: url('../assets/images/collage_share_arrow.png');
        background-size: cover;
        top: .25rem;
        right: .45rem;
        }
        .time{
        text-align: center;
        padding-top: 2.4rem;
        font-family: Helvetica;
        font-size: .36rem;
        color: #FFC100;
        letter-spacing: .045rem;
        span{
            padding-left: .3rem;
        }
        }
        .num{
        font-family: Helvetica;
        font-size: .32rem;
        color: #FFFFFF;
        letter-spacing: .04rem;
        text-align: center;
        padding-top: .25rem;
        span{
            color: #FFC100;
        }
        }
        .icon_a{
        display: inline-block;
        width: 1.55rem;
        height: 1.8rem;
        background: url('http://file.abctime.com/abc_h5/collage_e/collage_share_a.png');
        background-size: cover;
        margin: .11rem .48rem;
        }
    }
  }
</style>

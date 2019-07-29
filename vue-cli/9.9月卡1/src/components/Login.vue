<template>
  <div class="login">
    <div class="login_container">
      <div class="hd_box">
        <div class="tag_box">
          <div class="icon"></div>
          <p>输入手机号，<br>
            登录或注册您的ABC Reading账号</p>
        </div>
      </div>
      <div class="form_box">
        <span class="txt">手机号：</span>
        <div class="group phone">
          <input id="phone" type="tel" :disabled="telDis" v-model="tel" @focus="focus" @blur="blur" @input="checkPh" maxlength="11">
        </div>
        <span class="txt">验证码：</span>
        <div class="group code">
          <input id="code" type="tel" v-model="code" @input="checkPh" @focus="focus" @blur="blur" maxlength="6">
          <div :class="{'send':true,'active':canSend}" @click="getCode">{{sendText}}</div>
        </div>
        <div :class="loginStatus?'btn active':'btn'" @click="bindPhone"><span class="icon"></span><span>立即购买</span></div>
      </div>
      <div class="ft_box" v-show="blurFlag"></div>
    </div>
    <eject :message="ejectText" :showState="ejectStatus"></eject>
  </div>
</template>

<script>
import Eject from './Eject'
export default {
  name: 'Login',
  components: {
    eject: Eject,
  },
  data () {
    // 手机号 验证码 发送验证码按钮标识

    return {
      tel: '',
      code: '',
      sendCode: true,
      canSend: false,
      sendStatus: false,
      loginStatus: false,
      ejectText:'',
      ejectStatus: false,
      sendText: '获取验证码',
      time:0,
      telDis:false,
      blurFlag: true
    }
  },
  created(){
    // this.shareConfig()
  },
  mounted(){
    this.shareConfig()
  },
  methods: {
    bindPhone(){
      if(this.loginStatus){
        let phone_num = this.tel
        let code = this.code
        let member_id = window.localStorage.getItem('mcLimitBuyMemberid')
        let openid = window.localStorage.getItem('mcLimitBuyOpenid')
        let source_id = 106;
        let act_id = 3;
        let productId = 104
        let fd = this.$common.getParam('get',{phone:phone_num,code:code,member_id:member_id,open_id:openid,product_id:productId,source_id:source_id,act_id:act_id})
        let actionUrl = this.$common.config.gzhUrl + 'v3/member/passport/bind-phone'
        let _this = this
        let conf = {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
        this.$axios.post(actionUrl,fd,conf).then((res) => {
          if(res.data.code == 200){
            window.localStorage.setItem('mcLimitBuyPhone',res.data.data.phone)
            _this.$router.push({name:'Order'})
          }else{
            _this.showEject(res.data.msg)
          }
        })
        TDAPP.onEvent('按钮点击_登录页立即购买');
      }
    },
    blur(){
      this.blurFlag = true;
    },
    focus(){
      this.blurFlag = false;
    },
    checkPh () {
      if(this.$common.VL.phNum(this.tel)){
        if(this.sendText == '获取验证码'){
          this.canSend = true
        }
        this.sendStatus = true
        if(this.code.length == 6){
          this.loginStatus = true
        } else {
          this.loginStatus = false
        }
      } else {
        this.canSend = false
        this.sendStatus = false
        this.loginStatus = false
      }
    },
    getCode: function () {
      if(this.sendStatus){
        this.sendStatus = false;
        this.canSend = false;
        let url = this.$common.config.gzhUrl + 'v2/api/api/send'
        let fd = this.$common.getParam('get',{phone:this.tel})
        let _this = this;
        this.time = 60;
        this.timer()
        let conf = {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
        this.$axios.post(url,fd,conf).then(
          (res) => {
          if(res.data.code == 200){
          _this.showEject('发送成功')
          }else{
            _this.showEject(res.data.msg)
          }
        })
      }
    },
    showEject: function (text) {
      this.ejectText = text
      this.ejectStatus = true
    },
    initEject: function () {
      this.ejectStatus = false
    },
    timer() {
      if (this.time > 0) {
        this.time--;
        this.canSend = false;
        this.sendText=this.time+"s后重发";
        setTimeout(this.timer, 1000);
      } else{
        this.time=0;
        this.sendText="重新发送";
        this.canSend = true;
        this.sendStatus = true;
      }
    },
    shareConfig(){
      let member_id = localStorage.getItem('mcLimitBuyMemberid')
      let lUrl = encodeURIComponent(window.location.href)
      let wUrl = this.$common.config.gzhUrl + "v3/wechat/wechat/get-wechat"
      let fd = this.$common.getParam('get', {url: lUrl, member_id: member_id});
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
          jsApiList: ['hideMenuItems'] // 功能列表，我们要使用JS-SDK的什么功能
        });
        wx.ready(function () {
          wx.checkJsApi({
            jsApiList: ['hideMenuItems'],
            success: function(res) {
            }
          });
          wx.hideMenuItems({
            menuList: ["menuItem:share:timeline","menuItem:share:appMessage",]
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
  .login{
    background: #62ABEF;
  }
  .login_container {
    width: 100%;
    height: 100vh;
    min-height: 12.4rem;
    background-size: 100%;
    position: relative;
    z-index: 10;
    .hd_box {
      width: 7.5rem;
      height: 5.86rem;
      margin: auto;
      background: url('../assets/images/login_hd.png') no-repeat;
      background-size: 100%;
      text-align: center;
      position: relative;
      text-align: right;
      .tag_box{
        display: inline-block;
        padding: .11rem .12rem;
        background: #FFF;
        text-align: left;
        border-radius: 0 .08rem .08rem;
        margin: .66rem .24rem;
        position: relative;
        border: .01rem solid #979797;
        p{
          font-family: Helvetica;
          font-size: .28rem;
          color: #3C3B3B;
          letter-spacing: .02rem;
          line-height: .4rem;
        }
        .icon{
          width: .35rem;
          height: .2rem;
          background: url('../assets/images/login_tag_icon.png');
          background-size: cover;
          position: absolute;
          right: calc(~'100% - 1px');
          top: 0;
        }
      }
    }
    .ft_box {
      width: 7.5rem;
      height: 3.04rem;
      margin: auto;
      background: url('../assets/images/login_ft.png') no-repeat;
      background-size: 100%;
      text-align: center;
      position: absolute;
      bottom: 0;
      pointer-events: none;
    }
    .form_box {
      text-align: left;
      margin-top: -1.8rem;
      position: relative;
      .txt{
        font-family: PingFangSC-Semibold;
        font-weight: bold;
        font-size: .3rem;
        color: #FFFFFF;
        padding-left: .86rem;
        line-height: 1;
      }
      .group {
        width: 6.07rem;
        height: .96rem;
        background: #3E7ACE;
        border-radius: .08rem;
        margin: .12rem auto;
        line-height: .96rem;
        font-size: .3rem;
        position: relative;
        text-align: left;
        &.code {
          position: relative;
        }
        input {
          width: 2.4rem;
          height: .64rem;
          padding-left: .5rem;
          background: #3E7ACE;
          font-size: .3rem;
          outline: none;
          border: 0;
          color: #FFFFFF;
          &::placeholder {
            color: #FFFFFF;
          }
        }
        .send {
          position: absolute;
          right: .11rem;
          top: .11rem;
          font-size: .28rem;
          width: 1.8rem;
          height: .74rem;
          border-radius: .08rem;
          line-height: .74rem;
          text-align: center;
          color: #FFFFFF;
          background: #AAAAAA;
          &.active {
            background: #4CA4E3;
            color: #FFFFFF;
          }
        }
      }
      .btn{
        width: 4.4rem;
        height: .98rem;
        line-height: .98rem;
        text-align: center;
        font-weight: bold;
        margin: auto;
        margin-top: .47rem;
        background: #145EA6;
        box-shadow: 0 .06rem 0 0 rgba(0,0,0,0.14);
        font-family: PingFangSC-Semibold;
        font-size: .4rem;
        color: #4A96DE;
        letter-spacing: .016rem;
        border-radius: .5rem;
        position: relative;
        overflow: hidden;
        /*&::before{*/
          /*content: '';*/
          /*width: 4.52rem;*/
          /*height: .98rem;*/
          /*background: #145EA6;*/
          /*position: absolute;*/
          /*left: -.06rem;*/
          /*top: -.06rem;*/
          /*right: -.06rem;*/
          /*bottom: -.06rem;*/
          /*border-radius: .5rem;*/
          /*z-index: -1;*/
          /*box-shadow: 0 .06rem 0 0 rgba(0,0,0,0.14);*/
        /*}*/
        &.active{
          background-image: linear-gradient(0deg, #F38E10 0%, #FCD926 100%);
          text-shadow: 0 .02rem .12rem #D28307;
          color: #FFF;
          .icon{
            width: 1.32rem;
            height: .98rem;
            background: url('../assets/images/login_btn_tag.png');
            background-size: cover;
            position: absolute;
            top: 0;
            right: .2rem;
          }
          /*&::before{*/
            /*content: '';*/
            /*width: 4.52rem;*/
            /*height: .98rem;*/
            /*background: linear-gradient(0deg, #FF8C05 0%, #FFF009 100%);*/
            /*position: absolute;*/
            /*left: -.06rem;*/
            /*top: -.06rem;*/
            /*right: -.06rem;*/
            /*bottom: -.06rem;*/
            /*border-radius: .5rem;*/
            /*z-index: -1;*/
            /*box-shadow: 0 .06rem 0 0 rgba(0,0,0,0.14);*/
          /*}*/
        }
      }
    }
  }
</style>

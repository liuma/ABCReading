<template>
  <div class="login">
    <div class="login_container">
      <div class="hd_box">
        <div class="user_box">
          <img :src="head_img">
          <span class="nickname">{{nickname}}</span>
          <!--<p class="tip">备注：拼团成功后仅拼团付款人微信账号可学习课程</p>-->
        </div>
      </div>
      <div class="form_box">
        <div class="group phone">
          <span class="icon"></span>
          <input id="phone" type="tel" v-model="tel" @focus="focus" @blur="blur" @input="checkPh" maxlength="11" placeholder="请输入手机号">
          <!--<input id="phone" type="tel" :disabled="telDis" v-model="tel" @focus="focus" @blur="blur" @input="checkPh" maxlength="11">-->
        </div>
        <div class="group code">
          <span class="icon"></span>
          <input id="code" type="tel" v-model="code" @input="checkPh" @focus="focus" @blur="blur" maxlength="6" placeholder="请输入验证码">
          <div :class="{'send':true,'active':canSend}" @click="getCode">{{sendText}}</div>
        </div>
        <div :class="loginStatus?'btn active':'btn'" @click="bindPhone"><span class="icon"></span><span>登录</span></div>
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
    eject: Eject
  },
  data () {
    // 手机号 验证码 发送验证码按钮标识

    return {
      nickname:'',
      head_img:'',

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
    this.shareConfig();
    this.nickname = window.localStorage.getItem('extendAbcNickname')
    this.head_img = window.localStorage.getItem('extendAbcHeadimg')
  },
  methods: {
    getUserInfo(){

    },
    bindPhone(){
      if(this.loginStatus){
        let phone_num = this.tel
        let code = this.code
        let member_id = window.localStorage.getItem('extendAbcMemberid')
        let openid = window.localStorage.getItem('extendAbcOpenid')
        let source_id = 109;
        let act_id = 5;
        let productId = 110
        let fd = this.$common.getParam('get',{phone:phone_num,code:code,member_id:member_id,open_id:openid,product_id:productId,source_id:source_id,act_id:act_id})
        let actionUrl = this.$common.config.gzhUrl + 'v3/member/passport/bind-phone'
        let _this = this
        let conf = {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
        this.$axios.post(actionUrl,fd,conf).then((res) => {
          if(res.data.code == 200){
            window.localStorage.setItem('extendAbcPhone',res.data.data.phone)
            if(_this.$route.query.buy == 2){
              _this.$router.push({name:'Pay',query:{type:1}})
            }else if(_this.$route.query.buy == 1) {
              _this.originalPay()
            }
          }else{
            _this.showEject(res.data.msg)
          }
        })
      }
    },
    originalPay(){
      let member_id = localStorage.getItem('extendAbcMemberid')
      let openid = localStorage.getItem('extendAbcOpenid')
      let ph = localStorage.getItem('extendAbcPhone')
      let source_id = 109;
      let act_id = 5;
      let fdObj = {member_id:member_id,openid:openid,phone:ph,goods_num:1,
        total_price:this.goodsObj.original_price,discount_money:this.goodsObj.discount_money,
        money_paid:this.goodsObj.price,goods_name:this.goodsObj.product_name,
        payment_type:3,pay_type:3,trade_type:'JSAPI',source_id:source_id,act_id:act_id,is_group:0};
      fdObj.product_id = this.goodsObj.product_id;
      fdObj.parent_order_no = 0
      let _this = this;
      let fd = this.$common.getParam('get',fdObj);
      let orderUrl = this.$common.config.gzhUrl + 'v3/pay/order/gzh-add'
      let conf = {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
      this.$axios.post(orderUrl,fd,conf).then((res) => {
        if(res.data.code == 200){
        let da = res.data.data
        wx.chooseWXPay({
          timestamp: da.pay.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: da.pay.nonceStr, // 支付签名随机串，不长于 32 位
          package: da.pay.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          signType: da.pay.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: da.pay.paySign, // 支付签名
          success: function (res) {
            _this.openLesson();
            _this.showEject('购买成功')
            _this.$router.push({name:'Index'})
          }
        });
      }else{
        _this.showEject(res.data.msg)
      }
    })
    },
    openLesson(){
      let member_id = localStorage.getItem('extendAbcMemberid'),lesson_id=this.$route.query.id;
      let wUrl = this.$common.config.gzhUrl + "v3/marketingcourse/course/unlock-lesson"
      let fd = this.$common.getParam('get', {member_id: member_id,lesson_id:1,course_id:2});
      this.$axios.get(wUrl+'?'+fd).then((res) => {
        if(res.data.code == 200){
      }
    })
    },
    blur(){
      this.blurFlag = true;
    },
    focus(){
      this.blurFlag = false;
    },
    checkPh () {
      if(this.$common.VL.phNum(this.tel)){
        if(this.sendText == '获取验证码' || this.sendText == '重新发送'){
          this.canSend = true
          this.sendStatus = true
        }
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
      let _this = this;
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
      }else {
        _this.showEject('请输入正确的手机号')
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
      let member_id = localStorage.getItem('monthCardCollageMemberid')
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
    background: #2E649E;
  }
  .login_container {
    width: 100%;
    height: 100vh;
    /*min-height: 100vh;*/
    position: relative;
    z-index: 10;
    .hd_box {
      width: 7.5rem;
      height: 5.77rem;
      margin: auto;
      background: url('../assets/imgs/login_head.png') no-repeat;
      background-size: 100%;
      position: relative;
      .user_box{
        display: inline-block;
        height: 1.2rem;
        line-height: 1.2rem;
        padding: 0 .14rem 0 .24rem;
        background: #fff;
        border-radius: .24rem;
        margin-top: 4.26rem;
        img{
          width: .96rem;
          height: .96rem;
          border-radius: 50%;
          display: inline-block;
          vertical-align: top;
          margin-top: .12rem;
        }
        .nickname{
          text-align: left;
          font-family: PingFangSC-Regular;
          font-size: .32rem;
          color: #333333;
          letter-spacing: -.01rem;
          line-height: 1.2rem;
          display: inline-block;
          vertical-align: top;
          max-width: 2.4rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .tip{
          font-family: PingFangSC-Regular;
          font-size: .2rem;
          color: #9A8E7F;
          letter-spacing: 0;
          padding-top: .02rem;
        }
      }
    }
    .form_box {
      position: relative;
      /*width: 6.86rem;*/
      /*padding-bottom: 1.13rem;*/
      /*margin: -1.32rem auto .32rem;*/
      /*background: #FFFFFF;*/
      /*box-shadow: 0 .06rem .18rem 0 rgba(180,97,3,.4);*/
      /*border-radius: .36rem;*/
      margin-top: .4rem;
      .txt{
        font-family: PingFangSC-Semibold;
        font-weight: bold;
        font-size: .3rem;
        color: #FFFFFF;
        padding-left: .86rem;
        line-height: 1;
      }
      .group {
        width: 6.28rem;
        height: .98rem;
        line-height: .98rem;
        background: #FFFFFF;
        border: .02rem solid #D4B086;
        border-radius: .24rem;
        position: relative;
        text-align: left;
        margin: auto;
        &.phone {
          position: relative;
          .icon{
            width: .26rem;
            height: .36rem;
            background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAkBAMAAABlFDcgAAAAMFBMVEUAAABNsP9Nsf9Nsf9PsP9Msf9Qsv9Osf9Nsf9Nsf9NsP9PsP+Av/9MsP9NsP9MsP9A7RLBAAAAD3RSTlMAT6mzXuMZRaTr5ioEycb4MtUZAAAAZklEQVQY02Ng6/oPAysSGDL/I8A0hv6vxjAQ/4MhPoYBBo5+ZfivwLBREASkGZj+g3iFYJ44kIcpBwUjkHfFBQZ8gTwkgMF7KAgDclBT2MoTkMxkFyzAxouPgas8+hU1xlBjEzWmARvAlyUoBJ10AAAAAElFTkSuQmCC');
            background-size: cover;
            position: absolute;
            top: .26rem;
            left: .26rem;
          }
        }
        &.code {
          position: relative;
          margin-top: .32rem;
          .icon{
            width: .3rem;
            height: .37rem;
            background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAlCAMAAABiU6n+AAAAclBMVEUAAABNsP9MsP9MsP9Msf9Nsv9Osf9NtP9MsP9QtP9NsP9MsP9Nsf9Msf9Osf9SuP9Yv/9Msf9Nsf9Nsf9Msf9NsP9Nsv9Osf9Ssf9TuP9Qt/9RtP9NsP9MsP9Nsf9Msf9NsP9Msf9Nsv9PsP9Nsv9MsP/kt5HHAAAAJXRSTlMA99lNuodIE7Uf++6WbkIZCuvf1r6jYjslFRAs4tOwrp9/UzorYaOJ0QAAAOdJREFUOMu90EduwzAQQNGh6UiimtWru/Pvf8VIgQFTDrkL/HeDt+BwxEpf6ySpr1pc5SeenfK/msWAqioFxNm7dkB1L0SKewV0W51jSBdcK1KI5w1HcHlNF4hsNVCOr3Eswdh7wU2sbmBvl0Jvcw+pNZ7BvD123m52sPkA0X9x2MB3aDVDEz4/2SY4S9pRZDri7ThJCqrZO2oUpFITD+JsiKlFsRNPO9QH2fS98fOglwYvBysHXta/efmx6sPLRa51Xvh4aZo+ebWSxMcJpeyh1YEj3cJecvCXi2TKhyqTJdN9OeuMyA/M/yeqh5AmFQAAAABJRU5ErkJggg==');
            background-size: cover;
            position: absolute;
            top: .28rem;
            left: .24rem;
          }
        }
        input {
          width: 2.4rem;
          height: .64rem;
          padding-left: .84rem;
          background: #FFFFFF;
          font-size: .3rem;
          outline: none;
          border: 0;
          color: #bf6b31;;
          &::placeholder {
            color: #CCC;;
          }
        }
        .send {
          position: absolute;
          right: .24rem;
          top: 0;
          font-size: .28rem;
          width: 1.8rem;
          height: .74rem;
          border-radius: .08rem;
          line-height: .98rem;
          text-align: center;
          color: #000;
          /*background: #AAAAAA;*/
          &.active {
            font-family: PingFangSC-Regular;
            color: #F98C27 ;
          }
        }
      }
      .btn{
        width: 6.28rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        font-weight: bold;
        margin: .6rem auto;
        background-image: linear-gradient(144deg, #FFC031 0%, #F24718 100%);
        font-family: PingFangSC-Semibold;
        font-weight: bold;
        font-size: .4rem;
        color: #FFF;
        letter-spacing: .016rem;
        border-radius: .5rem;
        position: relative;
        overflow: hidden;
        box-shadow: 0 .05rem .12rem 0 rgba(248,128,34,.5);

        &.active{
          background-image: linear-gradient(0deg, #F38E10 0%, #FCD926 100%);
          text-shadow: 0 .02rem .12rem #D28307;
          color: #FFF;
        }
      }
    }
  }
</style>

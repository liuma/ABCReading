<template>
  <div class="login">
    <div class="login_container">
      <div class="hd_box">
        <img class="head_img" src="https://qnfile.abctime.com/extend/login_hd.png">
        <div class="user_box">
          <img :src="head_img">
          <span class="nickname">{{nickname}}</span>
          <!--<p class="tip">备注：拼团成功后仅拼团付款人微信账号可学习课程</p>-->
        </div>
      </div>
      <div class="form_box">
        <p class="login_txt">登录或注册您的ABC Reading账号</p>
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
        <div style="width: 70vw;margin:auto;" id="captcha"></div>
        <div :class="loginStatus?'btn active':'btn'" @click="getUcCode"><span class="icon"></span><span>登录</span></div>
      </div>
      <p class="tips">备注：拼团成功后仅拼团付款人微信账号可学习课程</p>
      <div class="ft_box" v-show="blurFlag"></div>
      <p class="rules_link">继续操作，即表示已同意ABC Reading<span @click="toRules()">《用户隐私协议》</span></p>  
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
      blurFlag: true,
      canLogin: true
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
    toRules(){
        location.href = window.location.origin + '/mystory/rules.html'
    },
    getUcCode(){
        if(this.loginStatus){
            let phone_num = this.tel;
            let code = this.code;
            let ucCode = this.$common.ucLogin(phone_num,code,this);
        }
    },
    bindPhone(ucCode){
      if(this.loginStatus && this.canLogin){
        this.canLogin = false;
        let phone_num = this.tel
        let code = ucCode
        let member_id = window.localStorage.getItem('extendAbcMemberid')
        let openid = window.localStorage.getItem('extendAbcOpenid')
        let productId = 113
        let fd = this.$common.getParam('get',{code:code,member_id:member_id,openid:openid,product_id:productId})
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
          _this.canLogin = true;
        })
      }
    },
    originalPay(){
      let member_id = localStorage.getItem('extendAbcMemberid')
      let openid = localStorage.getItem('extendAbcOpenid')
      let ph = localStorage.getItem('extendAbcPhone')
      let fdObj = {member_id:member_id,openid:openid,phone:ph,goods_num:1,
        total_price:this.goodsObj.original_price,discount_money:this.goodsObj.discount_money,
        money_paid:this.goodsObj.price,goods_name:this.goodsObj.product_name,
        payment_type:3,pay_type:3,trade_type:'JSAPI',is_group:0};
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
      let fd = this.$common.getParam('get', {member_id: member_id,lesson_id:1,course_id:3});
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
    getUcCode(){
        if(this.loginStatus){
            let phone_num = this.tel;
            let code = this.code;
            let ucCode = this.$common.ucLogin(phone_num,code,this);
        }
    },
    bindPhone(ucCode){
      if(this.loginStatus && this.canLogin){
          this.canLogin = false;
        let phone_num = this.tel
        let code = ucCode
        let member_id = window.localStorage.getItem('extendAbcMemberid')
        let openid = window.localStorage.getItem('extendAbcOpenid')
        let source_id = 109;
        let act_id = 4;
        let productId = 110
        let fd = this.$common.getParam('get',{code:ucCode,member_id:member_id,openid:openid,product_id:productId,source_id:source_id,act_id:act_id})
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
          _this.canLogin = true;
        })
      }
    },
    originalPay(){
      let member_id = localStorage.getItem('extendAbcMemberid')
      let openid = localStorage.getItem('extendAbcOpenid')
      let ph = localStorage.getItem('extendAbcPhone')
      let source_id = 109;
      let act_id = 4;
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
      let fd = this.$common.getParam('get', {member_id: member_id,lesson_id:1,course_id:1});
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
        this.$common.ucSend(this.tel,this);
        // this.sendStatus = false;
        // this.canSend = false;
        // let url = this.$common.config.gzhUrl + 'v2/api/api/send'
        // let fd = this.$common.getParam('get',{phone:this.tel})
        // let _this = this;
        // this.time = 60;
        // this.timer()
        // let conf = {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
        // this.$axios.post(url,fd,conf).then(
        //   (res) => {
        //   if(res.data.code == 200){
        //     _this.showEject('发送成功')
        //   }else{
        //     _this.showEject(res.data.msg)
        //   }
        // })
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
    background: #FFF;
  }
  .login_container {
    width: 100%;
    height: 100vh;
    /*min-height: 100vh;*/
    position: relative;
    z-index: 10;
    .hd_box {
      margin: auto;
      background-size: 100%;
      position: relative;
      .head_img{
        width: 100vw;
        height: auto;
        position: relative;
      }
      .user_box{
        width: 100%;
        background: #fff;
        border-radius: .24rem .24rem 0 0;
        margin-top: -.2rem;
        z-index: 101;
        position: relative;
        padding-top: .48rem;
        img{
          width: .96rem;
          height: .96rem;
          border-radius: 50%;
          display: inline-block;
          vertical-align: top;
        }
        .nickname{
          text-align: left;
          font-family: PingFangSC-Regular;
          font-size: .32rem;
          color: #333333;
          letter-spacing: -.01rem;
          line-height: .9rem;
          display: inline-block;
          vertical-align: top;
          max-width: 2.4rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding-left: .16rem;
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
      margin-top: .4rem;
      .login_txt{
          font-family: PingFangSC-Semibold;
          font-weight: bold;
          font-size: .28rem;
          color: #333;
          letter-spacing: 0;
          padding-bottom: .36rem;
      }
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
        border: .02rem solid #AAA;
        border-radius: .24rem;
        position: relative;
        text-align: left;
        margin: auto;
        &.phone {
          position: relative;
          .icon{
            width: .26rem;
            height: .36rem;
            background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAkBAMAAABlFDcgAAAALVBMVEUAAABnZ2dnZ2dmZmZnZ2dnZ2dnZ2dqampmZmZnZ2dpaWmAgIBnZ2dnZ2dmZmZRElOuAAAADnRSTlMAqbPkXlSjGuuLSQTJxvZlCikAAABmSURBVBjTY2BPfgcDZgUMFe8QoJ0h77ESDNg9Y7CzZoCBzY8Z3gkwzAMre8nA+A7E6wPzXgB5mHJQMAJ5R1xgwAfIQwIYvKuhMBALNYXLeAGSmczvDLDx7KzhKjc/Ro0x1NhEjWkAglGc7AOWnvkAAAAASUVORK5CYII=');
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
            background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAlCAMAAABiU6n+AAAAb1BMVEUAAABnZ2dmZmZnZ2dmZmZmZmZoaGhmZmZnZ2dmZmZnZ2dnZ2dnZ2doaGhoaGhnZ2dmZmZmZmZpaWlmZmZxcXFpaWlnZ2dmZmZmZmZnZ2dmZmZmZmZmZmZnZ2doaGhpaWloaGhoaGhnZ2dqampmZma6n6kgAAAAJHRSTlMA99lHh7sT7LcY4NS/ZB+voZgrJAkFcGzvwqWTf3xTTkw7NAwktmCXAAAA5ElEQVQ4y73QSY7DIBBA0cLuGA/g2XHm8d//jI2iSMZp2LXydqUvVCXEc22T3S5prxKSVrxV6d+6xVFlqXC2n9UC5WUUGS8lYNe1V9A95eXZgerFl0OzTA3kfq1BF8tYaKjXd53Ec4JZFh3c/XyHTlbL6o9lzfqyws8F5P+VMwN95unBZO/WaoJ0m7laElVmcgRlNgFGwVEqGCRogEoUiUQkqC9mu9/beD7jnKNZ4+hYHnkZY68NjpFYHiqohmiW6fGYvvhrGj2F6+SSbOBwSwNuB8glhbhUZFZEqFmc2v4E2VrkF2F0KNc685HvAAAAAElFTkSuQmCC');
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
          color: #000;;
          &::placeholder {
            color: #CCC;;
          }
        }
        .send {
          position: absolute;
          right: .16rem;
          top: .19rem;
          font-size: .28rem;
          width: 2rem;
          height: .6rem;
          line-height: .6rem;
          text-align: center;
          color: #FFF;
          background: #EDDDD2;
          border-radius: .3rem;
          &.active {
            background: #6EBC2F;
          }
        }
      }
      .btn{
        width: 6.54rem;
        height: 1.08rem;
        line-height: 1.08rem;
        text-align: center;
        font-weight: bold;
        margin: .48rem auto .4rem;
        background-image: linear-gradient(90deg, #EDDDD2 0%, #E1D7D6 100%);
        box-shadow: 0 .04rem .08rem 0 rgba(79,28,24,.08);
        font-family: PingFangSC-Semibold;
        font-weight: bold;
        font-size: .4rem;
        color: #FFF;
        letter-spacing: .06rem;
        border-radius: .54rem;
        position: relative;
        overflow: hidden;
        &.active{
          background-image: linear-gradient(90deg, #FFAA6C 0%, #FF564D 100%);
          box-shadow: 0 .04rem .08rem 0 rgba(79,28,24,.3);
          color: #FFF;
        }
      }
    }
    .tips{
        font-family: PingFangSC-Regular;
        font-size: .2rem;
        color: #999;
        letter-spacing: 0;
        text-align: center;
    }
    .rules_link{
        padding-top: .9rem;
        font-family: PingFangSC-Regular;
        font-size: .24rem;
        color: #666;
        letter-spacing: 0;
        text-align: center;
        span{
            color: #2483FF;
        }
    }
  }
</style>

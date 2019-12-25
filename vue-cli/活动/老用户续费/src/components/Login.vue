<template>
  <div class="login">
    <div class="login_container">
      <div class="hd_box">
        <img class="head_img" src="../assets/images/login_hd.png">
      </div>
      <div class="form_box">
        <div class="group phone">
          <input id="phone" type="tel" v-model="tel" @input="checkPh" maxlength="11" @blur="blur" placeholder="请输入手机号">
          <!--<input id="phone" type="tel" :disabled="telDis" v-model="tel" @focus="focus" @blur="blur" @input="checkPh" maxlength="11">-->
        </div>
        <div class="group code">
          <input id="code" type="tel" v-model="code" @input="checkPh" maxlength="6" @blur="blur" placeholder="请输入验证码">
          <div ref="send_txt" id="send_txt" :class="{'send':true,'active':canSend}" @click="getCode">{{sendText}}</div>
        </div>
        <div style="width: 70vw;margin:auto;" id="captcha"></div>
        <div :class="loginStatus?'btn active':'btn'" @click="getUcCode"><span class="icon"></span><span>登 录</span></div>
      </div>
      <!-- <div class="ft_box" v-show="blurFlag"></div> -->
    </div>
    <eject :message="ejectText" :showState="ejectStatus"></eject>
    <cf :message="cfText" :showState="cfStatus"></cf>
  </div>
</template>

<script>
import Eject from './Eject'
import Cf from './Confirm'
export default {
  name: 'Login',
  components: {
    eject: Eject,
    cf: Cf
  },
  data () {
    // 手机号 验证码 发送验证码按钮标识

    return {
      nickname:'',
      head_img:'',
      nextPath:'Order',  
      tel: '',
      code: '',
      sendCode: true,
      canSend: false,
      sendStatus: false,
      loginStatus: false,
      ejectText:'',
      ejectStatus: false,
      cfText: '',
      cfStatus: false,
      sendText: '获取验证码',
      time: 60,
      telDis:false,
      blurFlag: true
    }
  },
  created(){
    // this.shareConfig()
  },
  mounted(){
    if(this.$route.params.pre == 'index'){
        this.nextPath = 'Order'
    }else if(this.$route.params.pre == 'address'){
        this.nextPath = 'Address'
    }
    console.log(this.nextPath);
  },
  methods: {
    getUcCode(){
        if(this.loginStatus){
            let phone_num = this.tel;
            let code = this.code;
            let ucCode = this.$common.ucLogin(phone_num,code,this);
        }
    },
    bindPhone(ucCode){
      if(this.loginStatus){  
        let phone_num = this.tel
        // let code = this.code
        let code = ucCode
        let member_id = window.localStorage.getItem('extendAbcMemberid')
        let openid = window.localStorage.getItem('extendAbcOpenid')
        let fd = this.$common.getParam('get',{phone:phone_num,code:code,member_id:member_id,openid:openid})
        let actionUrl = this.$common.config.gzhUrl + 'v3/member/gift-bag/login'
        let _this = this
        let conf = {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
        this.$axios.post(actionUrl,fd,conf).then((res) => {
          if(res.data.code == 200){
              if(res.data.data.is_have_gift_bag){
                  localStorage.setItem('renew_phone',phone_num);
                  this.$router.push({name:this.nextPath})
              }else{
                  this.showCf('年卡会员续费专享<br/>活动将于到期前30天开启<br/>敬请期待～');                  
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
    //   this.blurFlag = true;
        window.scrollTo(0, 0)
    },
    focus(){
    //   this.blurFlag = false;
    },
    checkPh () {
      if(this.$common.VL.phNum(this.tel)){
        if(this.sendText == '获取验证码' || this.sendText == '重新获取'){
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
      if(!this.canSend){
          return;
      }
      if(this.sendStatus){
        this.sendStatus = false;
        this.canSend = false;
        this.$common.ucSend(this.tel,this);
        // let url = this.$common.config.gzhUrl + 'v2/api/api/send'
        // let fd = this.$common.getParam('get',{phone:this.tel})
        
        // let conf = {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
        // this.$axios.post(url,fd,conf).then(
        //   (res) => {
        //   if(res.data.code == 200){
        //     _this.time = 60;
        //     _this.timer();
        //     _this.showEject('发送成功');
        //   }else{
        //     _this.showEject(res.data.msg);
        //     _this.sendStatus = true;
        //     _this.canSend = true;
        //   }
        // })
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
        // this.sendText = "重新获取" + this.time + "s";
      if (this.time > 0) {
        this.time--;
        this.sendText = "重新获取" + this.time + "s";
        // document.getElementById('send_txt').innerText = "重新获取" + this.time + "s";
        // this.$set(that,'sendText',"重新获取" + this.time + "s");
        this.canSend = false;
        setTimeout(this.timer, 1000);
      } else{
        this.time = 60;
        // document.getElementById('send_txt').innerText = "重新获取";
        this.sendText="重新获取";
        this.canSend = true;
        this.sendStatus = true;
      }
    },
    showCf: function (text) {
        this.cfText = text
        this.cfStatus = true
    },
    initCf: function () {
        this.cfStatus = false
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
        height: 5.32rem;
      }
    }
    .form_box {
      position: relative;
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
        width: 6.03rem;
        height: .92rem;
        line-height: .92rem;
        border-radius: .46rem;
        background: #FFFFFF;
        position: relative;
        text-align: left;
        margin: auto;
        &.code {
          position: relative;
          margin-top: .32rem;
        }
        &::before{
            content: '';
            width: 6.07rem;
            height: .96rem;
            border-radius: .48rem;
            background-image: linear-gradient(to bottom , #9B70FE, #583EE4);
            position: absolute;
            top: -.02rem;
            left: -.02rem;
            z-index: -1;
        }
        input {
          width: 2.4rem;
          height: .64rem;
          margin-left: .55rem;
          background: #FFFFFF;
          font-size: .26rem;
          outline: none;
          border: 0;
          color: #000;;
          font-weight: bold;
          &::placeholder {
            color: #C3C3C3;
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
          line-height: .92rem;
          text-align: center;
          color: #919191;
          font-weight: bold;
          /*background: #AAAAAA;*/
          &.active {
            font-family: PingFangSC-Regular;
            color: #563ACC;
          }
        }
      }
      .btn{
        width: 4.4rem;
        height: .9rem;
        margin: .8rem auto 0;
        line-height: .9rem;
        background: #B4B4B4;
        border-radius: .45rem;
        box-shadow: 0 .02rem .04rem 0 #000;
        background-size: cover;
        color: #6D6D6D;
        font-family: FZY4JW--GB1-0;
        font-size: .4rem;
        font-weight: bold;
        letter-spacing: .036rem;
        text-align: center;
        &.active{
            width: 4.52rem;
            height: 1.02rem;
            background: url('../assets/images/login_btn_active.png');
            background-size: cover;
            color: #B12C13;
            box-shadow: none;
        }
      }
    }
  }
</style>

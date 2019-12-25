<template>
  <div class="login">
    <div class="login_container">
      <div class="form_box">
        <p class="login_txt">*请使用ABC Reading账号登录</p>
        <div class="group phone">
          <span class="icon"></span>
          <input id="phone" type="tel" v-model="tel" @focus="focus" @blur="blur" @input="checkPh" maxlength="11" placeholder="请输入手机号">
        </div>
        <div class="group code">
          <span class="icon"></span>
          <input id="code" type="tel" v-model="code" @input="checkPh" @focus="focus" @blur="blur" maxlength="6" placeholder="请输入验证码">
          <div :class="{'send':true,'active':canSend}" @click="getCode">{{sendText}}</div>
        </div>
        <div :class="loginStatus?'btn active':'btn'" @click="login"><span class="icon"></span><span>立即查询</span></div>
      </div>
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
      let ph = window.localStorage.getItem('queryCourierPhone');
      if(ph){
          this.$router.replace({name:'Info'})
      }
  },
  methods: {
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
    login(){
        if(this.loginStatus){
            let phone_num = this.tel
            let code = this.code
            let fd = this.$common.getParam('get',{phone:phone_num,code:code})
            let actionUrl = this.$common.config.gzhUrl + 'v3/member/query-courier/to-query'
            let _this = this
            let conf = {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
            this.$axios.post(actionUrl,fd,conf).then((res) => {
            if(res.data.code == 200){
                window.localStorage.setItem('queryCourierPhone',phone_num);
                _this.$router.push({name:'Info'})
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .login_container {
    position: relative;
    z-index: 10;
    padding-top: .6rem;
    min-height: calc(100vh - 5.87rem);
    .form_box {
      position: relative;
      width: 6.86rem;
      margin: auto;
      padding-bottom: .58rem;
      background: #FFF;
      box-shadow: 0 .06rem .18rem 0 rgba(111,18,20,.4);
      border-radius: .36rem;
      .login_txt{
        font-family: PingFangSC-Regular;
        font-size: .24rem;
        color: #D7490A;
        letter-spacing: 0;
        padding: .48rem 0;
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
            background: url('../assets/imgs/icon_phone.png') no-repeat;
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
            background: url('../assets/imgs/img_code.png') no-repeat;
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
          color: #B6B4B2;
        //   background: #EDDDD2;
          border-radius: .3rem;
          &.active {
            color: #F9822B;
          }
        }
      }
      .btn{
        width: 6.28rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        font-weight: bold;
        margin: .48rem auto 0;
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

<template>
  <div class="login">
    <div class="login_container">
      <div class="hd_box"></div>
      <div class="form_box">
        <div class="group phone">
          <span class="icon"></span>
          <input id="phone" type="tel" :disabled="telDis" v-model="tel" @focus="focus" @blur="blur" @input="checkPh" placeholder="请输入手机号" maxlength="11">
        </div>
        <div class="group code">
          <span class="icon"></span>
          <input id="code" type="tel" v-model="code" @input="checkPh" @focus="focus" @blur="blur" placeholder="请输入验证码" maxlength="6">
          <div :class="{'send':true,'active':canSend}" @click="getCode">{{sendText}}</div>
        </div>
        <div :class="loginStatus?'btn active':'btn'" @click="login"><span>登录</span></div>
      </div>
    </div>
    <info-content></info-content>
    <download-footer v-show="blurFlag"></download-footer>
    <eject :message="ejectText" :showState="ejectStatus"></eject>
  </div>
</template>

<script>
import InfoContent from './InfoContent'
import Eject from './Eject'
import DownloadFooter from './DownloadFooter'
export default {
  name: 'Login',
  components: {
    infoContent: InfoContent,
    eject: Eject,
    downloadFooter: DownloadFooter,
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
      ejectText:'123',
      ejectStatus: false,
      sendText: '获取验证码',
      time:0,
      telDis:false,
      blurFlag: true
    }
  },
  created(){
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      let openid = window.localStorage.getItem('extendNueOpenid')
      let url = this.$common.config.gzhUrl + 'v2/distribute/activity/get-user-info'
      let fd = this.$common.getParam('get',{open_id:openid})
      let _this = this;
      this.$axios.get(url+'?'+fd).then((res) => {
        if(res.data.code == 200){
          let da = res.data.data
          window.localStorage.setItem('extendNueMemberId',da.app_member_id)
          window.localStorage.setItem('extendNueParentId',da.promoter_member_id)
          window.localStorage.setItem('extendNuePhone',da.phone)
          if(da.phone && da.app_member_id>0){
            if(da.promoter_member_id > 0){
              _this.$router.push('list')
            }else {
              _this.tel = da.phone
              _this.telDis = true
              this.canSend = true;
              this.sendStatus = true
            }
          }else{
          }
        }else{
          _this.showEject(res.data.msg)
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
    login: function () {
      if(this.loginStatus){
        let promoterId = this.$common.VL.getRequest().promoter_member_id
        let openid = window.localStorage.getItem('extendNueOpenid')
        let id = window.localStorage.getItem('extendNueMemberId')
        let url = this.$common.config.gzhUrl + 'v2/distribute/login/quick-login'
        let fd = this.$common.getParam('get',{promoter_member_id:promoterId,user_member_id:id,open_id:openid,
          phone:this.tel,code:this.code,activity_id:1})
        let _this = this;
        let conf = {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
        this.$axios.post(url,fd,conf).then((res) => {
          if(res.data.code == 200){
            _this.$router.push('Suc')
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
        this.sendText=this.time+"s后重新获取";
        setTimeout(this.timer, 1000);
      } else{
        this.time=0;
        this.sendText="获取验证码";
        this.canSend = true;
        this.sendStatus = true;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .login{
    padding-bottom: 1.2rem;
    background: #35ADF2;
  }
  .login_container {
    width: 100%;
    /*min-height: calc(~'100vh - 0.3rem');*/
    background-size: 100%;
    position: relative;
    z-index: 10;
    margin-bottom: .5rem;
    .hd_box {
      width: 7.5rem;
      height: 8.02rem;
      margin: auto;
      background: url('../assets/imgs/login_bg_hd.png') no-repeat;
      background-size: 100%;
      text-align: center;
      position: relative;
    }
    .form_box {
      .group {
        width: 6.7rem;
        height: .98rem;
        background: #0574B4;
        border-radius: .1rem;
        margin: .25rem auto;
        line-height: .98rem;
        font-size: .3rem;
        position: relative;
        text-align: left;
        .icon {
          display: inline-block;
          vertical-align: middle;
          width: .64rem;
          height: .64rem;
        }
        &.phone {
          .icon {
            width: .26rem;
            height: .36rem;
            background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAABICAYAAAC5mNZRAAAAAXNSR0IArs4c6QAABJpJREFUaAXtW11oXEUUnnNzk64hiWnFNin5EQvx50XJJlIFMS8SEKxQUFBRDE27Kb6aNwst9EGoFPRBd9tgLFJEpQEtCvHBBmmxmgQEoWCkYnLX1Jba1M3abJLde/wmdGUzOxsySbZOZAaWe8+Zn/t955s79+7uGRJKiSau7hLhQi/c3fi0COI6pcl/azKlAGAKn2HhVQ2Mx3ZcLgREeeMws3c2ERyF/QazqMz7bT4SiUXge/vZWPObh4lCiXWJkCTzRSL5mWDeazOBktiIhvbEmp6XpCpko9mG/UeE4L6SHeyveGhiLO1d+fL4OYompls4zE4A8xb7ca+IcJ48v80XnNunI0OCAszIDzEpp1cc5k5XstiJ2fQaC25WLr1FcvHhlKuZUmiyNlLz6EjP1ptKhRVm1+DM8VQm/SOItSqAuj0471OcgjwRt5WMxCqxSYwqbixqrVKhu9UKYp5UfaqNKNXnOFO25f3bnobrRMTqdfO2xFhUSaJeEjIq7SeTuynHp1KZ2TajjoaNO+JBKpoIDo3Hmt816Yopt/oSTXClyIZnmLmsZCQiRL+OQ35HBnD1CIUwIiTElV0YHKvMHSwhP2lyNSNC99zlBVjO50wusN62Hnk/m4xhROjrVxv+Fh4dxLNpweQia22LReH06P6dZ036Gy8K47GmU52D14Zzi5lHMGPLtspVhhW/ft/XeIkMX8iMCclojfZs/wMH+bGuGE0569BrADlCmqBY5XIKWSWHBoxTSBMUq1xOIavk0IBxCmmCYpXLKWSVHBowTiFNUKxyOYWskkMDximkCYpVLqeQVXJowDiFNEGxyuUUskoODRinkCYoVrmcQlbJoQHjFNIExSqXU8gqOTRgnEKaoFjlomh8ag4ZjJFCVMgUvAo7Xeiz8LwGuHcU4gLujPZP49sNlzUu7GjzubuHbFZHYvvfKaS9h3BzfQ6ylyxX42Hc68+pGPWEhPhkrK/lY7XxWm2Zlhbxr0cu7Lt3dq1jqP064lMvIgWtiFBZp9zjA8G26PvBacFBam4x81d7fGq0/eR0VAW3kXbZCCFJkOYXxRCyd19aes7BRlZfB2Wz33R+8Lua0bthnMpGqDM+/QTyEp9SkcpMxXAhfF31b5RdNkKiIvdAaZD8YOm69dWUjVBI/i+loCErcqJU3Xr9nuDiVOKQkRW9zrKnt/EClv/zxcNQ2mf/vWK/mUeLEVw8pFv+qQ6FCK4wXdTWelvuFKmuqsRuFzqD8bKyFVIufxI+PX3xYONv+l6r92Ks4mkLLnjbDs5hRepShprxK7zdPxxo2pCp0TXIkflcsvq73uYbynXWZD52ItmWzYUX0Xlr4QAgOSK/PsgNUMcKK+Q5Km/h8BWWWrs2c9BSmvUzEKG6GLPoJ/nwm8/yZQCvVxtsKpvEzerauvs9OQ2gRv+mAq8BKzmcf7l+Zmk1w/6CAdy4b2nabQqXxC45SLD/biqURseJ5Cschsduf2OVLquL/KmAPK9/7EDTR3mgywhJZ9en12rSNxb24qbrxpbPVryC1eYb23DEDpxZPDsnMcWGa7ZVDY28sH3Zbx//AKgkSpjLwkGBAAAAAElFTkSuQmCC');
            background-size: cover;
            margin: 0 .27rem 0 .4rem;
          }
          margin-bottom: .23rem;
        }
        &.code {
          position: relative;
          .icon {
            width: .3rem;
            height: .37rem;
            background: url('data:image/png;base64,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');
            background-size: cover;
            margin: 0 .23rem 0 .4rem;
          }
        }
        input {
          width: 2.4rem;
          height: .64rem;
          background: #0574B4;
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
          right: .26rem;
          top: .15rem;
          font-size: .24rem;
          width: 2.1rem;
          height: .68rem;
          border-radius: .5rem;
          line-height: .68rem;
          text-align: center;
          //color: #4A96DE;
          color: #FFFFFF;
          background: #AAAAAA;
          //background: #145EA6;
          &.active {
            background: #3297E2;
            color: #FFFFFF;
          }
        }
      }
      .btn{
        width: 4.88rem;
        height: .86rem;
        line-height: .86rem;
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
        &::before{
          content: '';
          width: 5rem;
          height: .98rem;
          background: #145EA6;
          position: absolute;
          left: -.06rem;
          top: -.06rem;
          right: -.06rem;
          bottom: -.06rem;
          border-radius: .5rem;
          z-index: -1;
          box-shadow: 0 .06rem 0 0 rgba(0,0,0,0.14);
        }
        &.active{
          background-image: linear-gradient(0deg, #F38E10 0%, #FCD926 100%);
          text-shadow: 0 .02rem .12rem #D28307;
          color: #9B510F;
          &::before{
            content: '';
            width: 5rem;
            height: .98rem;
            background: linear-gradient(0deg, #FF8C05 0%, #FFF009 100%);
            position: absolute;
            left: -.06rem;
            top: -.06rem;
            right: -.06rem;
            bottom: -.06rem;
            border-radius: .5rem;
            z-index: -1;
            box-shadow: 0 .06rem 0 0 rgba(0,0,0,0.14);
          }
        }
      }
    }
  }
</style>

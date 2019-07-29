<template>
  <div class="login">
    <div class="login_container">
      <div class="hd_box">
        <img class="head_img" src="https://qnfile.abctime.com/extend/login_hd.png">
        <!-- <div class="user_box">
          <img :src="head_img">
          <span class="nickname">{{nickname}}</span>
        </div> -->
      </div>
      <!-- 未兑换 -->
      <div v-if="!canStudy" class="form_box">
        <p class="exchange_title">课程兑换</p>
        <p v-show="!phone" class="login_txt">登录或注册您的ABC Reading账号</p>
        <p v-show="phone" class="exchange_ph">检测到您的ABC Reading账号为<br/>
            <span>{{phone}}</span>
        </p>
        <p v-show="phone" class="exchange_tag">输入兑换码，即可进行兑换～</p>
        <div v-show="!phone" class="group phone">
          <span class="icon"></span>
          <input id="phone" type="tel" v-model="tel" @focus="focus" @blur="blur" @input="checkPh" maxlength="11" placeholder="请输入手机号">
        </div>
        <div v-show="!phone" class="group code">
          <span class="icon"></span>
          <input id="code" type="tel" v-model="code" @input="checkPh" @focus="focus" @blur="blur" maxlength="6" placeholder="请输入验证码">
          <div :class="{'send':true,'active':canSend}" @click="getCode">{{sendText}}</div>
        </div>
        <div class="group ex_code">
          <span class="icon"></span>
          <input id="ex_code" class="ex_input" type="text" v-model="ex_code" @input="checkPh" @focus="focus" @blur="blur" placeholder="请输入课程兑换码">
        </div>
        <div :class="loginStatus?'btn active':'btn'" @click="bindPhone"><span class="icon"></span><span>立即兑换</span></div>
      </div>
      <!-- 已兑换 -->
      <div v-else class="form_box">
          <img class="exchange_suc_img" src="../assets/imgs/exchange_suc_tag.png">
          <p class="exchenge_suc_txt">恭喜您，兑换成功!</p>
          <p class="exchange_content_txt">
              获得了
              <span v-if="!hasAll">课程《{{lesson_name}}》，</span>
              <span v-else>素养课的下列课程，</span>
              快去学习吧
          </p>
          <div v-if="!hasAll">
              <img class="exchange_lesson_img" :src="lesson_img">
          </div>
          <div v-else class="all_list">
              <ul>
                  <li v-for="item in allLessonArr">
                      <img :src="item" alt="">
                  </li>
              </ul>
          </div>
          <div v-if="!hasAll" class="btn study_now" @click="toStudy()">开始学习</div>
          <div v-else class="btn study_now" @click="toList()">开始学习</div>
      </div>
      <p v-if="!canStudy" class="rules_link">继续操作，即表示已阅读并同意大V店<span @click="toRules()">《用户隐私协议》</span></p>  
    </div>
    <eject :message="ejectText" :showState="ejectStatus"></eject>
    <dial :message="diaText" :showState="diaStatus"></dial>
  </div>
</template>

<script>
import Eject from './Eject'
import Dialogs from './Dialogs'
import { clearInterval } from 'timers';
export default {
  name: 'Login',
  components: {
    eject: Eject,
    dial: Dialogs,
  },
  data () {
    // 手机号 验证码 发送验证码按钮标识

    return {
      nickname:'',
      head_img:'',
      phone:'',
      phoneNum:'',

      tel: '',
      code: '',
      ex_code: '',
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
      canStudy: false,
      hasAll: false,
      lesson_name: '',
      lesson_img: '',
      allLessonArr: [],
      diaText: '',
      diaStatus: false
    }
  },
  created(){
  },
  mounted(){
    this.nickname = window.localStorage.getItem('extendAbcNickname')
    this.head_img = window.localStorage.getItem('extendAbcHeadimg')
    this.lesson_name = window.localStorage.getItem('abcExLessonName')
    this.phoneNum = window.localStorage.getItem('extendAbcPhone')
    this.phone = this.phoneNum.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  },
  methods: {
    toRules(){
        location.href = window.location.origin + '/mystory/rules.html'
    },
    toList(){
        location.href = window.location.origin + '/extend/ex_list.html?chid='+this.$common.VL.getRequest().chid
    },
    toStudy(){
        this.$router.push({name:'Cata'})
    },
    bindPhone(){
      if(this.loginStatus){
        let phone_num = this.tel
        let code = this.code
        let member_id = window.localStorage.getItem('extendAbcMemberid')
        let openid = window.localStorage.getItem('extendAbcOpenid');
        let fdObj = {
            member_id:member_id,
            openid:openid,
            gift_code:this.ex_code,
        };
        if(this.phoneNum){
            delete fdObj.phone;
            delete fdObj.code;
        }else{
            fdObj.phone = this.tel;    
            fdObj.code = this.code;    
        }
        let fd = this.$common.getParam('get',fdObj)
        let actionUrl = this.$common.config.gzhUrl + 'v3/group/month-card/gift-card-exchange'
        let _this = this
        let conf = {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
        this.$axios.post(actionUrl,fd,conf).then((res) => {
          if(res.data.code == 200){
            _this.canStudy = true;
            if(res.data.data.cover_list.length>1){
                _this.hasAll = true;
                _this.allLessonArr = res.data.data.cover_list;
            }else{
                _this.lesson_img = res.data.data.cover_list[0];
            };  
          }else{
            _this.showDialogs(res.data.msg)
          }
        })
      }
    },
    blur(){
      this.blurFlag = true;
    },
    focus(){
      this.blurFlag = false;
    },
    checkPh () {
      if(this.phoneNum){
        if(this.ex_code){
            this.loginStatus = true
        } else {
            this.loginStatus = false
        }
      } else {
        if(this.$common.VL.phNum(this.tel)){
            if(this.sendText == '获取验证码' || this.sendText == '重新发送'){
                this.canSend = true
                this.sendStatus = true
            }
            if(this.code.length == 6 && this.ex_code){
                this.loginStatus = true
            } else {
                this.loginStatus = false
            }
        } else {
            this.canSend = false
            this.sendStatus = false
            this.loginStatus = false
        }
      }
    },
    getCode: function () {
      let _this = this;
      if(this.sendStatus){
        this.sendStatus = false;
        this.canSend = false;
        let url = this.$common.config.gzhUrl + 'v3/marketingcourse/course/send'
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
            _this.tel = "";
            _this.time = 0;
            // _this.canSend = true;
            // _this.sendStatus = false;
            _this.showDialogs(res.data.msg);
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
    showDialogs: function (text) {
        console.log(text);
      this.diaText = text
      this.diaStatus = true
    },
    initDialogs: function () {
      this.diaStatus = false
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
        if(this.$common.VL.phNum(this.tel)){
            this.canSend = true;
        }
        this.sendStatus = true;
      }
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
      margin-top: -.2rem;
      z-index: 102;
      background: #FFFFFF;
      border-radius: .24rem .24rem 0 0;
      .exchange_title{
          font-family: PingFangSC-Semibold;
          font-weight: bold;
          font-size: .36rem;
          color: #333;
          letter-spacing: 0;
          padding-top: .4rem;
      }
      .exchange_ph{
          font-family: PingFangSC-Regular;
          font-size: .24rem;
          color: #333;
          letter-spacing: 0;
          text-align: center;
          line-height: .32rem;
          padding-top: .08rem;
          span{
              font-size: .32rem;
              color: #FF574D;
              line-height: .45rem;
          }
      }
      .exchange_tag{
          font-family: PingFangSC-Regular;
          font-size: .24rem;
          color: #999;
          letter-spacing: 0;
          padding-top: .48rem;
          margin-bottom: .36rem;
      }
      .login_txt{
          font-family: PingFangSC-Regular;
          font-weight: bold;
          font-size: .24rem;
          color: #999;
          letter-spacing: 0;
          padding: .08rem 0 .36rem;
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
        &.ex_code {
          position: relative;
          margin-top: .32rem;
          .icon{
            width: .36rem;
            height: .36rem;
            background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAflBMVEUAAABnZ2dmZmZ5eXloaGhqampnZ2dnZ2dmZmZqampnZ2dmZmZnZ2d5eXlmZmZmZmZnZ2dmZmZmZmZnZ2dpaWlmZmZmZmZnZ2dnZ2dnZ2doaGhoaGhoaGhqampmZmZnZ2dmZmZnZ2doaGhmZmZnZ2dnZ2doaGhnZ2dnZ2dmZmYz96vkAAAAKXRSTlMAaZ4FVQuvpvggTNFGCMvHQLSZlSjk1bqKbjs0JBLx3MJ6GuyQdi9ihv3vnl8AAAGbSURBVDjLhZPpcoMwDIQxlw3mPlIghITmaPf9X7DIteMw0Gb/eMb+JFarwVnrFPtfjA2B86fGLoPW4TbuM8EVryqLPeg0AeLiVjc3EyDx0w51nBNtxitCoqTn/K/IBcTrAI+c79QUrv/q+AwUzhu5wDV4wxQA/D9f09+jBFx907gRHUP5LLr/vjUAIn3Vo6Tjgt5AZ+C4HDXAzZUnETtOgsNzWA5Uy3Gwo3lpIuY0zRCnhvKBdlkGIFI7plFo4hFkJgFym0X+oXQxEPlbHDCgstBR78RCIcAIqv+DKuBO0M1Cs6/UW6gDZvO5rXGbAaOlZM8FMXadGGvRs8TcSTIeAIJCMWZKSs6u26MIVPCNY5szDY2qkhJq1b5kYMo6SE9DfPpU29fDNybwOENLTXPE4yjhqc8Dg3q0sWWq+hskqVPK1z+L9PW+es55Rz1PABLnjdIzuG1yvjx2qU/qY7MXX+/aPiYAPFr99MOGGjMsKmMTmB8K1FuLFUhChl0dZhNAs2+V5Fgpb3adDXVriLa2lrYjx2y+szha3/4A1kUxDUNIdfcAAAAASUVORK5CYII=');
            background-size: cover;
            position: absolute;
            top: .27rem;
            left: .21rem;
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
          &.ex_input{
              width: 4.5rem;
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
        margin: .6rem auto 0;
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
        &.study_now{
            background-image: linear-gradient(90deg, #94D328 0%, #51AA35 100%);
            box-shadow: 0 .02rem .06rem 0 rgba(0,0,0,0.30);
            position: fixed;
            left: .48rem;
            bottom: .33rem;
        }
      }

      // 兑换成功
      .exchange_suc_img{
          width: 1.6rem;
          height: auto;
          margin: .48rem auto .24rem;
      }
      .exchenge_suc_txt{
        font-family: PingFangSC-Semibold;
        font-weight: bold;
        font-size: .32rem;
        color: #333;
        letter-spacing: 0;
      }  
      .exchange_content_txt{
          font-family: PingFangSC-Regular;
          font-size: .24rem;
          color: #999;
          letter-spacing: 0;
          padding-top: .08rem;
      }
      .exchange_lesson_img{
          width: 6.9rem;
          margin: .55rem auto 0;
          border-radius: .16rem;
      } 
      .all_list{
          ul{
              font-size: 0;
              text-align: left;
              margin: auto;
              padding: .54rem 0 1.5rem .13rem;
              li{
                display: inline-block;
                img{
                    width: 3.4rem;
                    margin: 0 .11rem .22rem;  
                    border-radius: .08rem; 
                }
            }
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
        padding: 1.3rem 0 .2rem;
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

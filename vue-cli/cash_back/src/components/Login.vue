<template>
    <div class="login">
        <div class="form_box">
            <div class="group phone">
                <input id="phone" type="tel" v-model="tel" @focus="focus" @blur="blur" @input="checkPh" maxlength="11" placeholder="请输入手机号">
            </div>
            <div class="group code">
                <input id="code" type="tel" v-model="code" @input="checkPh" @focus="focus" @blur="blur" maxlength="6" placeholder="请输入验证码">
                <div :class="{'send':true,'active':canSend}" @click="getCode">{{sendText}}</div>
            </div>
            <div style="width: 70vw;margin:auto;" id="captcha"></div>
            <div :class="loginStatus?'btn active':'btn'" @click="getUcCode"><span>立即登录</span></div>
        </div>
        <p v-show="blurFlag" class="rules_link">继续操作，表示阅读并同意<span @click="toRules">ABC Reading《用户协议》</span></p>
        <eject :message="ejectText" :showState="ejectStatus"></eject>
    </div>
</template>
<script>
    import Eject from './Eject'
    export default {
        components: {
            eject: Eject,
        },
        data(){
            return{
                tel: '',
                code: '',
                sendCode: true,
                canSend: false,
                sendStatus: false,
                loginStatus: false,
                // sendText:'（34秒后重新获取）',
                sendText:'获取验证码',
                time:0,
                blurFlag: true,
                canLogin: true,
                ejectText:'',
                ejectStatus: false,
            }
        },
        mounted(){
            
        },
        methods:{
            toRules(){
                location.href = 'https://static.h5.abctime.com/mystory/rules.html'
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
                if(this.sendStatus){
                    this.sendStatus = false;
                    this.canSend = false;
                    this.$common.ucSend(this.tel,this);
                }
            },
            timer() {
                if (this.time > 0) {
                    this.time--;
                    this.canSend = false;
                    this.sendText= "（" + this.time + "秒后重新获取）";
                    setTimeout(this.timer, 1000);
                } else{
                    this.time=0;
                    this.sendText="重新发送";
                    this.canSend = true;
                    this.sendStatus = true;
                }
            },
            showEject: function (text) {
                this.ejectText = text
                this.ejectStatus = true
            },
            initEject: function () {
                this.ejectStatus = false
            },
            getUcCode(){
                if(this.loginStatus){
                    let phone_num = this.tel;
                    let code = this.code;
                    this.$common.ucLogin(phone_num,code,this);
                }
            },
            bindPhone(ucCode){
                if(this.loginStatus && this.canLogin){
                    this.canLogin = false;
                    let code = ucCode
                    let member_id = window.localStorage.getItem('extendAbcMemberid')
                    let openid = window.localStorage.getItem('extendAbcOpenid')
                    let fd = this.$common.getParam('get',{code:code,member_id:member_id,openid:openid})
                    this.bind(fd);
                }
            },
            async bind(params) {
                try {
                    let res = await this.$api.bindPhone(params)
                    console.log('绑定结果', res)
                    if(res.code == 200){
                        this.$emit('update:hasLogin',true)  
                        this.$emit('update:userData',res.data)  
                    }else{
                        this.showEject(res.msg)
                    }
                    this.canLogin = true;
                } catch (e) {
                    console.log('​catch -> e', e)
                }
            },  
        }
    }
</script>
<style lang="less" scope>
    .form_box {
        position: relative;
        margin-top: 27px;
        .group {
            width: 620px;
            height: 96px;
            line-height: 96px;
            background: #FFFFFF;
            border-bottom: 2px solid #EBE9E9;;
            position: relative;
            text-align: left;
            margin: auto;
            &.phone {
                position: relative;
                &::before{
                    display: block;
                    content: '';
                    width: 26px;
                    height: 36px;
                    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAkBAMAAABlFDcgAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAkUExURUxpcSckJCYlIyQkJCckJCglIyYkIykmJj8/PyYkJCYkIyYkI1HUFj0AAAALdFJOUwCos0pUXuUdBMbJOWsPaQAAAGlJREFUGNNjYBfbDQOJBQxluxEgnUF6mxIMZG9kyM5ggIG2bQy7BRgY2I2NjQsYGBh3g3nMQJ4BnIcqBwUjj7c0FAaigDxkgM6b4gIDnlBT2EEBCDeTGRS4mDxwrEBUAmMFNcZQYxMlpgFwLHIG+RYB6gAAAABJRU5ErkJggg==");
                    background-size: cover;
                    position: absolute;
                    top: 22px;
                    left: 5px;
                }
            }
            &.code {
                position: relative;
                margin-top: 48px;
                &::before{
                    display: block;
                    content: '';
                    width: 30px;
                    height: 37px;
                    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAlCAMAAABiU6n+AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABIUExURUxpcSclIyYkIyYmJSQkJCYmIygnJyYkIyYkIyYkIygoKC8vLyYkIyYlI1ZWVigoKCYkIyYkIyYkIygoJiYkJCckJCYkIyYkI+Ef514AAAAXdFJOUwCHnD1NRxT3u9kiDO1pAxqx4NUrf1PFuAmROgAAAN5JREFUOMu9k9GSwiAMRbNAoRKgQnXu//+pQZ3dosSnHc9LyxzgEpoS/VKcaSk14wpNsA1Pmn23uYtQa+jPPLP1ykR8re9+l0WGH+9sZJt90GfgrI2IIpD839AnII7Jl+P0y5guaUMxVk4yRseXsGP4CmxHvQHrf2kvevcHdtHPQr1JmJKMzOAKlcq95LBO6Z+B2kvJQ/GNAk6kcEL4oo7WRl1HJ0RVL10vmi7uTtFW226tujmLt6yfvDCXL95aQipzW0T1LjRumeBM78cFH5AbzEGT4f6fbflnSpbWvwHxbhthwmLC4AAAAABJRU5ErkJggg==");
                    background-size: cover;
                    position: absolute;
                    top: 22px;
                    left: 3px;
                }
            }
            input {
                width: 240px;
                height: 40px;
                margin-left: 64px;
                background: #FFFFFF;
                font-size: 30px;
                color: #000;
                letter-spacing: 1.7px;
                outline: none;
                border: 0;
                color: #000;;
                &::placeholder {
                    color: #C0C0BF;
                }
            }
            .send {
                position: absolute;
                right: .24rem;
                top: 0;
                // width: 180px;
                height: 74px;
                line-height: 96px;
                text-align: center;
                font-size: 28px;
                color: #C0C0BF;
                letter-spacing: 1.7px;
                &.active {
                    color: #F9822B;
                }
            }
        }
        .btn{
            width: 628px;
            height: 100px;
            line-height: 100px;
            text-align: center;
            font-weight: bold;
            margin: 64px auto 0;
            background: #D0CBC6;
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            font-size: 40px;
            color: #FFF;
            letter-spacing: 7.09px;
            border-radius: 50px;
            &.active{
                background-image: linear-gradient(135deg, #FEBA40 0%, #FF7360 100%);
            }
        }
    }
    .rules_link{
        width: 100%;
        opacity: 0.6;
        font-family: PingFangSC-Regular;
        font-size: 20px;
        color: #393533;
        letter-spacing: 0;
        margin-top: 183px;
    }
</style>
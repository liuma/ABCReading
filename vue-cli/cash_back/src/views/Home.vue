<template>
  <div class="home">
    <div class="hd"></div>
    <img v-show="!hasLogin" class="logo" src="../assets/imgs/logo.png">
    <p v-show="!hasLogin" class="txt_login">登陆完成打卡学习的手机号，即可领取返现金额</p>
    <Login v-if="!hasLogin" :hasLogin.sync='hasLogin' :userData.sync='userData'></Login>
    <div v-else class="cash_wrap">
        <div class="user_info">
            <img class="headimg" :src="userData.headimg_url"/>
            <p class="phone">{{userData.phone}}</p>
        </div>
        <div class="punch_days">
            <p class="days"><span class="day">{{punchDays}}</span>天</p>
            <p class="tag">累计已打卡</p>
        </div>
        <div v-if="status == 1" class="no_withdraw">
            <p class="txt">暂时不可以提现哦～</p>
            <p class="txt_ft">更多详情可在ABC Reading App上查看</p>
        </div>
        <div v-else class="can_withdraw">
            <router-link :class="{'btn_list':true,'new_sts':newSts}" to="/list">提现记录</router-link>
            <p class="txt_1">恭喜完成打卡!</p>
            <p class="txt_2">努力的人不应该被被辜负，快来领取你的奖学金吧～</p>
            <div class="cash_box">
                <p class="txt_tag">当前可提现金额(元)</p>
                <p class="amount">{{cash_amount}}</p>
                <div v-if="status == 2" class="btn_cash" @click="showSubBox">立即提现</div>
                <p v-else-if="status == 3 && applyStatus == 0" class="txt_sts">当前提现审核中…</p>
                <p v-else-if="status == 3 && applyStatus == 1" class="txt_sts"><span class="icon"></span>已成功提现</p>
            </div>
            <div class="txt_desc">
                <p>
                    提现后，金额将通过本公众号<br/>
                    以“红包“的形式在7日内发放，请注意领取!
                </p>
            </div>
        </div>
        <div class="submit_box_wrap" v-if="showSubmit">
            <div class="submit_box">
                <div class="close" @click="hideSubmit()"></div>
                <p class="txt_title">是否确定提现“388元”<p/>
                <p class="txt_info">提现后，返现金额将通过本公众号-红包的形式发放，请注意领取。</p>
                <div class="btn_submit" @click="submit">确定提现</div>
            </div>
        </div>
        <div class="submit_box_wrap" v-if="showSubscribe">
            <div class="submit_box">
                <div class="close" @click="hideSubscribe()"></div>
                <p class="txt_title">温馨提示<p/>
                <p class="txt_info">关注公众号“美国小学图书馆“，<br/>回复“返现“，即可领取返现奖学金哦～</p>
                <div class="btn_submit" @click="toGzh">去关注</div>
            </div>
        </div>
    </div>
    <eject :message="ejectText" :showState="ejectStatus"></eject>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'
import Eject from '@/components/Eject.vue'

export default {
    name: 'Home',
    components: {
        Login,
        Eject
    },
    data (){
        return {
            hasLogin: false,
            userData: {},
            punchDays: 0,
            cash_amount: '388.00',
            showSubmit: false,
            status: 1,
            applyStatus: 0,
            subscribe: 0,
            showSubscribe: false,
            confData:{},
            errorData:{},
            ejectText:'',
            ejectStatus: false,
            newSts: false
        }
    },
    created(){
        this.matches();
        this.getMemInfo();
    },
    mounted(){
        document.title = '0元免费学'
    },
    methods: {
        async matches() {
            // 这里用try catch包裹，请求失败的时候就执行catch里的
            try {
                //定义参数对象
                let params = {
                    type: 'zc'
                }
                let res = await this.$api.wxConfig(params)
                this.confData = res;
            } catch (e) {
                this.errorData = e
            }
        },
        async getMemInfo() {
            try {
                let extendAbcOpenid = localStorage.getItem('extendAbcOpenid');
                //定义参数对象
                
                let params = this.$common.getParam('post',{openid:extendAbcOpenid})
                let res = await this.$api.getMemberInfo(params)
                if(res.code==200 && res.data.phone){
                    this.hasLogin = true;
                    this.userData = res.data;
                    this.getCashInfo();
                }else{
                    // console.log(res.phone)   
                }
            } catch (e) {
                this.errorData = e
            }
        },
        async getCashInfo() {
            try {
                let extendAbcOpenid = localStorage.getItem('extendAbcOpenid');
                //定义参数对象
                let params = this.$common.getParam('post',{openid:extendAbcOpenid})
                let res = await this.$api.getCashInfo(params);
                if(res.code==200){
                    this.punchDays = res.data.punch_days;
                    this.status = res.data.status;
                    this.subscribe = res.data.subscribe || 0;
                    if(res.data.status == 3){
                        this.applyStatus = res.data.apply_status
                    }

                    // 处理提现记录红点显示

                    
                }else{
                    // console.log(res.phone)   
                }
            } catch (e) {
                this.errorData = e
            }
        },
        async cashApply() {
            try {
                let openid = window.localStorage.getItem('extendAbcOpenid')
                let fd = this.$common.getParam('get',{openid:openid})
                let res = await this.$api.cashApply(fd)
                this.showSubmit = false;
                if(res.code == 200){
                    // this.showSubmit = false;
                    location.reload();
                }else{
                    this.showEject(res.msg)
                }
                this.canLogin = true;
            } catch (e) {
                console.log('​catch -> e', e)
            }
        }, 
        showSubBox(){
            if(!this.subscribe){
                this.showSubscribe = true;
                return;
            }
            this.showSubmit = true;
        },
        hideSubscribe(){
             this.showSubscribe = false;
        },
        submit(){
            // console.log('发起提现');
            this.cashApply()
        },
        hideSub(){
             this.showSubmit = false;
        },
        toGzh(){
            location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI3MTg2NjA5Mw==#wechat_redirect';
        },   
        showEject: function (text) {
            this.ejectText = text
            this.ejectStatus = true
        },
        initEject: function () {
            this.ejectStatus = false
        },
    }
}
</script>
<style lang="less" scope>
    .home{
        position: relative;
    }
    .hd{
        width: 100%;
        height: 284px;
        background: url('https://qnfile.abctime.com/abc_h5/2020/fx/hd_fx.png');
        background-size: cover;
    }
    .logo{
        width: 152px;
        height: 104px;
        margin: 48px auto 16px;
    }
    .txt_login{
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #262423;
        letter-spacing: 0;
    }
    .user_info{
        .headimg{
            width: 120px;
            height: 120px;
            border-radius: 50%;
            border: 6px solid #fff;
            margin: -68px auto 0;
        }
        .phone{
            padding-top: 8px;
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            font-size: 32px;
            color: #393533;
            letter-spacing: 0;
        }
    }
    .punch_days{
        width: 328px;
        height: 196px;
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWYAAAB0CAMAAACBkWgAAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABjUExURUxpcf/LTajbUqjbUtnUUf6cavuKcuy1Yu23ZYLGvUOx30Sy4f/KTf/LTkOy4P/LTUOx4P/KTfyLckOy4PuKcajbUqnbUvuKcanbU//LTfuKcUWz4fqKcf/KTajaUvqKcUOx38rRVh0AAAAddFJOUwB+yaQ9MHYhFAroTdRgfLzE7FSiz+yEnl6cuCzmMfpw2gAABJxJREFUeNrtndmCqjAQRGWTfRNBEAX+/ysviAyg6EBIuAlT592MU7TV3QlJDgeWmEFgVZVlBZFnmwfAiqDqCWwuv6KxM5nrsOZPaFWJhRfZHqtc4/FlHalcFIUuusrVOwFHOquNyEWRiK2yaVU862woxRNFiWVFFVVmrzbjIIoiz/OiqLePiI9vl8TFGDkV1DPyUeDm3jO6PR5CWS7ekdXDHjDtVuj8/7tyPKFynOiHfWB6XNhzMhXK6Z76pzqgrfVVnbYm7kzlXWRFPeyLnEaPcjyuUPndlnfjFkOdKYxxPtNLfnFiHMAUelnqtGIZIn/2jLIkdY0XX1Z0qPnZM8qS0DXSPRbKrHqLsobot66P6uUEUn5T+dLIfCHRWUYozy2ZHyI/hNYWN39DV8ZqzudAPp7LAeejSRrMMIwvnEYq1zqfCIM5hZYzPWO5a8iI5SXGcWs0vh2X5kCj92WoOCeiG5kX57++ZpaR/WZRh/ONvAGM0fnNo/bny/JPxUh/i13jtPhDemcZ0G+2axB4RmfNsIz5rkHgGQlqucVtynLP6DIggnkBBCWZjJJ5C1qZMS3HmEc9F0MHxihpKovnGYbqSjWuKlJOScRqTdTMuf8Q+hLSNwuNw/srDpSmi+vfp/GRxOmJ7Nw/A6Ep2cU3kWskSEShtsi+i3x3oBEFvwh/UZkomPMcyg4nEX4LZUKZPQ/a9uiTrhz6matqum7oda/i3zOCgYMA4va5b8IwHOll1dPUCH4kVYX1zz77vRXLGZ3iza4qG/L2jHXONErDRtzsE+TEnId2Qa0NaTbCWhB3SubQpTfqY1c3XKM3559Kw6c5RxTxsuuVE6ROZZfmqO3meQu1RsczmB2N4pg/m7gtD0K3tHVzRnFzVx4Nj3+I0HM30J6Aez83JhAgE+pu5jthjeNnLCZ9zabCoDiwN3WiCeepUJNGEw4am2h2qK5Cma9C8+7P2msfzMabfep7boe+EfB+Sp30NmvG5s+wGLTLghHvtmxMrH+KtMb8COhAnN5shDgrn54IXaD5YS0/FObsgpyPo4++k4m/wizADJ37eVVOmHDmf75ZHywcOZkkuTWSlPnh7+Ecc7M7gP/VE//T+2vNu5rfP6pw80a1aXE+P9dZhkMwNdnudol5+Acjvj3DDFdkO5Wfrcu2LUAwE67Kmfzs9zT59oyHMzukFcXzyIMYh4PNCGfy6RwFJx7MjucVzV6KU1Jmh/OKgkzHAR6bEOOMsC1ocmAMx2BNUsQJVu2Zoyqo5QAAAAAAdomGgwS2YM2FImA2Ky4U2RfG6XLWWA2+4kKRnUlMdqjuXM8gv1BkR3THcDOTuX6IV8jMWmad+EIRyLzMM+Aa7GW+NoPDNRjLbLSjG5CZqcyndvQTZGYq87Ud/c+7hv6EyeDmqXuKfz6cGT7B9tKWltsRvSATV76WL1wR0rQLjGEgD68vQ6NCj+FdWq9cNOgDmUUzjfOUxjeYBlIgCjowp9eu2xO8xMgSNNtbhjNcmXHJgYnQ7VwDnsEaLFJt5xqo5bZwDbx2tIlrwDM26AXhGZuAVxW3cQ14xiaugRlmJvwD01HPhKUk8i0AAAAASUVORK5CYII=") no-repeat;
        background-size: 100% auto;
        margin: auto;
        .days{
            font-family: PingFangSC-Regular;
            font-size: 24px;
            color: #F9822B;
            letter-spacing: 0;
            padding-top: 54px;
            .day{
                font-size: 72px;
            }
        }
        .tag{
            font-family: PingFangSC-Regular;
            font-size: 24px;
            color: #262423;
            letter-spacing: 0;
        }
    }
    .no_withdraw{
        .txt{
            padding-top: 200px;
            font-family: PingFangSC-Regular;
            font-size: 48px;
            color: #262423;
            letter-spacing: 0;
        }
        .txt_ft{
            padding-top: 260px;
            opacity: 0.6;
            font-family: PingFangSC-Regular;
            font-size: 20px;
            color: #393533;
            letter-spacing: 0;
        }
    }
    .can_withdraw{
        .txt_1{
            padding: 24px 0 4px;
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            font-size: 36px;
            color: #F9822B;
            letter-spacing: 0;
        }
        .txt_2{
            font-family: PingFangSC-Regular;
            font-size: 24px;
            color: #393533;
            letter-spacing: 0;
        }
        .cash_box{
            width: 560px;
            height: 324px;
            background: url('../assets/imgs/bg_txt.png') no-repeat;
            background-size: cover;
            margin: 32px auto 0;
            .txt_tag{
                padding-top: 32px;
                font-family: PingFangSC-Regular;
                font-size: 24px;
                color: #FFFFFF;
                letter-spacing: 0;
            }
            .amount{
                display: inline-block;
                font-family: PingFangSC-Semibold;
                font-weight: bold;
                font-size: 72px;
                color: #FFFFFF;
                letter-spacing: 0;
                position: relative;
                &::before{
                    content: '¥';
                    position: absolute;
                    top: 15px;
                    left: -24px;
                    font-family: PingFangSC-Semibold;
                    font-weight: bold;
                    font-size: 32px;
                    color: #FFFFFF;
                    letter-spacing: 0;
                }
            }
            .btn_cash{
                margin: 60px auto 0;
                width: 360px;
                height: 68px;
                line-height: 68px;
                background: #FFF560;
                border-radius: 36px;
                font-family: PingFangSC-Semibold;
                font-weight: bold;
                font-size: 28px;
                color: #FA5A5D;
            }
            .txt_sts{
                padding-top: 75px;
                font-family: PingFangSC-Semibold;
                font-weight: bold;
                font-size: 28px;
                color: #FFF;
                letter-spacing: 0;
                .icon{
                    display: inline-block;
                    margin-right: 9px;
                    width: 31px;
                    height: 23px;
                    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAXCAMAAADEI2RmAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAzUExURUxpcf////////////////////////////////////////////////////////////////Hv/K4AAAAQdFJOUwBJ+szmbCgv7GKesB2LDG1NKk8cAAAAeElEQVQoz52SWQ6AIAwFWWSRRXv/0yoYRAOvMfazM+mWCvE3pFbaYbzSGcvGYiLJY8QbBvUb9u4DltrHhLFTpY+FxfM1iEW9M72EYbRa/xYmkxvqwnSxLoC9m+DRWZoAr2Z4/BTAzQ2PhdgrVvijQsGSe8gY0pA8AH8CDevRkJ2+AAAAAElFTkSuQmCC");
                    background-size: cover;
                }
            }
        }
        .txt_desc{
            margin: -25px auto 0;
            width: 504px;
            height: 107px;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfgAAABrBAMAAABpg40VAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAkUExURUxpcfhzc+A2NvtMTOU5Od89Pf/9/fa7u/vk5P75+f3w8P////fm6/QAAAALdFJOUwACCwUUH+YyasGR01bnlgAAAylJREFUeNrt3c9u00AQBvD4DWzlDTZG7TXeN7A2tMANxVDBFaiQb6gguFapEOSKAClXkJB6BSuOX46ZXdtx/sGJDfI38wLJL9/uZiJ5J4OB1FEqDAdBgEkPBhHXIITUR5HWmvSIaz4aaq4xoj6g3JVSlH0Y4gVP9g8vvrIeL/ihVu+qqvqi9Bgtego+OckJX7wawUXPwb+puC7hom+DR4w+aoN30f8X+iDyU2Svg+foWe+pwj/SXefxzytpg+foR35e1H7G4aF205Oc7W3wNnpfeus/2Gonyk/F6+Ap+tTTq9oPeZ+eY/dFV+Ys7+CLK6M88nePV7ar+OPn7pvqXRUvf6RqV29/Zpwvqt5XObO/pTaDJ/v9CqK+bf+W4m7zNMfAF9fcUG8En5wsKpAqNxvqoNNtAtTlRvQU/GkFVNed6Dn4ORJ+2Ymed3wFVZ1dH0Ht+HrXR82qT+IFFr5MR/W6D8COu/rIC5tVfxcN/6xZ93TW36LhV3Te11v+To6GLx66TU94uC3Pm97htbqHh/+k7IlH590DPPxPd+JFOp7j4ZepxVOLc4uHX1Gb4/ALPHxp8dzc5nj4wja4hDeIeOPwylSAZRTjNSpeC17wghe84AUveMELXvCCF7zgBS94wQte8IIXvOAFL3jBC17wghe84AUveF/4HM9eCJ7xCzx86fBDZW7x8Cv3QNIwMXM8/LJ+FC2Jn+Lhf7lbNoRHfOS8ffb2HA8/c/hIxxO477pimtbP2wMe93TYWzx/0T9Cwz837ppJgLjpZ2l7uyqegPV45bS5TzqkdY92kdjUlwrtiXeGhb8yzXXSQNO6h+pwl7Tq64vEtOmVuUDC3xjVXCG3636CNDBk2q56OzYiNo9hDvzytUnXYyN4YIiZXID0uMUNB7+eFWOjnzyB0Bffp93gXfSxyd4CrPzyfWbSzflQFL0yJsv6PxIuywwd9RuTwTh6q+9/kX1rMJgdCUd6M+23fGKsfWvQbtDoe19qdxigGwPZe35qh8rvH4LpbQDo8Wq0/+8EvI5+PR5dHxp8623o7/FqfOhPNDyOez6a/C/TrntdmP8bs7d+A9qAGXRAaob2AAAAAElFTkSuQmCC");
            background-size: cover;
            p{
                padding-top: 24px;
                font-family: PingFangSC-Regular;
                font-size: 24px;
                color: #EE484B;
                letter-spacing: 0;
                text-align: center;
            }
        }
    }
    .btn_list{
        background: #FFF560;
        border-radius: 24.5px;
        padding: 4px 16px;
        position: absolute;
        right: 155px;
        top: 350px;
        font-family: PingFangSC-Regular;
        font-size: 20px;
        color: #FA5A5D;
        letter-spacing: 0;
        &.new_sts{
            &::after{
                display: block;
                position: absolute;
                right: -4px;
                top: -4px;
                content: '';
                width: 16px;
                height: 16px;
                border-radius: 8px;
                background: #EE484B;
            }
        }
    }
    .submit_box_wrap{
        width: 100%;
        height: 100vh;
        background: rgba(0,0,0,.7);
        position: fixed;
        top: 0;
        left: 0;
        .submit_box{
            width: 654px;
            height: 378px;
            background: #FFF;
            box-shadow: 0 6px 18px 0 rgba(111,18,20,0.40);
            border-radius: 24px;
            position: absolute;
            left: 48px;
            top: 415px;
            .close{
                position: absolute;
                top: 24px;
                right: 24px;
                width: 26px;
                height: 26px;
                background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaBAMAAABbZFH9AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAVUExURUxpcVwsEl0oD10oD2xHJGQuGl8pEHESCjgAAAAHdFJOUwAnZVIGE0BspZxyAAAAd0lEQVQY00XPwQ2AIAyF4ZLoncAE1LgA0buGCdx/GSnw+jhBvoT+lRwFp91SCx5bvyYFNr0kaAEdjzgaCXAScNJC0ETQQJJhdjJUkiGpf6iFr6bVa23WS7RZvsqY5avMjIUrYyEKB3rhQMYbMj7oKZWFqcjH+D3+SR4UIYRvUK0AAAAASUVORK5CYII=");
                background-size: cover;
            }
            .txt_title{
                padding-top: 40px;
                font-family: PingFangSC-Semibold;
                font-weight: bold;
                font-size: 36px;
                color: #FA5A5D;
                letter-spacing: 0;
                text-align: center;
            }
            .txt_info{
                width: 530px;
                margin: 19px auto 0;
                opacity: 0.9;
                font-family: PingFangSC-Regular;
                font-size: 28px;
                color: #262423;
                letter-spacing: 0;
                text-align: center;
            }
            .btn_submit{
                margin: 53px auto 0;
                width: 366px;
                height: 88px;
                line-height: 88px;
                background-image: linear-gradient(135deg, #FEBA40 0%, #FF7360 100%);
                border-radius: 44px;
                font-family: PingFangSC-Semibold;
                font-weight: bold;
                font-size: 32px;
                color: #FFFFFF;
                letter-spacing: 0;
                text-align: center;
            }
        }
    }
</style>

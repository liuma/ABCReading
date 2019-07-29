<template>
  <div class="index" ref="viewBox">  
    <div class="index_hd_box">
        <img src="../assets/images/index_hd.png" class="index_hd_img">
        <p class="index_hd_txt">购年卡，免费领价值<span>450</span>元大礼包</p>
        <div class="index_hd_card_box">
            <img src="../assets/images/index_card_img.png" class="index_card_img" @click="toPay()">
            <p class="index_card_txt_num">已有 {{suc_num}} 人购买</p>
            <p class="index_card_txt_time">剩余 {{timeObj.day}} 天 {{timeObj.hour}} : {{timeObj.minute}} : {{timeObj.sister}}</p>
            <img v-if="!hasExpire" src="../assets/images/index_card_btn.png" class="index_card_btn" @click="toPay()">
            <img v-else src="../assets/images/index_card_btn_dis.png" class="index_card_btn" @click="toPay()">
        </div>
    </div>
    <div class="index_content">
        <div class="desc_box">
            <div class="desc_title">
                <p>{{descTitle}}</p>
            </div>
            <div class="desc_content">
                <ul>
                    <li v-for="item in descArr">
                        <p class="desc_name">{{item.name}}</p>
                        <div class="img_wrap">
                            <img :src="item.pic">
                        </div>
                        <p class="desc_info"><span>¥</span>{{item.info}}</p>
                    </li>
                </ul>
                <div class="tags_box">
                    <div class="tag_left"></div>
                    <div class="tag_mid"></div>
                    <div class="tag_right"></div>
                </div>
            </div>
        </div>
        <ul class="details_box">
            <li v-for="(item,$index) in detailsArr">
                <div class="title">
                    <p>{{item.name}}</p>
                </div>
                <div class="detail_content">
                    <img v-if="item.pic" class="detail_img" :src="item.pic">
                    <ul class="text_ul">
                        <li v-for="info in detailsArr[$index].textArr">
                            <p v-html="info"></p>
                        </li>
                    </ul>
                    <ul class="info_ul">
                        <li v-for="info in detailsArr[$index].infoArr">
                            <p v-html="info"></p>
                        </li>
                    </ul>
                    <img v-if="$index == 2" class="vip_ft_img" src="../assets/images/index_vip_ft.png">

                </div>
            </li>
        </ul>
        <p class="ft_text">本活动最终解释权归ABC Reading所有</p>
    </div>
    
    <div v-show="hasScroll" :class="hasExpire?'join_btn dis':'join_btn'" @click="toPay()">{{hasExpire?'活动已结束':'立即续费'}}</div>
    <eject :message="ejectText" :showState="ejectStatus"></eject>
    <cf :message="cfText" :showState="cfStatus"></cf>
  </div>
</template>
<script>
import Eject from './Eject'
import Cf from './Confirm'
export default {
  name: 'Index',
  components: {
    eject: Eject,
    cf: Cf
  },
  data(){
    return{
        hasExpire: 0,
        hasScroll: false,
        hasLogin: false,
        hasUsed: false,
        canJoin: true,
        ejectText: '',
        ejectStatus: false,
        cfText: '',
        cfStatus: false,
        suc_num: 1350,
        timeObj: {
            day: 0,
            hour: '00',
            minute: '00',
            sister: '00'
        },
        descTitle: '老用户续费立享450元大礼包',
        descArr: [
            {
                name: '价格直减',
                pic: 'http://file.abctime.com/activity/renewal/coupon_icon.png',
                info: '220'
            },
            {
                name: '学习礼包',
                pic: 'http://file.abctime.com/activity/renewal/gift_icon.png',
                info: '128'
            },
            {
                name: 'RAZ字母课',
                pic: 'http://file.abctime.com/activity/renewal/lesson_icon.png',              
                info: '98'
            },
        ],
        detailsArr: [
            {
                name: '学习礼包详情',
                pic: 'http://file.abctime.com/activity/renewal/gift_img.png',
                textArr: [
                    '10张AR主题单词卡',
                    '5本RAZ分级阅读绘本',
                    '宝宝英语阅读成长手册',
                    '儿童无毒12色彩色铅笔',
                    '超萌胡萝卜橡皮',
                ],
                infoArr: [],
            },
            {
                name: 'RAZ字母课',
                pic: 'http://file.abctime.com/activity/renewal/lesson_img_letter.png',
                textArr: [],
                infoArr: [
                    '<span>26节</span>舞动韵律的字母课，精选预备级<span>RAZ阅读绘本</span>',
                    '0基础的小宝宝也能快速掌握英文字母的 ',
                    '<span>听</span>·<span>说</span>·<span>读</span>·<span>写</span>',
                ],
            },
            {
                name: '续费后立享VIP年卡权益',
                pic: '',
                textArr: [
                    '<span>27</span>个level <span>2000+</span>RAZ原版绘本',
                    '<span>96</span>节绘本精讲视频课程',
                    '社群专属学习奖励',
                    '同步更新美国官网RAZ绘本'
                ],
                infoArr: []
            },
        ],
        endTime: 1564129000
    }
  },
  created(){
  },
  mounted(){
    this.getUserInfo();
    // 监听这个dom的scroll事件
    this.$refs.viewBox.addEventListener('scroll', () => {
        if(this.$refs.viewBox.scrollTop>0){
            this.hasScroll = true;
        }else{
            this.hasScroll = false;
        }
    }, false)
    // this.showCf('Hi，请在年卡到期前30天享受您的专属活动吧 <br/>敬请期待～');
  },
  methods:{

    handleScroll () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    },
    showEject: function (text) {
        this.ejectText = text
        this.ejectStatus = true
    },
    initEject: function () {
        this.ejectStatus = false
    },
    showCf: function (text) {
        this.cfText = text
        this.cfStatus = true
    },
    initCf: function () {
        this.cfStatus = false
    },
    toPay(){
        if(this.hasExpire){
            this.showEject('来晚了，活动已结束～')
        }else {
            if(this.canJoin){
                if(this.hasLogin){
                    if(this.hasUsed){
                        this.$router.push({name:'Address'})
                    }else{
                        this.$router.push({name:'Order'})
                    }
                }else{
                    this.$router.push({name:'Login',params:{pre:'index'}})
                }
            }else {
                if(this.hasLogin){
                    this.showCf('Hi，请在年卡到期前30天享受您的专属活动吧 <br/>敬请期待～');
                }else{
                    this.$router.push({name:'Login',params:{pre:'index'}})
                }
            }
            // this.$router.push({name:'Submit'})
        }
    },
    getUserInfo(){
        let openid = window.localStorage.getItem('extendAbcOpenid')
        let memberId = window.localStorage.getItem('extendAbcMemberid')
        let indexUrl = this.$common.config.gzhUrl + 'v3/member/gift-bag/detail'
        let fd = this.$common.getParam('get',{openid:openid,member_id:memberId});
        this.$axios.get(indexUrl+'?'+fd).then((res) => {
            if(res.data.code == 200){
                this.hasExpire = res.data.data.is_expire;
                this.suc_num = res.data.data.total_member;
                this.count_down = res.data.data.count_down
                this.showTime();

                localStorage.setItem('renew_phone',res.data.data.phone);
                localStorage.setItem('renew_app_id',res.data.data.app_member_id);
                if(res.data.data.can_use_gift_bag == 1){
                    this.canJoin = true;
                    this.hasUsed = res.data.data.is_have_used;
                    if(res.data.data.phone){
                        this.hasLogin = true;
                    }else{
                        this.hasLogin = false;
                    }
                }else{
                    this.canJoin = false;
                    if(res.data.data.phone){
                        this.hasLogin = true;
                    }else{
                        this.hasLogin = false;
                    }
                }
            }
        })
    },
    //倒计时
    showTime() {
        // let time_start = new Date().getTime(); //设定开始时间
        //计算时间差
        // let time_distance = this.endTime*1000 - time_start;
        this.count_down = this.count_down - 1;
        let time_distance = this.count_down * 1000;
        if (time_distance > 0) {
            // 天时分秒换算
            let int_day = Math.floor(time_distance / 86400000)
            time_distance -= int_day * 86400000;

            let int_hour = Math.floor(time_distance / 3600000)
            time_distance -= int_hour * 3600000;

            let int_minute = Math.floor(time_distance / 60000)
            time_distance -= int_minute * 60000;

            let int_second = Math.floor(time_distance / 1000)
            // 时分秒为单数时、前面加零
            // if (int_day < 10) {
            //     int_day = "0" + int_day;
            // }
            if (int_hour < 10) {
                int_hour = "0" + int_hour;
            }
            if (int_minute < 10) {
                int_minute = "0" + int_minute;
            }
            if (int_second < 10) {
                int_second = "0" + int_second;
            }
            this.timeObj.day = int_day;
            this.timeObj.hour = int_hour;
            this.timeObj.minute = int_minute;
            this.timeObj.sister = int_second
            setTimeout(this.showTime,1000);
        }
    },
    shareConfig(){
        let member_id = localStorage.getItem('extendAbcMemberid')
        let lUrl = encodeURIComponent(window.location.href)
        let wUrl = this.$common.config.gzhUrl + "v3/wechat/wechat/get-wechat"
        let fd = this.$common.getParam('get', {url: lUrl, member_id: member_id});
        let link = window.location.origin + '/extend/letter/index.html?view_member_id='+member_id
        let configObj = {
            title:'RAZ年卡续费大礼包限时抢',
            desc: '续费直减220元，学习礼包和RAZ字母课等你来抢哦',
            imgUrl: 'https://qnfile.abctime.com/share_logo_new.png',
        };
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
    }
  },
}
</script>
<style scoped lang="less">
  .index{
    position: relative;
    background: #200D58;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    .index_hd_box{
        position: relative;
        .index_hd_img{
            width: 100%;
            height: auto;
        }
        .index_hd_txt{
            position: absolute;
            left: 0;
            top: 2.15rem;
            width: 100%;
            font-family: FZY4JW--GB1-0;
            font-size: .28rem;
            color: #FFF;
            letter-spacing: .0068rem;
            line-height: .33rem;
            span{
                font-size: .36rem;
            }
        }
        .index_hd_card_box{
            position: relative;
            .index_card_img{
                width: 7.38rem;
                height: 3.2rem;
                margin: -2.82rem 0 0 .12rem;
            }
            .index_card_btn{
                position: absolute;
                width: 1.38rem;
                height: 1.39rem;
                top: 1.05rem;
                right: .3rem;
            }
            .index_card_txt_num{
                font-family: FZY4JW--GB1-0;
                font-size: .2rem;
                color: #FFF;
                position: absolute;
                text-align: left;
                left: 2.7rem;
                top: 1.12rem;
            }
            .index_card_txt_time{
                font-family: FZY4JW--GB1-0;
                font-size: .28rem;
                color: #FEDA40;
                position: absolute;
                text-align: left;
                left: 2.7rem;
                top: 1.7rem;
                background: #9738CE;
                border-radius: .22rem;
                padding: .05rem .18rem;
            }
            &::before{
                content: '';
                background: url('../assets/images/index_card_tag_r.png') no-repeat;
                background-size: cover;
                width: 1.13rem;
                height: 1.08rem;
                position: absolute;
                right: 0;
                top: -.35rem;
            }
            &::after{
                content: '';
                background: url('../assets/images/index_card_tag_l.png') no-repeat;
                background-size: cover;
                width: 1.32rem;
                height: 1.4rem;
                position: absolute;
                left: .05rem;
                bottom: -.8rem;
            }
        }
    }
    .index_content{
        position: relative;
        margin-top: .3rem;
        .desc_box{
            .desc_title{
                width: 7.13rem;
                height: 1.45rem;
                background: url('../assets/images/index_title_bg.png');
                background-size: cover;
                margin-left: .37rem;
                p{
                    font-family: FZY4JW--GB1-0;
                    font-size: .34rem;
                    color: #5A3ED2;
                    letter-spacing: .02rem;
                    padding-top: .26rem;
                }
            }
            .desc_content{
                width: 6.94rem;
                margin: auto;
                background-image: linear-gradient(180deg, #594FE9 0%, #4F3DE2 100%);
                border-radius: .16rem;
                padding-top: .13rem;
                ul{
                    width: 6.7rem;
                    height: 2.8rem;
                    margin: auto;
                    background: #301DA0;
                    border-radius: .16rem;
                    li{
                        width: 1.9rem;
                        height: 2.37rem;
                        background: #3937BC;
                        border-radius: .16rem;
                        display: inline-block;
                        vertical-align: top;
                        margin: .21rem .12rem 0;
                        position: relative;
                    
                        .desc_name{
                            font-family: FZY4JW--GB1-0;
                            font-size: .24rem;
                            color: #B6B0FF;
                            letter-spacing: .012rem;
                            padding: .1rem;
                        }
                        .img_wrap{
                            width: 1.9rem;
                            height: 1.4rem;
                            line-height: 1.4rem;
                            display: table-cell;
                            vertical-align: middle;
                            margin: auto;
                            img{
                                width: 1.6rem;
                                height: auto;

                            }
                        }
                        
                        .desc_info{
                            width: 100%;
                            position: absolute;
                            left: 0;
                            bottom: .1rem;
                            font-family: FZY4JW--GB1-0;
                            font-size: .32rem;
                            color: #FFF;
                            letter-spacing: .016rem;
                            span{
                                font-size: .22rem;
                            }
                        }
                    }
                }
                .tags_box{
                    text-align: left;
                    padding: .25rem 0;
                    .tag_left{
                        display: inline-block;
                        vertical-align: top;
                        width: .3rem;
                        height: .3rem;
                        margin: 0 .31rem 0 .53rem;
                        background-image: linear-gradient(151deg, #FFD337 3%, #F0A81A 47%, #E38600 100%);
                        box-shadow: 0 .02rem .04rem 0 rgba(0,0,0,.4);
                        border-radius: 50%;
                    }
                    .tag_mid{
                        display: inline-block;
                        vertical-align: top;
                        width: .3rem;
                        height: .3rem;
                        margin: 0 .56rem 0 0;
                        background-image: linear-gradient(171deg, #56EFA4 0%, #14A456 100%);
                        box-shadow: 0 .02rem .04rem 0 rgba(0,0,0,.4);
                        border-radius: .08rem;
                    }
                    .tag_right{
                        display: inline-block;
                        vertical-align: top;
                        width: 4.53rem;
                        height: .33rem;
                        background: url('../assets/images/index_desc_tag_right.png');
                        background-size: cover;
                    }
                }
            }
        }
        .details_box{
            li{
                .title{
                    width: 6.78rem;
                    height: 1.8rem;
                    margin: auto;
                    background: url('../assets/images/index_title_connect_bg.png');
                    background-size: cover;
                    p{
                        font-family: FZY4JW--GB1-0;
                        font-size: .34rem;
                        color: #5A3ED2;
                        letter-spacing: .02rem;
                        padding-top: .6rem;
                        display: inline-block;
                        position: relative;
                        &::before{
                            content: '';
                            width: .2rem;
                            height: .21rem;
                            background: url('../assets/images/index_title_star.png');
                            background-size: cover;
                            position: absolute;
                            left: -.32rem;
                            top: .68rem;
                        }
                        &::after{
                            content: '';
                            width: .2rem;
                            height: .21rem;
                            background: url('../assets/images/index_title_star.png');
                            background-size: cover;
                            position: absolute;
                            right: -.32rem;
                            top: .68rem;
                        }
                    }
                }
                .detail_content{
                    width: 6.94rem;
                    margin: auto;
                    background-image: linear-gradient(180deg, #594FE9 0%, #4F3DE2 100%);
                    border-radius: .16rem;
                    padding: .26rem 0 .22rem;
                    .detail_img{
                        width: 6.45rem;
                        margin: 0 auto .28rem;
                    }
                    .text_ul{
                        li{
                            width: 4.44rem;
                            height: .62rem;
                            padding-left: .5rem;
                            background: #2D30AE;
                            border-radius: .2rem;
                            line-height: .62rem;
                            margin: .13rem auto 0;
                            position: relative;
                            &:nth-child(1){
                                margin-top: 0;
                            }
                            &::before{
                                content: '';
                                width: .1rem;
                                height: .1rem;
                                border-radius: 50%;
                                background: #D2E0FF;
                                position: absolute;
                                left: .21rem;
                                top: .26rem;
                            }
                            p{
                                font-family: FZY4JW--GB1-0;
                                font-size: .26rem;
                                color: #D2E0FF;
                                letter-spacing: .01rem;
                                text-align: left;
                                /deep/ span{
                                    color: #FDD53C;
                                }
                            }

                        }
                    }
                    .info_ul{
                        li{
                            p{
                                text-align: center;
                                font-family: FZY4JW--GB1-0;
                                font-size: .26rem;
                                color: #D2E0FF;
                                letter-spacing: .01rem;
                                line-height: 1.5;
                                /deep/ span{
                                    font-size: .3rem;
                                    color: #FDD53C;
                                }
                            }

                        }
                    }
                    .vip_ft_img{
                        width: 3.82rem;
                        margin: .2rem auto .1rem;
                    }
                }
                &:nth-child(1){
                    .detail_content{
                        position: relative;
                        &::after{
                            content: '';
                            width: .57rem;
                            height: .47rem;
                            background: url('../assets/images/index_desc_tag.png');
                            background-size: cover;
                            position: absolute;
                            right: .21rem;
                            bottom: .24rem;
                        }
                        .text_ul{
                            position: relative;
                            &::after{
                                content: '';
                                width: .52rem;
                                height: .52rem;
                                background: url('../assets/images/index_gift_tag.png');
                                background-size: cover;
                                position: absolute;
                                right: .2rem;
                                top: -.04rem;
                            }
                            &::before{
                                content: '';
                                width: .52rem;
                                height: .52rem;
                                background: url('../assets/images/index_gift_tag.png');
                                background-size: cover;
                                position: absolute;
                                left: .2rem;
                                top: -.04rem;
                            }
                        }
                    }
                }
            }
        }
        .ft_text{
            font-family: FZY4JW--GB1-0;
            font-size: .22rem;
            color: #655CB1;
            letter-spacing: .009rem; 
            padding: .17rem 0 1.42rem;
        }
    }
    .join_btn{
      width: 4.64rem;
      height: 1.14rem;
      position: fixed;
      bottom: .25rem;
      left: calc(~'50% - 2.23rem');
      z-index: 11;
      line-height: 1rem;
      background: url('../assets/images/index_btn_active.png');
      background-size: cover;
      font-family: FZY4JW--GB1-0;
      font-size: .4rem;
      font-weight: bold;
      color: #B12C13;
      letter-spacing: .036rem;
      text-align: center;
      &.dis{
        background: url('../assets/images/index_btn_disable.png');
        background-size: cover;
        color: #6D6D6D;
      }
    }
  }
</style>

<template>
  <div content="index">
    <div class="container">
      <div class="head">
        <div class="upper"></div>
        <img class="intro" src="../assets/imgs/index_intro.png">
        <p class="suc_num">已有 <span>{{suc_num}}</span> 名小朋友在学习</p>
      </div>
      <!--<p class="suc_num">已有{{suc_num}}人在学习！</p>-->
      <nav id="nav_wrap">
        <div :class="nav_index==1?'nav_li active':'nav_li'" @click="nav_index=1">课程介绍</div>
        <div :class="nav_index==2?'nav_li active':'nav_li'" @click="nav_index=2">上课须知</div>
      </nav>
      <div class="content">
        <div class="con_left" v-if="nav_index==1">
          <img class="con1" src="../assets/imgs/index_con1.png">
          <div class="title title2"></div>
          <ul class="con2">
            <li>
              <div class="icon_wrap wrap1"><span class="icon"></span></div>
              字母学习是儿童英语启蒙的必备过程</li>
            <li>
              <div class="icon_wrap wrap2"><span class="icon"></span></div>
              牢固掌握字母的音和形，轻松地步入系统化英语学习</li>
            <li>
              <div class="icon_wrap wrap3"><span class="icon"></span></div>
              培养音素意识，孩子能够熟练识别字母发音</li>
            <li>
              <div class="icon_wrap wrap4"><span class="icon"></span></div>
              字母学习的水平影响孩子未来阅读能力的高低</li>
          </ul>
          <div class="title title3"></div>
          <ul class="con3">
            <li>
              <p class="txt1">情景式学习<span> - 中外教视频教学</span></p>
              <div class="sort sort">01</div>
              <img src="../assets/imgs/index_con3_1.png">
            </li>
            <li>
              <p class="txt2">激发宝宝兴趣<span> - AI动画互动</span></p>
              <div class="sort sort2">02</div>
              <img src="../assets/imgs/index_con3_2.png">
            </li>
            <li>
              <p class="txt3">即学即用, 巩固效果<span> - 趣味唱读小麦霸</span></p>
              <div class="sort sort3">03</div>
              <img src="../assets/imgs/index_con3_3.png">
            </li>
            <li>
              <p class="txt4">培养宝宝阅读习惯<span> - 配套RAZ绘本阅读</span></p>
              <div class="sort sort4">04</div>
              <img src="../assets/imgs/index_con3_4.png">
            </li>
            <li>
              <p class="txt5">建立系统化学习法<span> - 闭环学习体系</span></p>
              <div class="sort sort5">05</div>
              <img src="../assets/imgs/index_con3_5.png">
            </li>
          </ul>
          <img class="con4" src="../assets/imgs/index_con4.png">
        </div>
        <div class="con_right" v-else>
          <ul class="qa_box">
            <li><img src="../assets/imgs/index_qa1.png"></li>
            <li><img src="../assets/imgs/index_qa2.png"></li>
            <li><img src="../assets/imgs/index_qa3.png"></li>
            <li><img src="../assets/imgs/index_qa4.png"></li>
          </ul>
          <img src="../assets/imgs/index_mm.png" class="index_mm">
        </div>
        <div class="tag">本课程由ABC Reading&励步英语联合出品</div>
      </div>
      <footer v-show="!direct_buy && !is_full">
        <div class="original" @click="buy()">￥98.00<br><span>原价购买</span></div>
        <div class="discount" @click="join()">
          <span class="price">立即参团 ¥9.90</span>
        </div>
      </footer>
      <div class="ft2" v-show="direct_buy || (is_full&&groupIng)" @click="toStudy()">已购买 立即开始学习</div>
      <div class="ft2" v-show="!is_full&&groupIng" @click="toPay()">拼团中...</div>
    </div>
    <eject :message="ejectText" :showState="ejectStatus"></eject>
    <hv></hv>
  </div>
</template>
<script>
import Eject from './Eject'
import Hv from './Hv'
export default {
  name: 'Index',
  components: {
    eject: Eject,
    hv: Hv,
  },
  data(){
    return{
      suc_num:0,
      nav_index:1,
      canTap:false,
      goodsObj:{},
      ejectText:'',
      ejectStatus: false,
      direct_buy:false,
      is_full:false,
      groupIng:false
    }
  },
  created(){
  },
  mounted(){
    this.getCollageInfo();
    this.getMemberInfo();
    this.getOriginalInfo();
    this.shareConfig();
    this.$nextTick(function () {
      let wrap = document.getElementById("nav_wrap");
      this.$common.fixTop(wrap)
    })
  },
  methods:{
    toStudy(){
      this.$router.replace({name:'Cata'})
    },
    toPay(){
      this.$router.replace({name:'Pay'})
    },
    join(){
      if(this.canTap){
        let ph = window.localStorage.getItem('extendAbcPhone');
        if(!ph){
          this.$router.push({name:'Login',query:{buy:2}})
        }else {
          this.$router.push({name:'Pay',query:{type:1}})
        }
      }
    },
    buy() {
      if(this.canTap){
        let ph = window.localStorage.getItem('extendAbcPhone');
        if(!ph){
          this.$router.push({name:'Login',query:{buy:1}})
        }else {
          if(this.goodsObj.price>0){
            this.originalPay()
          }
        }
      }
    },
    getOriginalInfo(){
      let member_id = localStorage.getItem('extendAbcMemberid');
      let url = this.$common.config.gzhUrl + 'v3/group/month-card/buy';
      let param = {type:1,act_id:4,member_id:member_id};
      let fd = this.$common.getParam('get',param);
      let _this = this;
      this.$axios.get(url+'?'+fd).then((res) => {
        if(res.data.code == 200){
        _this.goodsObj = res.data.data;
        }else {
          _this.showEject(res.data.msg)
        }
      })
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
            _this.showEject('购买成功');
            location.reload()
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
    getMemberInfo(){
      let openid = window.localStorage.getItem('extendAbcOpenid')
      let userUrl = this.$common.config.gzhUrl + 'v3/member/passport/get-info';
      let fd = this.$common.getParam('get',{openid:openid});
      let _this = this;
      this.$axios.get(userUrl+'?'+fd).then((res) => {
        if(res.data.code == 200){
          window.localStorage.setItem('extendAbcPhone',res.data.data.phone)
          window.localStorage.setItem('extendAbcNickname',res.data.data.nickname)
          window.localStorage.setItem('extendAbcHeadimg',res.data.data.headimg_url)
          _this.canTap = true
        }
      })
    },
    showTime() {
      let time_start = new Date().getTime(); //设定开始时间
      //计算时间差
      let time_distance = this.endTime*1000 - time_start;
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
        if (int_day < 10) {
          int_day = "0" + int_day;
        }
        if (int_hour < 10) {
          int_hour = "0" + int_hour;
        }
        if (int_minute < 10) {
          int_minute = "0" + int_minute;
        }
        if (int_second < 10) {
          int_second = "0" + int_second;
        }
        this.hour = int_hour;
        this.minute = int_minute;
        this.sister = int_second
        setTimeout(this.showTime,1000);
      }
    },
    getCollageInfo (){
      let member_id = window.localStorage.getItem('extendAbcMemberid')
      let view_member_id = this.$common.VL.getRequest().view_member_id || 0;
      let act_id = 4;
      this.view_member_id = this.$common.VL.getRequest().view_member_id || 0;
      let url = this.$common.config.gzhUrl + 'v3/group/month-card/group'
      let fd = this.$common.getParam('get',{member_id:member_id,view_member_id:view_member_id,act_id:act_id})
      let _this = this;
      this.$axios.get(url+'?'+fd).then((res) => {
        if(res.data.code == 200){
          let da = res.data.data
          let my_group = da.my_group
          let conf = da.conf
          _this.direct_buy = da.has_direct_buy
          _this.suc_num = conf.member_join_num
          if(my_group.has_group){
            _this.groupIng = true
            if(my_group.is_full){
              _this.is_full = true
            }
          }
        }
      })
    },
    showEject: function (text) {
      this.ejectText = text
      this.ejectStatus = true
    },
    initEject: function () {
      this.ejectStatus = false
    },
    shareConfig(){
      let member_id = localStorage.getItem('extendAbcMemberid')
      let lUrl = encodeURIComponent(window.location.href)
      let wUrl = this.$common.config.gzhUrl + "v3/wechat/wechat/get-wechat"
      let fd = this.$common.getParam('get', {url: lUrl, member_id: member_id});
      let link = window.location.origin + '/extend/letter/index.html?view_member_id='+member_id
      let configObj = {
        title:'零基础宝宝也能学会的字母课，26节课让孩子轻松爱上英语！',
        desc: 'AI动画互动课，孩子轻松掌握26个字母，养成良好阅读习惯，英文水平超车同龄宝宝~',
        imgUrl: 'https://qnfile.abctime.com/extend/letter/letter_share.png',
      };
      this.$axios.post(wUrl+'?'+fd).then((res) => {
        if(res.data.code == 200){
          let data = res.data.data;
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
    },
    toDown(){
      window.location.href = 'http://www.abctime.com/download.html'
      TDAPP.onEvent('按钮点击_立即使用');
    }
  },
}
</script>
<style scoped lang="less">
  *{
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }
  img{
    display: block;
    margin: auto;
  }
  .container{
    min-height: 100vh;
    background: #FFF6EB;
    .head{
      height: 9rem;
      background: #FFAF4C;
      .upper{
        width: 100%;
        height: 5.4rem;
        background: url('../assets/imgs/index_head.png') no-repeat;
        background-size: cover;
      }
      .intro{
        width: 6.74rem;
        height: 2.39rem;
        margin-top: -.15rem;
      }
      /*ABC字母精灵*/
      .suc_num{
        font-family: PingFangSC-Semibold;
        font-weight: bold;
        font-size: .28rem;
        color: #fff;
        span{
          font-size: .32rem;
        }
      }
    }
    &.blur{
      -webkit-filter: blur(2px);
      filter: blur(2px);
    }
    nav{
      width: 100%;
      height: .9rem;
      background: #FF8E0E;
      line-height: .9rem;
      border-radius: .24rem .24rem 0 0;
      overflow: hidden;
      display: flex;
      margin-top: -.7rem;
      .nav_li{
        flex: 1;
        font-family: FZY4JW--GB1-0;
        font-size: .36rem;
        color: rgba(255,255,255,.6);
        letter-spacing: 0;
        text-align: center;
        &.active{
          color: #FFFFFF;
          position: relative;
          &::before{
            content: '';
            width: 2.04rem;
            height: .04rem;
            background: #fff;
            border-radius: .03rem;
            position: absolute;
            bottom: .04rem;
            left: 50%;
            margin-left: -1.02rem;
          }
        }
      }
      &[data-fixed="fixed"]{
        position: fixed;
        top:0;
        left: 0;
        margin: 0;
        z-index: 100;
        border-radius: 0;
      }
    }
    .content{
      padding-bottom: 1.6rem;
      .con_left{
        padding: .15rem 0 .6rem 0;
        .con1{
          width: 6.5rem;
          height: auto;
        }
        .con4{
          width: 6.56rem;
          height: auto;
          margin-top: .66rem;
        }
        .title{
          margin: auto;
          &.title2{
            width: 100%;
            height: 1.08rem;
            background: url('../assets/imgs/index_title2.png') no-repeat;
            background-size: cover;
            margin-top: .4rem;
          }
          &.title3{
            width: 6.44rem;
            height: 1.22rem;
            background: url('../assets/imgs/index_title3.png') no-repeat;
            background-size: cover;
          }
        }
        .con2{
          li{
            width: 4.9rem;
            padding: .13rem .45rem;
            margin: .2rem auto;
            text-align: left;
            background: #FFF;
            border-radius: .4rem;
            font-family: FZY3JW--GB1-0;
            font-size: .32rem;
            color: #914F03;
            letter-spacing: .01rem;
            position: relative;
            &:first-child{
              margin-top: .46rem;
            }
            .icon_wrap{
              display: block;
              width: .48rem;
              height: .48rem;
              border-radius: 50%;
              position: absolute;
              left: -.23rem;
              top: 50%;
              margin-top: -.24rem;
              background: #FF662F;
              .icon{
                display: block;
                width: .24rem;
                height: .17rem;
                margin: .15rem auto;
                background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAARCAYAAADHeGwwAAAAAXNSR0IArs4c6QAAARxJREFUOBGtk9tKw0AQhvtKvkEFwVJRapVi6V09YrUovmRve+FtSy96Ux/AHrTxG8mG3ckkJrgLP9mZ+ecbkuw2GpFXkiR9tEIL1IyKBzhE38itWbQBEK/R3pHT5zLKAGC3BvyLXPffA4DcF8CvYsAfDPiOXC+DExygCZqio6zwxwbvI9JL4JdBK4l3z7VhfxoYjADPk9fjtgK/yNlJfjhH+pQhZzljmqA2Vn4Jt+jc7KFwIw61pKGjG8i9KJ+EpjfoxfRc0JgdM+qvhqf0bfWQkQH4/a7k34xapf+lh8jJ0LdRLoxeaxInQXPVgEbrbPsDBN6uyjN9AO6QfhMZ8olaZlPdJCA5Xf4QgR/X5ZT6AQ6Q3JM5Oiw1FxR/AH46SNnASNOXAAAAAElFTkSuQmCC');
                background-size: cover;
              }
              &.wrap2{
                background: #F8C416;
              }
              &.wrap3{
                background: #8DC63F;
              }
              &.wrap4{
                background: #4DBDC4;
              }
            }
          }
        }
        .con3{
          li{
            width: 6.08rem;
            height: 4.27rem;
            margin: .52rem auto 0;
            background: url('data:image/png;base64,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') no-repeat;
            background-size: cover;
            position: relative;
            p{
              font-family: FZY4JW--GB1-0;
              font-size: .3rem;
              color: #7793F6;
              letter-spacing: .01rem;
              text-align: left;
              padding: .18rem 0 0 .38rem;
              line-height: 1;
              span{
                font-family: FZY3JW--GB1-0;
                font-size: .26rem;
              }
              &.txt2{
                color: #FFC504;
              }
              &.txt3{
                color: #8DC63F;
              }
              &.txt4{
                color: #4DBDC4;
              }
              &.txt5{
                color: #7793F6;
              }
            }
            .sort{
              width: .6rem;
              height: .8rem;
              line-height: .8rem;
              background: #FF662F;
              border-radius: .16rem .16rem 0 0;
              position: absolute;
              right: .35rem;
              top: -.1rem;
              font-family: FZY4JW--GB1-0;
              font-size: .3rem;
              color: #FFFFFF;
              letter-spacing: 0;
              &.sort2{
                background: #FFC504;
              }
              &.sort3{
                background: #8DC63F;
              }
              &.sort4{
                background: #4DBDC4;
              }
              &.sort5{
                background: #7793F6;
              }
            }
            &:first-child{
              margin-top: .72rem;
            }
            img{
              position: absolute;
              width: 5.54rem;
              height: 3.4rem;
              left: .38rem;
              bottom: .16rem;
            }
          }
        }
      }
      .con_right{
        .qa_box{
          li{
            img{
              width: 6.56rem;
              height: 2.18rem;
              margin: .56rem auto;
            }
            &:nth-child(3),&:nth-child(4){
              img{
                height: 1.76rem;
              }
            }
          }
        }
        .index_mm{
          width: 100vw;
          height: 14.5rem;
        }
        .tag_txt{
          font-family: PingFangSC-Semibold;
          font-weight: bold;
          font-size: .24rem;
          color: #ff9a5d;
          padding: .1rem 0 .4rem;
        }
      }
    }
    .tag{
      width: 100%;
      height: .6rem;
      line-height: .6rem;
      /*background: rgba(180,97,3,.25);*/
      background: #ecd0b1;
      font-family: FZY3JW--GB1-0;
      font-size: .24rem;
      color: #B46103;
      letter-spacing: .01rem;
      position: fixed;
      bottom: 1rem;
      left: 0;
    }
    footer{
      width: 100vw;
      height: 1rem;
      line-height: 1rem;
      position: fixed;
      bottom: 0;
      left: 0;
      color: #FFFFFF;
      letter-spacing: .01rem;
      font-size: 0;
      background: #2A2A2A;
      text-align: left;
      .original{
        display: inline-block;
        width: 31%;
        height: 1rem;
        font-family: PingFangSC-Regular;
        font-size: .32rem;
        color: rgba(255,255,255,.6);
        letter-spacing: 0;
        text-align: center;
        line-height: 1;
        padding: .15rem 0;
        span{
          font-size: .24rem;
          color: rgba(255,255,255,.4);
        }
      }
      .discount{
        position: absolute;
        top: 0;
        right: 0;
        width: 69%;
        height: 1rem;
        background-image: linear-gradient(144deg, #FFC031 0%, #F24718 100%);
        border-radius: .86rem 0 0 .86rem;
        font-family: PingFangSC-Semibold;
        font-size: .5rem;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
        .price{
          /*padding-left: 1.48rem;*/
        }
        div{
          position: absolute;
          top: 0;
          right: 0;
          font-family: PingFangSC-Regular;
          font-size: .24rem;
          color: #FFFFFF;
          line-height: 1;
          padding: .24rem .33rem;
          span{
            text-decoration: line-through;
            line-height: 1.8;
          }
        }
      }
    }
    .ft2{
      width: 100vw;
      height: 1rem;
      line-height: 1rem;
      position: fixed;
      bottom: 0;
      left: 0;
      color: #FFFFFF;
      letter-spacing: .01rem;
      font-size: .32rem;
      font-family: PingFangSC-Regular;
      font-weight: bold;
      background: #2A2A2A;
      background-image: linear-gradient(144deg, #FFC031 0%, #F24718 100%);
      text-align: center;
    }
  }
</style>

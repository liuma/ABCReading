<template>
  <div class="pay">
    <div class="pay_container">
      <div class="pay_info">
        <p>支付成功</p>
      </div>
      <img class="banner" src="../assets/images/collage_banner.png">
      <div class="invite_box">
        <p class="tag_txt">仅需要<span>{{num}}</span>人，即可拼团成功</p>
        <div class="btn">邀请好友拼团</div>
        <div class="btn">生成拼团海报</div>
        <p>帮好友立省98元</p>
      </div>
      <div class="suc_box">
        <p>拼团成功！</p>
        <ul></ul>
        <div class="btn" @click="enter()">进入课程学习</div>
      </div>
    </div>
    <eject :message="ejectText" :showState="ejectStatus"></eject>
  </div>
</template>
<script scoped>
  import Eject from './Eject'
  export default {
    name: 'Pay',
    components: {
      eject: Eject,
    },
    data () {
      return {
        num:2,
        canGroup:true,
        ejectText:'',
        ejectStatus: false,
      }
    },
    created(){
      // this.getInfo()
      // this.shareConfig()
    },
    mounted(){
      // this.getInfo()
      this.shareConfig()
      this.nickname = window.localStorage.getItem('extendAbcNickname')
      this.head_img = window.localStorage.getItem('extendAbcHeadimg')
    },
    methods: {
      enter(){
        this.$router.replace('Cata')
      },
      getInfo(){
        let type = this.$route.query.type
        this.goodsType = type
        let member_id = localStorage.getItem('monthCardCollageMemberid')
        let url = this.$common.config.gzhUrl + 'v3/group/month-card/buy'
        let act_id = this.$route.query.aid || 2;
        let param = {type:type,act_id:act_id,member_id:member_id}
        if(this.$route.query.vid>0){
          param.view_member_id = this.$route.query.vid
        }else {
          delete param.view_member_id
        }
        let fd = this.$common.getParam('get',param)
        let _this = this;
        this.$axios.get(url+'?'+fd).then((res) => {
          if(res.data.code == 200){
          _this.goodsObj = res.data.data;
        }else if(res.data.code == 11005){
          _this.canGroup = false
          _this.showEject(res.data.msg)
        }else {
          _this.showEject(res.data.msg)
        }
      })
      },
      pay: function () {
        if(confirm('确定支付么？')){
          this.$router.push({name:'Suc'})
        }
        return
        let type = this.$route.query.type
        let member_id = localStorage.getItem('monthCardCollageMemberid')
        let openid = localStorage.getItem('monthCardCollageOpenid')
        let ph = localStorage.getItem('monthCardCollagePhone')
        let source_id = this.$route.query.sid || 107;
        let act_id = this.$route.query.aid || 3;
        let fdObj = {member_id:member_id,openid:openid,phone:ph,goods_num:1,
          total_price:this.goodsObj.original_price,discount_money:this.goodsObj.discount_money,
          money_paid:this.goodsObj.price,goods_name:this.goodsObj.product_name,
          payment_type:3,pay_type:3,trade_type:'JSAPI',source_id:source_id,act_id:act_id};
        if(type == 1){
          fdObj.product_id = 104
        }else if(type == 2){
          fdObj.product_id = 105
        }
        fdObj.parent_order_no = 0
        if(this.$route.query.vid && this.canGroup){
          fdObj.parent_order_no = this.goodsObj.order_sn || 0
        }else {
          delete fdObj.parent_order_no
        }
        if(type==2 && this.canGroup){
          fdObj.is_group = 1
        }else {
          fdObj.is_group = 0
        }
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
              window.localStorage.setItem('sucTag',1)
              if(type == 2 && _this.canGroup){
                window.localStorage.setItem('type',type)
              }else {
                window.localStorage.setItem('type',1)
              }
              _this.$router.push({name:'Collage'})
            }
          });
        }else{
          _this.showEject(res.data.msg)
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

<style scoped lang="less">
  .pay_container {
    width: 100%;
    height: calc(~'100vh - .6rem');
    background: #62ABEF;
    padding-top: .6rem;
    /**/
    .bg{
      width: 100%;
      height: 7.44rem;
      background: url('../assets/images/order_mid.png') no-repeat;
      background-size: cover;
      position: absolute;
      top: 1rem;
      left: 0;
      z-index: 2;
    }
    .pay_info{
      width: 100vw;
      font-size: .3rem;
    }
    .banner{
      width: 100%;
      height: 3.8rem;
    }
    .invite_box{
      background: #fff0a5;
    }
    .suc_box{
      background: #ff9a5d;
    }
    .btn{
      display: inline-block;
      height: .6rem;
      line-height: .6rem;
      padding: 0 .2rem;
      background: #4a96de;
      border-radius: .2rem;
    }
    .tag_txt{
      color: #fff;
      font-size: .22rem;
    }


    footer{
      width: 100vw;
      height: 1rem;
      line-height: 1rem;
      background: #EE5148;;
      position: fixed;
      bottom: 0;
      left: 0;
      font-size: .24rem;
      color: #FFFFFF;
      letter-spacing: .01rem;
      text-shadow: 0 .01rem 0 #B13434;
    }


    .ft_box {
      width: 7.5rem;
      height: 4.57rem;
      margin: auto;
      background: url('../assets/images/order_ft.png') no-repeat;
      background-size: cover;
      text-align: center;
      position: absolute;
      bottom: 0;
      z-index: 100;
      pointer-events: none;
    }
    .form_box {
      text-align: center;
      width: 6.9rem;
      background: #fff;
      border-radius: .3rem;
      margin: auto;
      padding-bottom: 1.2rem;
      position: relative;
      z-index: 3;
      .list{
        width: 6.3rem;
        margin: auto;
        padding-top: .57rem;
        li{
          height: .83rem;
          line-height: .83rem;
          text-align: right;
          border-bottom: .02rem solid #F2F2F2;
          position: relative;
          font-family: HiraginoSansGB-W6;
          font-weight: bold;
          font-size: .26rem;
          color: #444444;
          letter-spacing: .03rem;
          div{
            position: absolute;
            left: .15rem;
            line-height: 1;
            top: .28rem;
          }
          span{
            padding-right: .44rem;
          }
          &.goods{
            letter-spacing: .013rem;
            div{
              display: inline-block;
              line-height: 1;
              padding: .1rem .15rem;
              border-radius: .08rem;
              color: #F18F02;
              font-size: .24rem;
              border: .01rem solid #F18F02;
              left: .05rem;
              top: .2rem;
            }
          }
          &.money_paid{
            color: #F18F02;
            span{
              font-size: .36rem;
              letter-spacing: .0175rem;
            }
          }
          &.price,&.discount{
            div{
              color: #828D93;
            }
          }
        }
      }
      .collage_tag {
        font-family: HiraginoSansGB-W3;
        font-size: .24rem;
        color: #828D93;
        letter-spacing: .03rem;
        margin-top: .27rem;
        line-height: 1;
        text-align: left;
        padding-left: .45rem;
        span{
          display: inline-block;
          vertical-align: top;
          width: .28rem;
          height: .28rem;
          background: url('../assets/images/order_tag.png');
          background-size: cover;
          margin: -.02rem .1rem 0 0;
        }
      }
      .btn{
        width: 4.4rem;
        height: .98rem;
        line-height: .98rem;
        text-align: center;
        font-weight: bold;
        margin: auto;
        margin-top: 2.1rem;
        box-shadow: 0 .06rem 0 0 rgba(0,0,0,0.14);
        font-family: PingFangSC-Semibold;
        font-size: .4rem;
        letter-spacing: .016rem;
        border-radius: .5rem;
        position: relative;
        overflow: hidden;
        background-image: linear-gradient(0deg, #F38E10 0%, #FCD926 100%);
        text-shadow: 0 .02rem .12rem #D28307;
        color: #FFF;
      }
    }
    .txt_box{
      text-align: left;
      margin-left: .67rem;
      font-family: HiraginoSansGB-W3;
      font-size: .22rem;
      color: #EFFAFF;
      letter-spacing: .0075rem;
      z-index: 101;
      p{
        position: relative;
        padding-left: .29rem;
        line-height: 1;
        margin-top: .18rem;
        &::before{
          content: '';
          width: .06rem;
          height: .06rem;
          background: #fff;
          border-radius: 50%;
          position: absolute;
          left: 0;
          top: .08rem;
        }
      }
    }
  }
</style>

<template>
  <div class="order">
    <div class="order_container">
      <div class="bady_tag"></div>
      <div class="ft_tag"></div>
      <div class="ft_bg"></div>
      <div v-if="hasPay" class="suc_content">
          <div class="suc_box">
              <p class="title">支付成功！</p>
              <img src="../assets/images/suc_img.png" class="suc_img">
              <p class="address_txt">添加收货地址，即可获得专属学习礼包哦～</p>
              <div class="btn_add" @click="toAddress()">+ 添加收货地址</div>
          </div>
          <p class="kf_txt">如有疑问，可联系小助手<br/>
            微信号：ABCReading006</p>
      </div>
      <div v-else class="pay_content">
          <div class="hd_box">
              <p>{{orderObj.phone}}</p>
          </div>
          <div class="list_box">
                <p class="list_title">购买商品</p>
                <ul>
                    <li class="vip_li">
                        <div class="left_box">
                            <img class="left_img" :src="cardObj.pic">
                        </div>
                        <div class="mid_box">
                            <p class="title">{{cardObj.name}}</p>
                            <p class="desc"></p>
                        </div>
                        <div class="right_box">
                            <p class="price price_vip">¥{{cardObj.price}}</p>
                            <span class="num">X{{cardObj.num}}</span>
                        </div>
                    </li>
                    <li class="gift_li" v-for="(item,$index) in goodsObj">
                        <div class="left_box">
                            <img class="left_img" :src="item.pic">
                        </div>
                        <div class="mid_box">
                            <p class="title">{{item.name}}</p>
                            <p v-show="item.desc" class="desc">{{item.desc}}</p>
                        </div>
                        <div class="right_box">
                            <p v-show="item.price" class="price price_coupon">{{item.price}}</p>
                            <span class="num">X{{item.num}}</span>
                        </div>
                    </li>
                    <li class="price_li">
                        <p>实付金额<span>¥{{cardObj.price - cardObj.discount}}</span></p>
                    </li>
                </ul>
                <div class="btn_pay" @click="originalPay()">确认支付</div>
          </div>
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
        hasPay: false,
        ejectText:'',
        ejectStatus: false,
        orderObj: {
            phone: '18800001234'
        },
        cardObj: {
            pic: 'http://file.abctime.com/activity/renewal/card_icon.png',
            name: 'VIP畅玩年卡',
            price: 588,
            num: 1,
            discount: 220
        },
        goodsObj: [
            {
                name: '直减',
                desc: '限年卡续费',
                pic: 'http://file.abctime.com/activity/renewal/coupon_icon.png',
                num: 1,
                price: '-¥220'
            },
            {
                name: 'RAZ原版单词卡',
                desc: '含108个常用词汇',
                pic: 'http://file.abctime.com/activity/renewal/gift_icon.png',
                num: 1,
                price: ''
            },
            {
                name: 'RAZ字母课',
                desc: '',
                pic: 'http://file.abctime.com/activity/renewal/lesson_icon.png',
                num: 1,
                price: ''
            },

        ]
    }
  },
  created(){
    // this.shareConfig()
  },
  mounted(){
      this.orderObj.phone = localStorage.getItem('renew_phone')
  },
  methods: {
    getUserInfo(){

    },
    toAddress(){
        this.$router.replace({name:'Address'})
    },
    originalPay(){
      let member_id = localStorage.getItem('extendAbcMemberid')
      let openid = localStorage.getItem('extendAbcOpenid')
      let ph = localStorage.getItem('renew_phone') 
      let app_id = localStorage.getItem('renew_app_id') 

      let fdObj = {app_member_id:app_id,order_no:'',member_id:member_id,openid:openid,phone:ph,goods_num:1,
        product_id:130,total_price:588,discount_money:220,money_paid:368,goods_name:'年卡续费大礼包',
        payment_type:3,pay_type:3,trade_type:'JSAPI'};
      let _this = this;
      let fd = this.$common.getParam('get',fdObj);
      let orderUrl = this.$common.config.gzhUrl + 'v3/pay/order/add'
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
            _this.hasPay = true;
            _this.showEject('购买成功');
          }
        });
      }else{
        _this.showEject(res.data.msg)
      }
    })
        _hmt.push(['_trackEvent', 'button', 'click', '订单-确认支付']);

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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .order_container {
    width: 100%;
    height: calc(~'100vh - .3rem');
    padding-top: .3rem;
    background: url('../assets/images/order_bg.png') repeat-y;
    background-size: 100% auto;
    /*min-height: 100vh;*/
    position: relative;
    z-index: 10;
    .ft_bg{
        width: 100vw;
        height: 1.89rem;   
        background: url('../assets/images/order_bg_ft.png') no-repeat;
        background-size: cover;
        position: absolute;
        left: 0;
        bottom: 0;
    }
    .bady_tag{
        width: 100vw;
        height: 7rem;
        // height: 100vh;   
        background: url('../assets/images/order_bg_tag.png') bottom no-repeat;
        background-size: 100% auto;
        position: absolute;
        top: .94rem;
        left: 0;
    }
    .ft_tag{
        width: 100vw;
        height: 1.9rem;
        // height: 100vh;   
        background: url('../assets/images/order_ft.png') no-repeat;
        background-size: 100% auto;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 2;
    }
    .pay_content{
        position: relative;
        .hd_box{
            width: 7.13rem;
            height: 1.45rem;
            background: url('../assets/images/index_title_bg.png') no-repeat;
            background-size: cover;
            margin-left: .37rem;
            text-align: left;
            p{
                font-family: FZY4JW--GB1-0;
                font-size: .3rem;
                color: #563ACC;
                letter-spacing: 1.71px;
                padding: .3rem 0 0 1.48rem;
                position: relative;
                &::before{
                    content: '';
                    width: .38rem;
                    height: .36rem;
                    background: url('../assets/images/order_phone_tag.png');
                    background-size: cover;
                    position: absolute;
                    top: .29rem;
                    left: .9rem;
                }
            }
        }
        .list_box{
            width: 6.7rem;
            // height: 8rem;
            margin: -.12rem auto 0;
            background: #301DA0;
            border: .12rem solid #503DE2;
            border-radius: .3rem; 
            text-align: left;
            .list_title{
                font-family: HiraginoSansGB-W3;
                font-size: .26rem;
                color: #F18F02;
                padding: .03rem .1rem;
                margin: .25rem .25rem;
                display: inline-block;
                border: .01rem solid #F18F02;
                border-radius: .08rem;
            }  
            ul{
                text-align: left;
                li{
                    position: relative;
                    width: 6.3rem;
                    margin: auto;
                    border-top: .02rem solid #240F66;
                    .left_box{
                        display: inline-block;
                        width: 1.5rem;
                        .left_img{
                            width: 1.4rem;
                            height: auto;
                            margin: .16rem .1rem 0 0;
                        }
                    }
                    &.gift_li{
                        .left_box{
                        display: inline-block;
                        width: 1.5rem;
                            .left_img{
                                width: 1rem;
                                height: auto;
                                margin: .16rem .1rem 0 .2rem;
                            }
                        }
                    }
                    .mid_box{
                        display: inline-block;
                        vertical-align: top;
                        padding-top: .21rem;
                        .title{
                            font-family: FZY4JW--GB1-0;
                            font-size: .28rem;
                            color: #FFF;
                            letter-spacing: .03rem;
                        }
                        .desc{
                            font-family: FZY4JW--GB1-0;
                            font-size: .2rem;
                            color: rgba(182,176,255,.6);
                            letter-spacing: 2.31px;
                            padding: .11rem 0 .24rem;
                        }
                    }
                    .right_box{
                        position: absolute;
                        top: .28rem;
                        right: .26rem;
                        text-align: right;
                        .price{
                            font-family: HiraginoSansGB-W6;
                            font-weight: bold;
                            font-size: .28rem;
                            color: #FFF;
                            letter-spacing: .032rem;
                            text-align: center;
                            &.price_vip{
                                padding-bottom: .5rem;
                            }
                        }
                        .num{
                            font-family: HiraginoSansGB-W6;
                            font-weight: bold;
                            font-size: .22rem;
                            color: #B6B0FF;
                            letter-spacing: .025rem;
                            text-align: center;
                            padding-right: .18rem;
                            line-height: 1;
                        }
                    }
                    &.gift_li:nth-child(3),&.gift_li:nth-child(4){
                         .mid_box{
                            .title{
                                position: relative;
                                &::after{
                                    content: '赠送';
                                    margin-left: .08rem;
                                    background: #FFF;
                                    border-radius: .08rem;
                                    padding: .03rem .05rem;
                                    font-family: FZY4JW--GB1-0;
                                    font-size: .22rem;
                                    color: #301DA0;
                                    letter-spacing: .007rem;
                                }
                            }
                        }   
                    }
                    &.price_li{
                        p{
                            font-family: HiraginoSansGB-W3;
                            font-size: .26rem;
                            color: #F18F02;
                            letter-spacing: .03rem;
                            text-align: right;
                            padding: .2rem .34rem 0 0;
                            span{
                                font-family: HiraginoSansGB-W6;
                                font-weight: bold;
                                font-size: .36rem;
                                color: #F18F02;
                                letter-spacing: .0175rem;
                                text-align: center;
                                padding-left: .23rem;
                            }
                        }
                    }
                }
            }
            .btn_pay{
                width: 4.64rem;
                height: 1.14rem;
                line-height: 1rem;
                margin: .5rem auto .3rem;
                background: url('../assets/images/index_btn_active.png');
                background-size: cover;
                font-family: FZY4JW--GB1-0;
                font-size: .4rem;
                font-weight: bold;
                color: #B12C13;
                letter-spacing: .036rem;
                text-align: center;
                position: relative;
                z-index: 10;
            } 
        }
    }
    .suc_content{
        position: relative;
        .suc_box{
            width: 6.7rem;
            padding-bottom: 1.7rem;
            // height: 8rem;
            margin: .18rem auto 0;
            background: #301DA0;
            border: .12rem solid #503DE2;
            border-radius: .3rem; 
            text-align: center;
            
            .title{
                font-family: FZY4JW--GB1-0;
                font-size: .34rem;
                color: #FFF;
                letter-spacing: .039rem;
                padding: .96rem 0 .5rem;
            }
            .suc_img{
                width: 3.4rem;
                height: auto;
            }
            .address_txt{
                font-family: FZY4JW--GB1-0;
                font-size: .24rem;
                color: #B6B0FF;
                letter-spacing: .014rem;
                padding: .94rem 0 .35rem;
            }
            .btn_add{
                width: 4.64rem;
                height: 1.14rem;
                line-height: 1rem;
                margin: auto;
                background: url('../assets/images/index_btn_active.png');
                background-size: cover;
                font-family: FZY4JW--GB1-0;
                font-size: .4rem;
                font-weight: bold;
                color: #B12C13;
                letter-spacing: .036rem;
                text-align: center;
                position: relative;
                z-index: 10;
            }
        }
        .kf_txt{
            font-family: FZY4JW--GB1-0;
            font-size: .24rem;
            color: #696CDB;
            letter-spacing: .014rem;
            padding: .3rem 0 0;
        }
    }
  }
</style>

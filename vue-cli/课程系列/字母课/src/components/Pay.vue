<template>
  <div class="pay">
    <div class="pay_container">
      <div class="hd_box"></div>
      <div class="main">
        <div class="info_box">
          <img src="../assets/imgs/info_small.png">
          <p class="title">26节舞动韵律的字母课，让0基础宝宝爱上英语</p>
          <p class="price"><span class="discount">¥<span>9</span>.90</span><span class="original">￥98.00</span></p>
        </div>
        <div class="fenge"></div>
        <div class="collage_box">
          <div class="default_box" v-show="!haveGroup">
            <p class="txt">立即支付，即可开团成功</p>
            <ul>
              <li class="default"><img :src="head_img"></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div class="ing_box" v-show="haveGroup && !sucStatus">
            <p class="tag" v-show="haveCollage"><span class="icon"></span>已支付成功</p>
            <p class="txt">仅需 <span>{{xNum}}</span> 人即可拼团成功，剩余 <span>{{hour}}:{{minute}}:{{sister}}</span></p>
            <ul>
              <!--<li class="suc"><img :src="head_img"></li>-->
              <!--<li></li>-->
              <!--<li></li>-->
              <li v-for="item in memberArr" class="ing">
                <img class="h_img" v-if="item.head_img" :src="item.head_img">
                <div class="h_img" v-else></div>
                <!--<span class="nickname">{{item.nick_name}}</span>-->
              </li>
            </ul>
          </div>
          <div class="suc_box" v-show="haveGroup && sucStatus">
            <div class="suc_img"></div>
            <ul>
              <li v-for="item in memberArr" class="suc">
                <img class="h_img" v-if="item.head_img" :src="item.head_img">
                <div class="h_img" v-else></div>
                <!--<span class="nickname">{{item.nick_name}}</span>-->
              </li>
            </ul>
          </div>
        </div>
        <div class="code_box">
          <div class="code_wrap">
            <img src="../assets/imgs/gzh_code.jpg">
          </div>
          <p class="code_txt">领取礼品及课程学习，<br/>
            请扫码关注“ABC Reading美国小学图书馆”</p>
        </div>
        <!--<div class="btn" v-show="!direct_buy && !defaultStatus &&!haveCollage" @click="newGroup()">立即支付(¥1<span>.00)</span></div>-->
        <div class="btn" v-show="!direct_buy && !selfHaveGroup" @click="joinGroup()">立即支付(¥9<span>.90)</span></div>
        <div v-show="!direct_buy && selfIng && !defaultStatus" class="btn" @click="backCollage">拼团中...</div>
        <div class="btn" v-show="!direct_buy && !defaultStatus && haveGroup && !sucStatus" @click="invite()">邀请好友拼团</div>
        <div class="poster_btn" v-show="!direct_buy && haveGroup && !sucStatus" @click="getPoster">生成海报</div>
        <div class="btn" v-show="!direct_buy && selfSuc && haveGroup && sucStatus" @click="toStudy()">立即开始学习</div>
        <div class="btn" v-show="direct_buy" @click="toStudy()">立即开始学习</div>
        <p class="tips">备注：拼团成功后仅拼团付款人微信账号可学习课程</p>
      </div>
    </div>
    <div class="code_toast" v-show="showCodeToast">
      <div class="toast_bg">
        <img src="../assets/imgs/gzh_code.jpg">
      </div>
      <div class="toast_close" @click="showCodeToast=false"></div>
    </div>
    <div class="share_wrap" v-if="shareStatus" @click="shareStatus=false">
      <div class="hd"></div>
      <div class="bd"></div>
    </div>
    <eject :message="ejectText" :showState="ejectStatus"></eject>
    <!--<div v-show="posterStatus">-->
      <poster ref="poster"></poster>
      <!--<poster ref="poster" v-show="posterStatus"></poster>-->
    <!--</div>-->
    <hv></hv>
  </div>
</template>

<script>
  import Eject from './Eject'
  import Poster from './Poster'
  import Hv from './Hv'
  export default {
    name: 'Pay',
    components: {
      eject: Eject,
      poster: Poster,
      hv: Hv
    },
    data () {
      return {
        nickname:'',
        head_img:'',
        num:2,
        hour:'00',
        minute:'00',
        sister:'00',
        endTime:0,
        haveGroup:false,
        canTap:false,
        canJoin:false,
        sucStatus:false,
        memberArr:[],
        haveCollage:false,
        defaultStatus:true,
        selfIng:false,
        selfSuc:false,
        shareStatus:false,
        posterStatus:false,
        direct_buy:false,
        xNum:2,
        selfHaveGroup:false,
        goodsObj:{},
        goodsType:1,
        canGroup:true,
        ejectText:'',
        ejectStatus: false,
        showCodeToast: false
      }
    },
    created(){
      // this.shareConfig()
      // this.showTime()
    },
    mounted(){
      this.getInfo()
      this.getMemberInfo()
      this.getCollageInfo()
      this.nickname = window.localStorage.getItem('extendAbcNickname')
      this.head_img = window.localStorage.getItem('extendAbcHeadimg')
    },
    methods: {
      backCollage(){
        window.location.href = 'index.html#/pay'
      },
      toStudy(){
        this.$router.replace({name:'Cata'})
      },
      invite(){
        this.shareStatus = true;
      },
      getPoster(){
        let link = '',member_id = localStorage.getItem('extendAbcMemberid')
        let vid = this.$common.VL.getRequest().view_member_id
        if(vid > 0){
          if(this.haveGroup){
            if(this.isSelf){
              link = window.location.origin + '/extend/letter/index.html?view_member_id=' + member_id
            }else {
              link = window.location.origin + '/extend/letter/index.html?view_member_id=' + vid
            }
          }else {
            link = window.location.origin + '/extend/letter/index.html?view_member_id=' + member_id
          }
        }else {
          link = window.location.origin + '/extend/letter/index.html?view_member_id=' + member_id
        }
        this.$refs.poster.showWrap();
        this.$refs.poster.createPoster(link)
        // this.posterStatus = true
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
          // 商品配置
          let da = res.data.data
          let conf = da.conf
          _this.groupPrice = conf.group_buy.price
          _this.groupType = conf.group_buy.type
          _this.directPrice = conf.direct_buy.price
          _this.directType = conf.direct_buy.type
          _this.suc_num = conf.member_join_num
          _this.direct_buy = conf.has_direct_buy

          // 拼团信息配置
          // 自己的团
          let my_group = da.my_group
          // 是否处于自己团
          let view_self = da.view_self
          let view_group = {}
          // 是自己团
          if(view_self){
            _this.isSelf = true
            if(my_group.has_group){
              _this.selfHaveGroup = true
              _this.haveGroup = true
              view_group = da.my_group
              // 团已满
              if(view_group.is_full){
                _this.sucStatus = true
                _this.selfSuc = true
                _this.defaultStatus = false
              }
              // 团未满
              else {
                _this.sucStatus = false
                _this.endTime = view_group.end_time
                _this.hideTimeout = false
                _this.showTime()
                _this.selfShare = true
                _this.defaultStatus = false
              }
            }else {
              _this.haveGroup = false
            }
          }
          // 非自己团
          else {
            // 团信息
            view_group = da.view_group
            // 已成团
            if(view_group.has_group){
              _this.haveGroup = true
              //判断自身有没有团
              if(my_group.has_group){
                _this.selfHaveGroup = true
                _this.defaultStatus = false
                if(my_group.is_full){
                  _this.selfSuc = true
                }else {
                  _this.selfIng = true
                }
              }else {
                if(view_group.is_full){
                  _this.sucStatus = true
                  _this.defaultStatus = false
                  _this.selfNew = true
                } else {
                  _this.sucStatus = false
                  _this.haveCollage = false
                  _this.endTime = view_group.end_time
                  _this.hideTimeout = false
                  _this.showTime()
                }
              }
            }
            //未成团
            else {
              _this.haveGroup = false
            }
          }
          //拼团信息展示
          if(view_group.is_full){
            _this.sucStatus = true
          }
          if(view_group.members){
            let len = 0;
            for(let i in view_group.members){
              _this.memberArr[i] = view_group.members[i]
              if(view_group.members[i].head_img && view_group.members[i].head_img != ''){
                len ++
              }
            }
            if(len <= 3){
              _this.xNum = 3 - len
            }else {
              _this.sucStatus = true
            }
          }
          _this.endStatus = false;
          // _this.showSucToast();
          _this.shareConfig()
          this.canJoin = true
        }else if(res.data.code == 11001){
          _this.endStatus = true;
        }
      })
      },
      //倒计时
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
      //参团
      joinGroup(){
        if(this.canTap){
          let ph = window.localStorage.getItem('extendAbcPhone')
          if(!ph){
            this.$router.push({name:'Login',query:{type:2}})
          }else {
            this.pay();
          }
        }
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
      getInfo(){
        let member_id = localStorage.getItem('extendAbcMemberid')
        let url = this.$common.config.gzhUrl + 'v3/group/month-card/buy'
        let param = {type:2,act_id:4,member_id:member_id}
        if(this.$common.VL.getRequest().view_member_id>0){
          param.view_member_id = this.$common.VL.getRequest().view_member_id
        }else {
          delete param.view_member_id
        }
        let fd = this.$common.getParam('get',param)
        let _this = this;
        this.$axios.get(url+'?'+fd).then((res) => {
          if(res.data.code == 200){
          _this.goodsObj = res.data.data;
        }
      })
      },
      pay: function () {
        let searchObj = this.$common.VL.getRequest();
        let member_id = localStorage.getItem('extendAbcMemberid')
        let openid = localStorage.getItem('extendAbcOpenid')
        let ph = localStorage.getItem('extendAbcPhone')
        let source_id = 109;
        let act_id = 4;
        let fdObj = {member_id:member_id,openid:openid,phone:ph,goods_num:1,
          total_price:this.goodsObj.original_price,discount_money:this.goodsObj.discount_money,
          money_paid:this.goodsObj.price,goods_name:this.goodsObj.product_name,
          payment_type:3,pay_type:3,trade_type:'JSAPI',source_id:source_id,act_id:act_id};
        fdObj.product_id = this.goodsObj.product_id
        fdObj.parent_order_no = 0
        console.log(this.sucStatus)
        if(searchObj.view_member_id && this.canGroup && !this.sucStatus){
          fdObj.parent_order_no = this.goodsObj.order_sn || 0
        }else {
          delete fdObj.parent_order_no
        }
        fdObj.is_group = 1
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
              _this.getCollageInfo();
              _this.showCodeToast = true
              // location.reload();
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
        let link = '',_this=this;
        let configObj = {
          title:'零基础宝宝也能学会的字母课，26节课让孩子轻松爱上英语！',
          desc: 'AI动画互动课，孩子轻松掌握26个字母，养成良好阅读习惯，英文水平超车同龄宝宝~',
          imgUrl: 'https://qnfile.abctime.com/extend/letter/letter_share.png',
        };
        let vid = this.$common.VL.getRequest().view_member_id
        if(vid > 0){
          if(this.haveGroup){
            if(this.isSelf){
              link = window.location.origin + '/extend/letter/index.html?view_member_id=' + member_id
            }else {
              link = window.location.origin + '/extend/letter/index.html?view_member_id=' + vid
            }
          }else {
            link = window.location.origin + '/extend/letter/index.html?view_member_id=' + member_id
          }
        }else {
          link = window.location.origin + '/extend/letter/index.html?view_member_id=' + member_id
        }
        if(this.haveGroup && this.xNum > 0){
          configObj.title = '仅差' + this.xNum + '人拼团成功！RAZ字母精灵，宝宝学习自然拼读的基础课！'
          configObj.desc = 'AI动画互动课，孩子轻松掌握26个字母，养成良好阅读习惯，英文水平超车同龄宝宝~'
        }
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
                _this.shareStatus = false
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
                _this.shareStatus = false
              }
            });
          });
        }
      })
      }
    }
  }
</script>

<style scoped lang="less">
  .pay_container {
    width: 100%;
    min-height: calc(~'100vh - .5rem');
    padding-bottom: .5rem;
    background: #FFAF4C;
    .hd_box {
      width: 7.5rem;
      height: 5.38rem;
      margin: auto;
      background: url('../assets/imgs/login_head.png') no-repeat;
      background-size: 100%;
      position: relative;
    }
    .main {
      position: relative;
      width: 6.86rem;
      padding-bottom: .44rem;
      margin: -1.32rem auto 0;
      background: #FFFFFF;
      box-shadow: 0 .06rem .18rem 0 rgba(180, 97, 3, .4);
      border-radius: .36rem;
      .info_box{
        height: 2.56rem;
        img{
          width: 1.6rem;
          height: 1.6rem;
          position: absolute;
          left: .48rem;
          top: .48rem;
        }
        p{
          text-align: left;
          width: 4.1rem;
          padding-left: 2.32rem;
          &.title{
            padding-top: .48rem;
            font-family: PingFangSC-Regular;
            font-size: .28rem;
            color: #333333;
            letter-spacing: 0;
          }
          &.price{
            .discount{
              font-family: PingFangSC-Semibold;
              font-weight: bold;
              font-size: .32rem;
              color: #FB2020;
              letter-spacing: 0;
              span{
                font-size: .48rem;
              }
            }
            .original{
              font-family: PingFangSC-Regular;
              font-size: .28rem;
              color: #333333;
              letter-spacing: 0;
              text-decoration: line-through;
              padding-left: .16rem;
            }
          }
        }
      }
      .fenge{
        margin: auto;
        width: 6.04rem;
        height: 0;
        border-top: .04rem dotted #F2D8B5;
      }
      .collage_box{
        .default_box{
          .txt{
            font-family: PingFangSC-Regular;
            font-size: .28rem;
            color: #333333;
            letter-spacing: 0;
            text-align: center;
            padding: .48rem 0 .32rem;
          }
        }
        .ing_box{
          .tag{
            font-family: PingFangSC-Regular;
            font-size: .2rem;
            color: #1AC867;
            letter-spacing: 0;
            text-align: center;
            padding: .12rem .08rem;
            .icon{
              display: inline-block;
              vertical-align: top;
              margin: .05rem .1rem;
              width: .24rem;
              height: .24rem;
              background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAe1BMVEUAAAAayGcayGcbyWcbyGgayWgezGscym0dzmwayWgayWgay2k13Y0ayWcbyWgbymkbymghzWkczW0byWgaymgdy2kbyGccyWkcyWgayWgayWcayWgayWcay2gcyWkaymobyGkczGwg34AayGgayWcdyWcaymokyG0ayGft9Vx1AAAAKHRSTlMA/PPZtmohHBr3mkwEsJd6TxcSn2EoqG1k6tKkgVhEOjgtCN+6WVcOMKGx0QAAAP9JREFUKM9dkumWwyAIhS+oSczetOm+z3bf/wnnaMdpkvtH+TggAvhT7qxRNdblmKoohaT3JKUs3rxSansdgOHaKrVKfCcsV8lYrSm717UXv8FEe5EYUygTTx5qeKfkGgudWAK5+GLpyL3kcPOA+nyqgTUdLPsJHz7JDOhpYTj5a2bILpw0UNah5DHw24H+EhNSoXwCI/0N+PI83BH0pMKEnPWRej+TxyzymMryOzTCUEj7g5cutHDcxtI/yLZORWzpkItkMXq7fxcnUoSWNFioYftqYjfnHXUVxyTs5lyq/0HZMeGxobhk9EppNo9heGwaoVbLZYiSNk15sT5pOL9frRL06sCdwwAAAABJRU5ErkJggg==');
              background-size: cover;
            }
          }
          .txt{
            font-family: PingFangSC-Regular;
            font-size: .28rem;
            color: #333333;
            letter-spacing: 0;
            text-align: center;
            span{
              color: #FB2020;
            }
            padding: .32rem;
          }
        }
        .suc_box{
          .suc_img{
            width: 2.79rem;
            height: .67rem;
            background: url('data:image/png;base64,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');
            background-size: cover;
            margin: .22rem auto .31rem;
          }

        }
        ul{
          margin: auto;
          /*display: inline-flex;*/
          font-size: 0;
          li{
            display: inline-block;
            vertical-align: top;
            width: .96rem;
            height: .96rem;
            background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAABiVBMVEUAAAD/05b/9+//9+v///P/9+r/9+v/+Ov/+Ov/+Ov/////kmf/k2r/9+v/mHD/il3/l3D/kGb/mG//mnP/9+z/lW3/l2z/++3/+OH/jV//lGP/jWP/9uv/9ur/lGv/9+v/9+r/9+v/9uv/9ur/9+r/9+v/9ur/9+z/m3X///L/jVj/////i2D/9+v/wqf/m3X/mXH/mHL/uJn/6dn/rYr/mHD/59b/s5L/mnH/mXD/qoX/lm3/s5f/x6r/iFX/4M//4c//x63/t5n/mnT/073/qIX/nXn/zrb/rYn/pH//z7n/t5f/z7j/vaD/1r//yq//6Nz/zrX/9ur/glT/69z/8+X/hVj/9ej/g1b/y7L/vqH/7uD/3sv/j2T/9Of/59b/4M7/1sH/tJT/lm7/kWf/iFv/8OL/5dT/28b/0Ln/oX3/n3r/nHb/il3/49H/uJv/tpf/rIv/6dn/w6j/v6L/sI//k2r/zbT/xqv/o3//mXH/zrb/wqX/vJ//qIX/3Mf/0rz/jGD/7d6RLpRsAAAAUnRSTlMAAR/9FfSpcFAmCvDs2278WvbOsUI7IxkNDQb37+fm2MO8sKyemJJgYBMTBPz5yMF6UCn28+Hex6J7W0Q/Fg/9+vXr6eTet7GvnYqAemljMCwfwOc/3gAABDhJREFUaN692oVaG0EUBeCbBBojwWrUFai7u7uds9k4cSG4Fqj3yZv9Ai1toZlJdvs/wMze+e7syB1Rsyvg3uo9enp3t5kPHTh81PsqvG1A7LKrp7+rBssoyWlYpkme9nWIDfyDBsk0LBGjHEWjq5lC7AtwatC/S9rR4d0DIJ+oRvCXkUafJ/t6XNIaVzg4imaqMfKBW1pxvZf8jKaMRHoJB/2ia+cWwyzEo1AQHQGwZafe6Ax5gCx0lB8fF2XnQ9A2ze5h1bzvX4xAW2aMfCEqtnfRrKIFc8s4ckKaCtxnMYtW7Q9IE8f2IpFE6/Yek39yd6JNF4b/2b4HbYosMiybOncBbUvQPCeb2FZKG2jbFC8GNsnPbi7ABjns3zhbr7AWhT2OyAZ8+JCEXXzylx2w1Q75gysEO33t/fPfOgRb1Xjmjwy9A1tVTN6QdVxB5mCrxMRpWecsixHYauQ7/OsC6GUctjsoP7lTeTjALWsOwRGHZFUHHHJeGrxwRKrYJw174AgjZt4Wy/XRCByxzGti2ccPcMT79BWpG4jFklCWyUBZFKekrodjUFOeGi+RZuFTBKo6ROT1x1Eo+bLIVcUcFFkLzxaoyZFcmY4v5SfI0izUbBERD5SMLJLTUdQZNSqPqkckADXz5AwajAkyoxb11HlxQ804WcGqGfIrVMwwLFuhZoJprEmQ81DxiVflzFgKCgxyHGumyCW1qcY+2ccqFERSqcr64cpBxezSEwlyEppGyW9lqDksu2lAT6pEzkHRAbmsG0BqgvwchaKQdALQbX8mClWduh1MlshpqOuUEHREV6hziIjULsoB6IiT4yNQZnC3HIaOBWpt0SYZlEuxKtQVyAzUVblP+rQ+KcZv0BCZfC5XmYC6bDYLLVslXPoEB7llJ3REs9ATEPFAXSXNogENHo1F35InOQ9lybK16Pug7iO15sF87Jnm5j25kF6IQNk4e6TubqIMRyRjsYHG5jcOR2Rql8RyjctwyFux3DZjBhyxRxqe5uAMr9OHwA5Hj7EGDskaNxxQKNyUnw7CdnH2uuQnfyZv92VIkWflF1cXE7BVZKrLJevcoJmBrTy35DdnOAdbDcnvjj+ErUKu/3utafHBLsmVUZ9s4AjsER1jPYM2cGJ/PA8b5Nm9XTa0vcQptC93cpts4pzJj2hb5zvZVHgihXZ53PIPbzrb/n530zJX65K1uXqZq4nAfqCClmSLPHlLmjpxZN6cQysK7NouClz95JgBfan+XaJmuLuVy/jQDlF2/KUHOj5MwjPk0iy5A8iqldzfL3K5XnLX5T+YLKUTBpqqkL1npRU3g+Q4mnsUbvllRU/fPVhmN3q4UU2MvQf2eDukHS7/4ClgJVaYKa+2mzRmYYmT/DzoFxt0+IKk2QiFdWlYKsH+ngGxy8C24frzn8MHLptm9+6uo96t7oCo+QE15wsZneLK7AAAAABJRU5ErkJggg==');
            background-size: cover;
            position: relative;
            margin: 0 .4rem;
            &.default{
              &::before{
                display:inline-block;
                content: '待支付';
                height: .22rem;
                line-height: .22rem;
                background: #FFAF4C ;
                border-radius: .11rem;
                font-family: PingFangSC-Semibold;
                font-weight: bold;
                font-size: .16rem;
                color: #FFFFFF;
                letter-spacing: 0;
                position: relative;
                z-index: 11;
                white-space: nowrap;
                padding: .01rem .12rem;
                margin-top: .74rem;
              }
            }
            &.ing:nth-child(1),&.suc:nth-child(1){
              &::before{
                display:inline-block;
                content: '团长';
                height: .22rem;
                line-height: .22rem;
                background: #FF5219;
                border-radius: .11rem;
                font-family: PingFangSC-Semibold;
                font-weight: bold;
                font-size: .16rem;
                color: #FFFFFF;
                letter-spacing: 0;
                position: relative;
                z-index: 11;
                white-space: nowrap;
                padding: .01rem .2rem;
                margin-top: .74rem;
              }
            }
            img{
              width: .96rem;
              height: .96rem;
              border-radius: 50%;
              position: absolute;
              top: 0;
              left: 0;
            }
          }
        }
      }
      .code_box{
        .code_wrap{
          width: 2.3rem;
          height: 2.3rem;
          margin: .4rem auto 0;
          box-shadow: 0 .04rem 0 .04rem rgba(180,97,3,0.40);
          border-radius: .24rem;
          background: rgba(180,97,3,0.4);
          img{
            width: 2rem;
            height: 2rem;
            margin: .15rem auto;
          }
        }
        .code_txt{
          padding-top: .27rem;
          font-family: FZY4JW--GB1-0;
          font-size: .24rem;
          color: #9A8E7F;
          letter-spacing: .01rem;
          text-align: center;
          line-height: 1.5;
        }
      }
      .btn{
        width: 6.28rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        font-weight: bold;
        margin: .38rem auto;
        background-image: linear-gradient(144deg, #FFC031 0%, #F24718 100%);
        font-family: PingFangSC-Semibold;
        font-weight: bold;
        font-size: .4rem;
        color: #FFF;
        letter-spacing: .016rem;
        border-radius: .5rem;
        position: relative;
        overflow: hidden;
        box-shadow: 0 .05rem .12rem 0 rgba(248,128,34,.5);
        span{
          font-size: .32rem;
        }
      }
      .poster_btn{
        width: 4.56rem;
        height: .72rem;
        line-height: .72rem;
        background: #D98B34;
        box-shadow: 0 .04rem .08rem 0 rgba(217,139,52,0.40);
        border-radius: .26rem;
        font-family: PingFangSC-Semibold;
        font-weight: bold;
        font-size: .28rem;
        color: #FFFFFF;
        letter-spacing: 0;
        margin: -.2rem auto .4rem;
      }
      .tips{
        font-family: PingFangSC-Regular;
        font-size: .2rem;
        color: #9A8E7F;
        letter-spacing: 0;
      }
    }
  }
  .code_toast{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 103;
    background: rgba(0,0,0,.8);
    .toast_bg{
      width: 4.5rem;
      height: 6.71rem;
      background: url('../assets/imgs/toast_bg.png');
      background-size: cover;
      margin: 2.25rem auto .4rem;
      position: relative;
      img{
        width: 1.3rem;
        height: 1.3rem;
        position: absolute;
        top: 5.1rem;
        left: 1.6rem;
      }
    }
    .toast_close{
      width: .8rem;
      height: .8rem;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAclBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9eWEHEAAAAJnRSTlMAxgmZlwULrXIOsbhXPBdSp6R5QTIrWry6ioZ/dWo3NiOSvUofkVdiLd0AAAKNSURBVFjDpJPbkqowEEX3jhNDCARBQWe8zu3/f/GkizpzI5qI68lKxUV3djcS2HNTfLbGkc60n0VztpiProuWE9qi1pjDptvyCttuc3dxjeHIohvqi7daW3+ph27BEdPoe3RVSWF1PCn8QZ2OKwplla2sDQOu6HGFvnAMmBo5+Ofx+wo3UGMPzx5J1juprtHpV5Yqd+vUtYKBg0UG9sBAoW/ekRBNj0x6I2NgcRUv+b0skc3yRWbB4wof8tAV7qKSAD8QxYtvjTtZizFaow39vm1mrOhb6NpG8pU8gm+GUZKZZl0k+k10XcQOK8ykmhbjd2FeMJswPbvfwYT9NUvMZmnCXuMHNckeD9AHQY0vtCEPeIgDab6THkhn8RDW/QhVl2SDB2nIUk9+zyBWlUmMYPYwmq/VcQoT3sv9ElHUvnyPnLr/q9tFFicQWlhEjWpBlkBseTsE9DY+g3vGjeqJ5D4+i1s9DvUKiP5RjPFjhQgrsh4rPSJtTPtwHN+uJU9IGFNlj5zIFrAkFW4ZVaYPiqTFOdwAUsa0Twjxn1FJ2LeNTyrPJwPYSCYDksYsHwZJ5VWyThvTvnECXyXkCzKMGT5cJGZDemQYM3zwpIGTqDOMGT4ZQQeSGkljlg+a5L/mzF0FYBCGoqWhqYPQzd2h//+LnRwlN+EM/QFBjPdxgh+IX1l9FFMfRRwbc3VstME2Vwf7lb6eeeLrPbE4mCfEQZEvz8iXILCeEtiSBZx7C8BNCrfRitFbYPS7KHLXoggflvg4xwdOPhIfHQvtfK3giw9fzfjyyNdbvoDziICHGDxm4UEQj6p4mMbjPh5I8siUh7rrOkPBzuOCwTiL7v+wXFjrj97mWn/M1sP1xwcvnCP1ct9eVwAAAABJRU5ErkJggg==');
      background-size: cover;
      margin: auto;
    }
  }
  .share_wrap{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 103;
    background: rgba(0,0,0,.8);
    .hd{
      width: 4.03rem;
      height: 1.83rem;
      background: url('../assets/imgs/index_share_hd.png');
      background-size: cover;
      position: absolute;
      right: .39rem;
      top: .16rem;
    }
    .bd{
      width: 4.89rem;
      height: 1.15rem;
      margin: 2.33rem auto;
      background: url('../assets/imgs/index_share_bd.png');
      background-size: cover;
    }
  }
  .poster_wrap{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 103;
    background: rgba(0,0,0,.8);
    .poster{
      width: 80%;
      margin: auto;
    }
  }
</style>

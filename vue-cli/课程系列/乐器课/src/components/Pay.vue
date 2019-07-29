<template>
  <div class="pay">
    <div class="pay_container">
      <div v-show="!haveGroup" class="hd_box"></div>
      <div v-show="haveGroup"  class="suc_txt_wrap">
        <div class="suc_txt"></div>
      </div>
      <div class="main">
        <div class="info_box">
          <img src="../assets/imgs/info_small.png">
          <p class="title">26节舞动韵律的字母课，让0基础宝宝爱上英语</p>
          <p class="price"><span class="discount">¥<span>1</span>.00</span><span class="original">￥199.00</span></p>
        </div>
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
            <!--<p class="tag" v-show="haveCollage"><span class="icon"></span>已支付成功</p>-->
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
            <div class="suc_tips"></div>
            <p class="suc_tips_txt_ing">拼团成功后<br/>
              仅拼团付款人微信账号可学习课程</p>
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
            <div class="suc_tips"></div>
            <p class="suc_tips_txt_ed">拼团成功后<br/>
              仅拼团付款人微信账号可学习课程</p>
          </div>
        </div>
        <!--<div class="btn" v-show="!direct_buy && !defaultStatus &&!haveCollage" @click="newGroup()">立即支付(¥1<span>.00)</span></div>-->
        <div class="btn" v-show="!direct_buy && !selfHaveGroup" @click="joinGroup()">立即支付(¥9<span>.90)</span></div>
        <div v-show="!direct_buy && selfIng && !defaultStatus" class="btn" @click="backCollage">拼团中...</div>
        <div class="btn" v-show="!direct_buy && !defaultStatus && haveGroup && !sucStatus" @click="invite()">邀请好友拼团</div>
        <div class="poster_btn" v-show="!direct_buy && haveGroup && !sucStatus" @click="getPoster">生成拼团海报</div>
        <div class="btn" v-show="!direct_buy && selfSuc && haveGroup && sucStatus" @click="toStudy()">立即开始学习</div>
        <div class="btn" v-show="direct_buy" @click="toStudy()">立即开始学习</div>
        <p class="tips" v-show="!haveGroup">备注：拼团成功后<br/>仅拼团付款人微信账号可学习课程</p>
      </div>
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
        let act_id = 5;
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
        let param = {type:2,act_id:5,member_id:member_id}
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
        let act_id = 5;
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
              location.reload();
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
        let fd = this.$common.getParam('get', {member_id: member_id,lesson_id:1,course_id:2});
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
        console.log(this.haveGroup)
        if(this.haveGroup && this.xNum > 0){
          configObj.title = '仅差' + this.xNum + '人拼团成功！RAZ字母精灵，宝宝迈进英语大门的基础课！'
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
    background: #2E649E;
    .hd_box {
      width: 7.5rem;
      height: 3.95rem;
      background: url('../assets/imgs/pay_head.png') no-repeat;
      background-size: 100% auto;
      position: relative;
      margin-bottom: .3rem;
    }
    .suc_txt_wrap{
      padding: .18rem 0 .3rem;
      .suc_txt{
        width: 2.63rem;
        height: 1.2rem;
        background: url('../assets/imgs/suc_txt.png');
        background-size: cover;
        margin-left: 2.28rem;
      }
    }
    .main {
      position: relative;
      /*width: 6.86rem;*/
      text-align: center;
      padding-bottom: .44rem;
      margin: auto;
      /*background: #FFFFFF;*/
      /*box-shadow: 0 .06rem .18rem 0 rgba(180, 97, 3, .4);*/
      /*border-radius: .36rem;*/
      .info_box{
        width: 6.54rem;
        height: 2.44rem;
        border-radius: .24rem;
        box-shadow: 0 .03rem .09rem 0;
        background: #fff;
        margin: auto;
        position: relative;
        img{
          width: 1.8rem;
          height: 1.8rem;
          position: absolute;
          left: .32rem;
          top: .32rem;
        }
        p{
          text-align: left;
          width: 3.85rem;
          padding-left: 2.36rem;
          &.title{
            padding-top: .48rem;
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            font-size: .28rem;
            color: #333333;
            letter-spacing: 0;
          }
          &.price{
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            font-size: .48rem;
            color: #FF561A;
            letter-spacing: 0;
            padding-top: .24rem;
            .original{
              font-family: PingFangSC-Regular;
              font-size: .24rem;
              color: #666;
              letter-spacing: 0;
              text-decoration: line-through;
              padding-left: .16rem;
            }
          }
        }
      }
      .collage_box{
        width: 6.54rem;
        border-radius: .24rem;
        background: #fff;
        padding-bottom: .32rem;
        margin: .32rem auto 0;

        .suc_tips{
          width: 2.68rem;
          height: .26rem;
          margin: .48rem auto .16rem;
          background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQwAAAAaCAMAAAB1qpKTAAAApVBMVEUAAABGRkYzMzM2NjY7Ozs0NDQzMzM0NDQ9PT0zMzMzMzM0NDQ2NjY0NDQzMzMzMzM0NDQzMzM0NDQ1NTU0NDQzMzMzMzM0NDQ0NDQzMzM4ODgzMzM1NTXe3t4zMzMzMzM0NDQzMzM0NDTj4+MzMzMzMzM1NTUzMzMzMzM1NTU1NTXd3d00NDQ0NDQ0NDQ0NDQ0NDQzMzPd3d0zMzPe3t4zMzPd3d2gHHmJAAAANXRSTlMABcMfEJD2dAvX0WA3RuzlzZ9WOcGux2+8WhfxQunhdzGKLB+Etj6klygjpkxnqH9R3LWwqA0U9foAAAP6SURBVFjD3diLcppAGIbhH8GVg6IYBQUFNGqAeGz65f4vrbvIKqC2nSaZap6ZRJNxJuw77L9R+nSZT781NHXKxZPc6eWK6yr0vaRde01ce1DikNB5EQJsxYNPLnJ7KuhAHuPQPWvTkdq/kNH907bATKwcJSYJ457AYIqHTAl6WZZtLmMwyIY2VnQ0xgWPHsGGYavwGEutkOYxJAN6vvQtmmKvwHCSegwqLE8x2s6FDj2EVWBnPMaQCr6MsTM4BoOLIrxpxHnDt5ffxXh48Vxsk0G7sJYx+s2TdTySTzfEtXe7BbDYeSJGrxB8hxhCfWYI+vgknRhwR5x7vIM8HB1EjEbBfvQYHUvGOMwKiYyhgoVhgDC04ZEWuj7/VY+lxMWe1wJanvWdtknGkCjEXZsZKhyihBHt4RHNwyByWMjX+6eZ0X66qk135PnndPr6TFV9hoF+I8YEruc1mOc58LL9bgQu2az8egyjIGeGjavs+vW8Tqc/n+m/eJ6+c9P6X49DNDQRI+gVTBkjgtEo9Juwl7u1N2IA0koM1zyLSVg2ThjchrS8cT3/w+t77pVq1BD7qwPU7zKfJD3T1Pmkv9HS9f58Zyg+/Z4N9Y/X8+9+vH/QlOrUMV2VwKGOaRrGIbQDhhxrnfMAluHF7Srlr2NM3z/ox+fHuM3faqRFUcvzNhsE+0l7rup0loEb26iSt4pWidFWvyLGZ28TaT2sEhc/b52BlX5IeYnIBTCc06KZs+E0cxodHez5OcYGyw9vky8eoNJ6uaIWqsRKLNwwJnKAoBigc7F+Az6VTRCW7gwlRIc/3NEAlUfrhSX6PEYSxyae4gjNOO7lMRQtF/e6E43Z2pi9zbWcwkMN99oxRorRlRhb7MrbZAyDv/aOjtZbVNgKj7EgcqHTGBFRg8co+DM24utkNlF8YDONJHm0WkjyGP2JICcGg1oZoO6DvIWfYUY3YiidFwbT4hDwb16A4K0VK5UYDrw8Ri6gIw/L6mnyBFun+6fYSK/HsIYBGFi3JAAXLMoxDDTy70mTW1DOt7GvHa2Dh7g1+mjQ9Rg7tl138FK9izadWS8uxUgBbOoz4wUDqsVYI3yAT0wHsG7EUHRxKnRHJSGs2swYYWYG62qMDlhaiyFyjenepQj06zHkezWrZFmKkZ8mfQRazDALSzH0AxZyD7JTDAsm3bumOAye3BCh6wZw3cPxidmUMUadkq2MoVr7BF3Su2LdKxuAORg6ibPd8UrDUPR9irzNFl1FdjF3d79PBojFhr4wkjFqZAxwTeqgJ1bot5ZdHEWn/8XXEGb0SNr8S1cv+JRb2YlSEoV9OlrMFhMxfudUUPw05p/qaCRpURR5GX2hX4iR8n1XjjowAAAAAElFTkSuQmCC');
          background-size: cover;
        }
        .suc_tips_txt_ing{
          font-family: PingFangSC-Regular;
          font-size: .24rem;
          color: #4CB0FF;
          letter-spacing: 0;
          text-align: center;
          line-height: 1.8;
        }
        .suc_tips_txt_ed{
          font-family: PingFangSC-Regular;
          font-size: .24rem;
          color: #FF571A;
          letter-spacing: 0;
          text-align: center;
          line-height: 1.8;
        }
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
          padding-top: .06rem;
          .suc_img{
            width: 2.64rem;
            height: .64rem;
            background: url('data:image/png;base64,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');
            background-size: cover;
            margin: 0 auto .24rem;
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
            background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAABd1BMVEUAAAD///////////9s0v9euP////9swP////9Vw/9Xtf9vwP////9duv/+//9auf9ju/////////////9ct/////9nvP////9rv/////////////////////////9sv/////////92xP////////9rv/////9wwf9qvv9iu/9xwf/T7P9uwP9uwP9uv/+m2f/R7v9iuv+Ax/+r2v+74v+j1//J6P+Eyf/n9f/A5P/v+f/R6/+Ax//j9P+h1v+Gyv95xP+DyP+x3f+h1v/e8f+Mzv92xP9ywf/N6P+Qz/9fuP////9MsP/+///0+/9Qsv/D5f9Ztv/b7/9sv/9guf/7/v/t9//U7P+c1P/q9v/l9P+44P+y3f+Mzf94xP9xwf9Wtf/o9f/f8v/W7v/P6v/G5/+13/+m2P+Qzv+CyP91w//x+f+h1v+X0v+T0P9lvP/4/P/2+//v+P/M6f+Hyv+Ax/9+xv/3/P/u+P+/5P9Rs/+64f+r2v9G1mcwAAAAS3RSTlMAA1SsBvfDXxAJ/bQtHhcS8L+xMvnz6+PhyJiJemBQSSoaBODa1s2HUfLw4sGNgCse9e7t7Ovo6OPc0MzMtLOlpJ6dgmxZQTo4NStfc3UZAAADY0lEQVRYw63Zh1LbQBgE4D827jgGQoBAIEB67733siu5Vww2LXRIg9SHj40ZQsD2ncr3ADuju537pZMohM6djTzx+k8dPXrb1zXwsjMoThwe8SZILqKuQDIBGN6REyGx4+1wP4Di1Ho5hbpsMfV1BTWffoUvnRCLOq74WERz0xWy0j0qVhy5QWbyaKW0MA+cOaK/dH7kKwkDKv73ouPQcWj6UT0dFaXAPejKVxkOqDYjwmUDunKbnPe0r3Ef4x9hwSww2G75etYys7Cq51DLvGMwVmDdsVjLPHsSvmjz54VNUzwfa7K/AynYZKY5cHAdI9wwYFOukvcc6DPjKTgxtm8Bbyr6p3Ty/4c+jmk4dPy/8wUuuCr/+OGYueUL/TtP4ZyR5uXdCt434Nw8ezuk4Qon4YKpxXfS4GMCLjDQ3cg7wYwBdwSl7tXCBFwyLHX9cE2/otTWXasFjkDNmEnMFaE0txGpBXqhkl2Nsyadh0KeXbVWm1Aw04xXFpeSVLYr+4sxOadsdYGZVD13ickvaG85+UbOch1tTcc5h7qVKn8qAj+hUyIso60EN3aH0SpUPPIoM4e2FriFhi0WoDKk3uQfMzlsM5NUjwmvhbN1kVUTKn45BU0FcgIqqYtyVDsvrs4zGNcN/EPOQyvw4lcDaqU4y1D7zLD4mINamRlo+D55V7qYgto3LkKLVwb4FWqFzQS0DMnz9Rm4yCOd0PFp1oCWTglCw/ckl6A79wyozZJJqGUny+ONEaA0mfkIlZ0RICNwzSojtcCra9/gkmUGaoGhMEtwh3mrQ2oucQEuGd55WVqCS4Ky7SFc0i0No3DJqOw4AxfMFR64/dJ+du9nxQoc+khfSHZdm0zm4Mw3BmSP09yEQy9kr2iYv2FHq49HCUx9gSNjso8HjnjkgEHYZS7NDEoTPbDn8zL7xptfs3xZN2HdFHuj0lTHBaZt1HGi94O0ED3PjAmremLSUqxvDVYNSjvjltqTm6j3RWHsJDQZ5SrvjGldmSbS81BbJU9HRcfhC2SlBJXi9YBoCl3urX5Ga9NZ1K+dx0Vfx+tu1JRms9ivtJDmT3SPilXB4X6sMb6cwrasWZxu9JgMPw2KLYefdZEzqEuS3ECN8TgSCIl9sXOdniGv/1QyHvb1DXnUvz/+AgMhvuqtNknSAAAAAElFTkSuQmCC');
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
      .btn{
        width: 6.28rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        font-weight: bold;
        margin: .58rem auto .27rem;
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
        font-size: .24rem;
        color: rgba(255,255,255,.6);
        letter-spacing: 0;
        text-align: center;

      }
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

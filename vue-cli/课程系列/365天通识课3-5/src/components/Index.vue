<template>
  <div content="index">
    <div class="container">
      <div class="head">
        <img src="../assets/imgs/index_hd.png" alt="365通识课" class="head_img">
        <div class="collage_box" v-show="!direct_buy">
          <p class="collage_title">奇妙世界365问</p>
          <p class="collage_info">¥45.9<span>三人团</span><span v-show="has_group" class="join_num">{{suc_num}}人正在学习！</span></p>
          <p class="collage_desc">365个视频涵盖动物、植物、宇宙、人文、人体五大主题，
            每天学习一个知识点，轻松掌握“十万个为什么”</p>
          <div v-if="!has_group" class="default_content">
            <ul>
              <li v-for="item in defaultArr">
                <img v-if="item" :src="item">
              </li>
            </ul>
            <span class="default_join_num">{{suc_num}}人正在学习！</span>
          </div>
          <div v-else class="group_content">
            <img v-if="is_self&&is_full" src="../assets/imgs/title_suc.png" class="title_suc">
            <p v-else-if="!is_self&&is_full" class="title_full">此团已满</p>
            <p v-else class="title_ing">还差{{xNum}}人拼团成功，剩余 <span>{{hour}}:{{minute}}:{{sister}}</span></p>
            <ul>
              <li v-for="item in memberArr" class="ing">
                <img class="h_img" v-if="item.head_img" :src="item.head_img">
                <div class="h_img" v-else></div>
              </li>
            </ul>
          </div>
        </div>
        <div class="nav_wrap_fixed" v-show="showNavTop">
          <nav>
            <div :class="nav_index==1?'nav_li active':'nav_li'" @click="switchNav(1)">课程介绍</div>
            <div :class="nav_index==2?'nav_li active':'nav_li'" @click="switchNav(2)">课程目录</div>
            <div :class="nav_index==3?'nav_li active':'nav_li'" @click="switchNav(3)">上课须知</div>
          </nav>
        </div>
        <div class="index_content" id="index_content">
          <nav id="nav_wrap">
            <div :class="nav_index==1?'nav_li active':'nav_li'" @click="nav_index=1">课程介绍</div>
            <div :class="nav_index==2?'nav_li active':'nav_li'" @click="nav_index=2">课程目录</div>
            <div :class="nav_index==3?'nav_li active':'nav_li'" @click="nav_index=3">上课须知</div>
          </nav>
          <div class="content">
            <div class="con_left" v-if="nav_index==1">
              <img src="../assets/imgs/index_info1.png" alt="">
            </div>
            <div class="con_mid" v-else-if="nav_index==2">
              <img class="mid_img1" src="../assets/imgs/index_info2_1.png" alt="">
              <img class="mid_img2" src="../assets/imgs/index_info2_2.png" alt="">
            </div>
            <div class="con_right" v-else>
              <div class="right_img_wrap">
                <img src="../assets/imgs/index_info3.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <footer v-show="!direct_buy&&!selfSuc&&!has_group">
        <div class="original" @click="buy()">￥139.00<br><span>原价购买</span></div>
        <div class="discount" @click="join()">
          <span class="price">¥45.90</span>
          <div>3人拼团<br><span>￥139.00</span></div>
        </div>
      </footer>
      <footer v-show="!direct_buy&&!selfHasGroup&&has_group&&!is_full">
        <div class="original" @click="buy()">￥139.00<br><span>原价购买</span></div>
        <div class="discount" @click="join()">
          <span class="price price_join">立即参团 ¥45.90</span>
          <div>3人拼团<br><span>￥139.00</span></div>
        </div>
      </footer> -->
      <div class="ft2" v-show="direct_buy" @click="toStudy()">已购买 立即开始学习</div>
      <div class="ft2" v-show="!direct_buy&&selfSuc" @click="toStudy()">拼团成功 开始学习</div>
      <div class="ft2" v-show="!direct_buy&&!selfSuc">活动已结束</div>

      <!-- <div class="ft2" v-show="!direct_buy&&selfHasGroup&&!is_full&&!selfSuc" @click="invite()">邀请好友参团</div>
      <div class="ft2" v-show="!direct_buy&&!selfSuc&&selfHasGroup&&!is_self" @click="backSelf()">拼团中... ...</div>
      <div class="ft2" v-show="!direct_buy&&!selfHasGroup&&is_full" @click="backSelf()">发起新团</div> -->
    </div>
    <eject :message="ejectText" :showState="ejectStatus"></eject>
    <div class="share_wrap" v-show="showShare" @click="showShare=false">
      <div class="arrow"></div>
      <div class="share">
        <p>距结束还剩 <span class="time">{{hour}}:{{minute}}:{{sister}}</span></p>
        <p>还差<span>{{xNum}}</span>人，快邀请好友拼团吧！</p>
        <div class="icon_a"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import Eject from './Eject'
  import Hv from './Hv'
  export default {
    name: 'Index',
    components: {
      eject: Eject,
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
        has_group:false,
        defaultArr:[
          'https://cdn2.txbimg.com/avatar/001/10/00/05_avatar_big.jpg',
          'https://cdn2.txbimg.com/avatar/001/00/00/12/bc15_200.jpg',
          'https://cdn2.txbimg.com/avatar/001/10/00/00_avatar_big.jpg',
          'https://cdn2.txbimg.com/avatar/001/00/00/10_avatar_big.jpg',
          'https://cdn2.txbimg.com/avatar/001/10/00/06_avatar_big.jpg',
        ],
        showNavTop:false,
        hour:'00',
        minute:'00',
        sister:'00',
        end_time:0,
        is_self:1,
        selfHasGroup: 0,
        selfSuc:0,
        xNum:2,
        memberArr:[],
        showShare:false
      }
    },
    created(){
    },
    mounted(){
      this.getCollageInfo();
      this.getMemberInfo();
      this.getOriginalInfo();
      this.$nextTick(function () {
        let wrap = document.getElementById("index_content"),_this=this;
        // this.$common.fixTop(wrap)
        document.onscroll = function () {
          let st = document.body.scrollTop || document.documentElement.scrollTop;
          if(st>=wrap.offsetTop){
            _this.showNavTop = true;
          }else {
            _this.showNavTop = false;
          }
        }
      })
    },
    methods:{
      backSelf(){
        window.location.href = 'index.html#/'
      },
      switchNav(ind){
        this.nav_index = ind;
        let wrap = document.getElementById("index_content");
        console.log(wrap.offsetTop)
        document.body.scrollTo(0,wrap.offsetTop);
        document.documentElement.scrollTo(0,wrap.offsetTop);
      },
      toStudy(){
        this.$router.push({name:'Cata'})
      },
      toPay(){
        this.$router.push({name:'Pay'})
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
        let param = {type:1,member_id:member_id};
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
        let fdObj = {member_id:member_id,openid:openid,phone:ph,goods_num:1,
          total_price:this.goodsObj.original_price,discount_money:this.goodsObj.discount_money,
          money_paid:this.goodsObj.price,goods_name:this.goodsObj.product_name,
          payment_type:3,pay_type:3,trade_type:'JSAPI',is_group:0};
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
        let fd = this.$common.getParam('get', {member_id: member_id,lesson_id:1,course_id:3});
        this.$axios.get(wUrl+'?'+fd).then((res) => {
          if(res.data.code == 200){
        }
      })
      },
      getMemberInfo(){
        let openid = window.localStorage.getItem('extendAbcOpenid')
        let userUrl = this.$common.config.gzhUrl + 'v3/member/passport/get-info';
        let fd = this.$common.getParam('post',{openid:openid});
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
        this.view_member_id = this.$common.VL.getRequest().view_member_id || 0;
        let url = this.$common.config.gzhUrl + 'v3/group/month-card/group'
        let fd = this.$common.getParam('get',{member_id:member_id,view_member_id:view_member_id})
        let _this = this;
        this.$axios.get(url+'?'+fd).then((res) => {
          if(res.data.code == 200){
            let da = res.data.data
            let my_group = da.my_group
            let conf = da.conf;
            let view_self = da.view_self
            _this.is_self = da.view_self
            let view_group = {}
            _this.direct_buy = da.has_direct_buy
            _this.suc_num = conf.member_join_num
            sessionStorage.setItem('gkSucNum',conf.member_join_num);
            if(!_this.direct_buy){
                if(view_self){
                    view_group = da.my_group;
                }else {
                    view_group = da.view_group;
                }
                if(view_group.has_group){
                    _this.selfSuc = da.my_group.is_full;
                    _this.selfHasGroup = da.my_group.has_group;
                    _this.has_group = view_group.has_group
                    _this.is_full = view_group.is_full;
                if(!_this.is_full){
                    _this.endTime = view_group.end_time
                    _this.showTime();
                }else {

                }
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
                }
                }
            }
            _this.shareConfig();
        }
      })
      },
      invite(){
        console.log('邀请')
        this.showShare = true
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
          title:'孩子超爱的科普课——奇妙世界365问',
          desc: '大千世界的365个视频，天天都有新知识',
          imgUrl: 'https://qnfile.abctime.com/extend/gk/gk_share.png',
        };
        let vid = this.$common.VL.getRequest().view_member_id
        if(vid > 0){
          if(this.has_group){
            link = window.location.origin + '/extend/gk/index.html?view_member_id=' + vid
          }else {
            link = window.location.origin + '/extend/gk/index.html?view_member_id=' + member_id
          }
        }else {
          link = window.location.origin + '/extend/gk/index.html?view_member_id=' + member_id
        }
        console.log(this.haveGroup)
        if(this.has_group && this.xNum > 0){
          configObj.title = '仅差' + this.xNum + '人拼团成功！孩子超爱的科普课——奇妙世界365问'
          configObj.desc = '大千世界的365个视频，天天都有新知识'
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
    background: #309C37;
    position: relative;
    .head{
      position: relative;
      .head_img{
        width: 100%;
        height: 5.32rem;
        z-index: 1;
      }
      .collage_box{
        width: 6.4rem;
        padding: 0 .4rem .4rem;
        margin: 0 auto .2rem;
        background: #FFFFFF;
        box-shadow: 0 .02rem .08rem 0 rgba(120,120,120,.5);
        border-radius: .2rem;
        text-align: left;
        .collage_title{
          font-family: HiraginoSansGB-W6;
          font-weight: bold;
          font-size: .4rem;
          color: #1D1D1D;
          letter-spacing: .018rem;
          padding-top: .24rem;
        }
        .collage_info{
          font-family: HiraginoSansGB-W6;
          font-size: .44rem;
          color: #E02E24;
          letter-spacing: .02rem;
          position: relative;
          span{
            font-family: HiraginoSansGB-W3;
            font-size: .24rem;
            color: #6A6A6A;
            letter-spacing: 0;
            padding-left: .2rem;
          }
          .join_num{
            font-family: PingFangSC-Regular;
            font-size: .28rem;
            color: #E02E24;
            letter-spacing: 0;
            position: absolute;
            right: 0;
            top: .16rem;
          }
        }
        .collage_desc{
          font-family: HiraginoSansGB-W3;
          font-size: .22rem;
          color: #858585;
          letter-spacing: .015rem;
          line-height: .36rem;
        }
        .default_content{
          text-align: left;
          margin: auto;
          position: relative;
          ul{
            display: inline-block;
            margin: .3rem auto 0;
            li{
              width: .8rem;
              height: .8rem;
              background: url('../assets/images/collage_member_bg.png') no-repeat;
              background-size: cover;
              display: inline-block;
              float: right;
              margin-right: -.3rem;
              position: relative;
              img{
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                border: .04rem solid #FFF;
                box-shadow: 0 .02rem .06rem 0 #CFD0D2;
                margin: -.04rem 0 0 -.04rem;
              }
            }
          }
          .default_join_num{
            font-family: PingFangSC-Regular;
            font-size: .28rem;
            color: #E02E24;
            letter-spacing: 0;
            text-align: center;
            position: absolute;
            right: 0;
            top: .5rem;
          }
        }

        .group_content{
          .title_suc{
            width: 1.68rem;
            height: auto;
            margin: .2rem auto;
          }
          .title_full{
            font-family: PingFangSC-Regular;
            font-size: .28rem;
            color: #E02E24;
            letter-spacing: 0;
            text-align: center;
            padding: .4rem 0;
          }
          .title_ing{
            font-family: PingFangSC-Regular;
            font-size: .28rem;
            color: #333;
            letter-spacing: 0;
            text-align: center;
            padding: .4rem 0;
            span{
              color: #FF1961;
            }
          }
          ul{
            margin: auto;
            /*display: inline-flex;*/
            font-size: 0;
            text-align: center;
            li{
              display: inline-block;
              vertical-align: top;
              width: 1.1rem;
              height: 1.1rem;
              background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAC0UExURUxpcf+axv/////////+//////+RxP/G4P////+Nvv////+Owf+Iu//6/P////+XxP+axf+XxP/Z6v+Ww//2+/////+Twf/////7/f/////7/f+axv////+Zxf+dx/+jzP+mzf/B3v/A3P+nzP/H4P+82f+92f////+Bt//x+P+y0//k8P/W6P+82v/6/P+JvP+Euf/+//+nzf/N4//2+v/s9P+QwP+cx/+XxP/d7P+gyf/I4FSg/boAAAAndFJOUwBeKxCuUw0Ex/eBIP0y4k202+DwGxfrv2KY3YrzgsU6oivs652Cs0gpiGYAAANDSURBVFjDrVlpc6JAEAWDCohnDDH3tbvTXHLIqf//f+0gJCURmAbmfaJK69E908frRhDaMVm+rP5J8uPz86eir/+OboQhuBtLNgCYJIdDn2xCfGm8nPRie9stKI1xNE/WmdA3rCzMH/ae9rrsyjZ9UcAg9YgSgOR+1Ilv/gUQW6QJkUN9l+f4o5OJldg+YUF+w3mrEiQMdz1j84mPWD6SuaCJLPNWcEQTEiMAe9zOp4N3IB1AL+6hjU8yW+62CdK0kU8mfki6Q5408vWDrczq/e3JR46g1Ng4XVt9CcMU9OtzXEHal5AYiXUVPSJ4vS08Y/vL4c9u8XeNRdVplRhkINRKfSEc8HFBKA+nC4OL2JnzMDCFp58b2fAgtEH5vpeXsq8NxNH8bgpK3h554L7gW0Ls8yEkhQzYOQdOfGR3JlwQblhwC+rLjB4j/udHdobIzSxeUUJ2XfUdjwolSJnlyAKdRjWzi9D66SVm4AIzunwPJjRoWFHtFDInDMBlvfzovglPLELDg6yw1GWauCcjWvpPrByNf5qRwzzvsfAaZyyPg/IpQBCq7Es2ojJgqMvslJI61FaTfSlURQho9UZFO9tAayM8o/kwfRE8LOEJMEXTp4SbDFMMI48VXUUcgiY0jw9VA2OMH3vzS9ABI0ECbNuRhDVkmCsJkG1HFd7NYSLpKvVGqP/tsW8dCTcoPvcnodl9DxM1FoCL6RTmaYppAXkexwfUe3Vkk0KnZ96kPsyAF2EC+eg30SDiRBhuzvrrFVGIO0mRJXDzudyZbHjxlXIOmSyoNOGn2amwcWSuot2/EO25ieFQwlNlJN2a7tBJKoDKPmM9PHT+VGa9mQZ8h0dBPA48xe3vgXlg0alZ3zwMmBut2uVN3yXGPqlbOZzXLKHZ5yCPoDTs1Ka3kPYIx4PSuKObKRB3t1FqWclO9O6D7kP7eq5T9BiH2nipYoueJf2TC5stamVqpxhpRDUyZmWaz6e3AAm7ExqKiF0TT54Ud99Glf8oz6ddFuPi/VkJW9fKJ3JSKrc7LsZz3OwWdDTxklLI+aFRBP0BQHvv+Y3h7l2HUjHT4baQ2b60Evt9XPj+/DEfq5L86Hqaoqtj9ueP/xa//iKAka7RAAAAAElFTkSuQmCC');
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
                  width: .65rem;
                  height: .36rem;
                  line-height: .36rem;
                  background: #FFCA4D;
                  box-shadow: 0 .02rem 0 0 #D18E1A;
                  border-radius: 1rem;
                  font-family: PingFangSC-Semibold;
                  font-weight: bold;
                  font-size: .22rem;
                  color: #FFF;
                  letter-spacing: 0;
                  position: relative;
                  z-index: 11;
                  white-space: nowrap;
                  margin: -.2rem 0 0 .55rem;
                }
              }
              img{
                width: 1.1rem;
                height: 1.1rem;
                border-radius: 50%;
                position: absolute;
                /*border: .02rem solid #fff;*/
                top: 0;
                left: 0;
                box-shadow: 0 .02rem .06rem 0 #CFD0D2;
              }
            }
          }
        }
      }
      .nav_wrap_fixed{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 1.05rem;
        background: #FFDF00;
        z-index: 1001;
        nav{
          width: 5.52rem;
          height: .6rem;
          margin: auto;
          padding-top: .45rem;
          display: flex;
          .nav_li{
            flex: 1;
            font-family: FZY4JW--GB1-0;
            font-size: .36rem;
            color: rgba(176,102,0,.7);
            letter-spacing: 0;
            text-align: center;
            position: relative;
            &.active{
              color: #B06600;
              &::before{
                content: '';
                width: 1.7rem;
                height: .08rem;
                background: rgba(255,255,255,.7);
                border-radius: .03rem;
                position: absolute;
                bottom: 0;
                left: 50%;
                margin-left: -.85rem;
              }
            }
          }
        }
      }
      .index_content{
        width: 7rem;
        min-height: .6rem;
        margin: auto;
        /*margin-top: -.24rem;*/
        padding: .4rem 0 1.4rem 0;
        background: url('../assets/imgs/index_nav_bg.png') no-repeat;
        background-size: 100% auto;
        position: relative;
        z-index: 2;
        nav{
          width: 5.52rem;
          height: .6rem;
          margin: auto;
          /*background: url('../assets/imgs/index_con_bg.png');*/
          /*background-size: cover;*/
          display: flex;
          .nav_li{
            flex: 1;
            font-family: FZY4JW--GB1-0;
            font-size: .36rem;
            color: rgba(176,102,0,.7);
            letter-spacing: 0;
            text-align: center;
            position: relative;
            &.active{
              color: #B06600;
              &::before{
                content: '';
                width: 1.7rem;
                height: .08rem;
                background: rgba(255,255,255,.7);
                border-radius: .03rem;
                position: absolute;
                bottom: 0;
                left: 50%;
                margin-left: -.85rem;
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
      }
    }
    &.blur{
      -webkit-filter: blur(2px);
      filter: blur(2px);
    }
    .content{
      background: #fff;
      box-shadow: 0 .04rem 0 0 rgba(0,0,0,.3);
      border-radius: 0 0 .4rem .4rem;
      .con_left{
        img{
          width: 7rem;
          height: auto;
        }
        padding: .7rem 0 .4rem 0;
      }
      .con_mid{
        .mid_img1{
          width: 6.2rem;
          height: 8.72rem;
        }
        .mid_img2{
          margin: .45rem 0 0 -.07rem;
          width: 7.14rem;
          height: auto;
        }
        padding: .55rem 0 .4rem 0;
      }
      .con_right{
        .right_img_wrap{
          background: #fff;
          width: 6.08rem;
          height: 9.15rem;
          margin: auto;
          /*box-shadow: .04rem .03rem .07rem 0 rgba(0,0,0,0.10);*/
          border-radius: .15rem;
          img{
            width: 5.69rem;
            height: 8.75rem;
            margin: .1rem auto;
          }
        }
        padding: .55rem 0 .4rem 0;
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
      z-index: 101;
      .original{
        display: inline-block;
        width: 1.8rem;
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
        width: 5.7rem;
        height: 1rem;
        background-image: linear-gradient(131deg, #FFCB1D 0%, #FF4C4C 100%);
        box-shadow: 0 .03 .18rem 0 rgba(26,62,21,.5);
        border-radius: .5rem 0 0 .5rem;
        font-family: PingFangSC-Semibold;
        font-size: .4rem;
        color: #FFFFFF;
        letter-spacing: 0;
        .price{
          font-family: PingFangSC-Semibold;
          font-weight: bold;
          display: inline-block;
          width: 4.4rem;
          font-size: .56rem;
          text-align: center;
          &.price_join{
            font-size: .48rem;
          }
        }
        div{
          position: absolute;
          top: 0;
          right: .2rem;
          font-family: PingFangSC-Regular;
          font-size: .24rem;
          color: #FFFFFF;
          line-height: 1;
          padding: .24rem .1rem;
          span{
            text-decoration: line-through;
            line-height: 1.8;
          }
        }
      }
    }
    .ft2{
      width: 6.28rem;
      height: 1rem;
      line-height: 1rem;
      position: fixed;
      bottom: .16rem;
      left: calc(~'50% - 3.14rem');
      z-index: 11;
      color: #FFF;
      background-image: linear-gradient(131deg, #FFCB1D 0%, #FF4C4C 100%);
      box-shadow: 0 .03rem .18rem 0 rgba(26,62,21,.5);
      border-radius: .5rem;
      font-family: PingFangSC-Semibold;
      font-weight: bold;
      font-size: .4rem;
      letter-spacing: 0;
      text-align: center;
    }
  }
  .share_wrap{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.6);
    z-index: 1002;
    .arrow{
      width: 2.19rem;
      height: 1.89rem;
      background: url('../assets/imgs/icon_arrow.png');
      background-size: cover;
      position: absolute;
      right: .5rem;
      top: .4rem;
    }
    .share{
      display: inline-block;
      padding: .4rem 0;
      margin: 2.5rem auto;
      background: #FFFFFF;
      box-shadow: 0 .02rem .08rem 0 rgba(0,0,0,0.5);
      border-radius: .2rem;
      position: relative;
      p{
        font-family: FZY4JW--GB1-0;
        font-size: .36rem;
        color: #474747;
        letter-spacing: .045rem;
        line-height: .42rem;
        padding: 0 .2rem .3rem;
        span{
          color: #FFC100;
          &.time{
            padding-left: .4rem;
          }
        }
      }
      .icon_a{
        width: 1.65rem;
        height: 1.9rem;
        background: url('../assets/imgs/icon_a.png');
        background-size: cover;
        position: absolute;
        right: -.6rem;
        bottom: -1.2rem;
      }
    }
  }
</style>

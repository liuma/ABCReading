<template>
  <div content="index" id="index_wrap">
    <div class="container">
      <div class="head">
        <div class="video_box">
            <div class="video_wrap">
                <div class="video" id="video">
                </div>
            </div>
        </div>
        <div class="lesson_info">
            <p class="lesson_name">{{lessonData.name}}</p>
            <ul class="tips_ul">
                <li v-for="item in lessonData.tips" :key="item">{{item}}</li>
            </ul>
            <p class="lesson_desc">{{lessonData.desc}}</p>
            <!-- <img v-if="direct_buy||selfSuc" class="lesson_suc_tag" src="../assets/imgs/lesson_suc_tag.png" > -->
            <div class="lesson_price">
                <div>¥<span class="group_price">29</span>.90
                    <span class="direct_price">99.00</span>
                    <div class="group_tag"></div>
                </div>
            </div>
            <span v-show="direct_buy || selfSuc" class="suc_num2">{{suc_num}}人正在学习</span>
            <div class="study_box">
                <img v-if="direct_buy" class="lesson_suc_tag" src="../assets/imgs/lesson_suc_tag.png" >
                <img v-if="selfSuc" class="lesson_suc_tag" src="../assets/imgs/lesson_suc_group_tag.png" >
                <ul v-if="selfSuc && is_self" class="group_heads">
                    <li v-for="item in memberArr">  
                        <img :src="item.head_img">
                    </li>
                </ul>
                <ul v-show="!direct_buy && !selfSuc" class="study_heads">
                    <li v-for="item in defaultArr">
                        <img v-if="item" :src="item">
                    </li>
                </ul>
                <span v-show="!direct_buy && !selfSuc" class="suc_num">{{suc_num}}人正在学习</span>
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
            <div :class="nav_index==1?'nav_li active':'nav_li'" @click="switchNav(1)">课程介绍</div>
            <div :class="nav_index==2?'nav_li active':'nav_li'" @click="switchNav(2)">课程目录</div>
            <div :class="nav_index==3?'nav_li active':'nav_li'" @click="switchNav(3)">上课须知</div>
          </nav>
          <div class="content">
            <div id="con1">
                <img src="../assets/imgs/index_info1_1.png">
                <img src="../assets/imgs/index_info1_2.png">
                <img src="../assets/imgs/index_info1_3.png">
                <img src="../assets/imgs/index_info1_4.png">
            </div>
            <div id="con2">
                <img class="mid_img1" src="../assets/imgs/index_info2.png">
            </div>
            <div id="con3">
                <img src="../assets/imgs/index_info3.png">
            </div>
          </div>
        </div>
      </div>
      <!-- 默认 -->
      <div class="init_ft" v-show="!direct_buy&&!selfSuc&&!has_group">
        <div class="original" @click="buy()">￥99.00<div>原价购买</div></div>
        <div class="discount" @click="join()">
          <span class="price">立即参团¥29.90</span>
          <div>3人拼团 原价<span>￥99.00</span></div>
        </div>
      </div>
      <!-- 购买成功（直接购买||拼团成功） -->
      <div class="study_btn" v-show="direct_buy||selfSuc" @click="toStudy()">开始学习</div>
      <!-- 未购买，点击别人团 -->
      <div class="ft2" v-show="!direct_buy&&!selfHasGroup&&has_group">
          <div v-if="!is_full">
            <p class="txt_ing">拼团中...</p>
            <p class="txt_num">还差<span>{{xNum}}</span>人拼团成功，剩余 <span>{{hour}}:{{minute}}:{{sister}}</span></p>
          </div>
          <div v-else>
            <p class="txt_ing">此团已满</p>
          </div>
          <!-- 团信息 -->
          <ul>
              <li v-for="item in memberArr" class="ing">
                <img class="h_img" v-if="item.head_img" :src="item.head_img">
                <div class="h_img" v-else></div>
              </li>
          </ul>
          <div v-if="!is_full" class="btn join_btn" @click="join()">立即参团29.90</div>
          <div v-else class="btn join_btn" @click="backSelf()">发起新团</div>
          <div class="direct_btn" @click="buy()">原价购买 ￥99.00</div>
      </div>
      <!-- 已购买，未满 -->
      <div class="ft2" v-show="!direct_buy&&selfHasGroup&&!is_full&&!selfSuc">
          <div>
            <p class="txt_ing">拼团中...</p>
            <p class="txt_num">还差<span>{{xNum}}</span>人拼团成功，剩余 <span>{{hour}}:{{minute}}:{{sister}}</span></p>
          </div>
          <!-- 团信息 -->
          <ul>
              <li v-for="item in memberArr" class="ing">
                <img class="h_img" v-if="item.head_img" :src="item.head_img">
                <div class="h_img" v-else></div>
              </li>
          </ul>
          <div v-if="is_self" class="btn" @click="invite()">邀请好友参团</div>
          <div v-else class="btn" @click="backSelf()">返回自己的团</div>
      </div>
      <!-- 有团，进入了别人团 -->
      <!-- <div class="ft2" v-show="!direct_buy&&!selfSuc&&selfHasGroup&&!is_self" @click="backSelf()">拼团中... ...</div> -->
      <!-- 无团，团已满 -->
      <!-- <div class="ft2" v-show="!direct_buy&&!selfHasGroup&&is_full" @click="backSelf()">发起新团</div> -->
      <!--<div class="ft2" v-show="!is_full&&groupIng" @click="toPay()">拼团中...</div>-->
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
import { setInterval } from 'timers';
  export default {
    name: 'Index',
    components: {
      eject: Eject,
    },
    data(){
      return{
        lessonData:{
            name: '逻辑思维课',
            desc:'用成语故事打开思维的大门',
            tips:['4-12岁','15个成语故事']
        },
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
        showShare:false,
        vid:'',
        canPay:true,
        configData:{
            title:'用成语故事打开思维的大门',
            desc: '活跃思维，告别单一思考方式；了解成语故事，开拓视野；积累素材，提升阅读写作能力。',
            imgUrl: 'https://qnfile.abctime.com/extend/list_share9.png',
        },
        lessonUrl: '/extend/ljsw/index.html',
      }
    },
    created(){
    },
    mounted(){
      this.getCollageInfo();
      this.getMemberInfo();
      this.getOriginalInfo();
      this.$nextTick(function () {
        let wrap = document.getElementById("index_content"),index_wrap = document.getElementById("index_wrap"),_this=this;
        document.onscroll = function () {
          let st = document.body.scrollTop || document.documentElement.scrollTop;
          if(st>=wrap.offsetTop){
            _this.showNavTop = true;
            let con1 = document.getElementById("con1"),con2 = document.getElementById("con2"),nav = document.getElementById("nav_wrap");
            if(st >= wrap.offsetTop+con1.offsetHeight && st <= wrap.offsetTop+con1.offsetHeight+con2.offsetHeight){
                _this.nav_index = 2;
            }else if(st >= wrap.offsetTop+con1.offsetHeight+con2.offsetHeight){
                _this.nav_index = 3;
            }else{
                _this.nav_index = 1;
            }
          }else {
            _this.showNavTop = false;
          }
        }
      });
      this.setSrc()
    },
    methods:{
      setSrc(){
        let videoScript= document.createElement("script"),_this=this;
        videoScript.type = "text/javascript";
        videoScript.src = this.vid.replace(/\s+/g,"");
        document.getElementById('video').appendChild(videoScript);
        this.intervalTimer = setInterval(() => {
          if(document.querySelector('video')){
            document.querySelector('video').addEventListener('play',function(){
              _this.activeLesson(1)
            });
            clearInterval(this.intervalTimer);
          }
        }, 100)
      },
      backSelf(){
        window.location.href = 'index.html#/'
        if(this.canTap){
          let ph = window.localStorage.getItem('extendAbcPhone');
          if(!ph){
            this.$router.push({name:'Login',query:{buy:2}})
          }else {
            this.$router.push({name:'Pay',query:{type:1}})
          }
        }
      },
      switchNav(ind){
        this.nav_index = ind;
        let wrap = document.getElementById("index_content"),_this=this;
        let content = document.getElementById("con"+ind);
        let nav = document.getElementById("nav_wrap");
        // content.scrollIntoView()
        document.body.scrollTop = wrap.offsetTop+content.offsetTop-nav.offsetHeight
        document.documentElement.scrollTop = wrap.offsetTop+content.offsetTop-nav.offsetHeight
        // document.documentElement.scrollTo(0,wrap.offsetTop+content.offsetTop-nav.offsetHeight);  
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
        if(this.canTap && this.canPay){
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
        this.canPay = false;
        let _that = this;
        setInterval(function(){
            _that.canPay = true
        },1500);
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
        let fd = this.$common.getParam('get', {member_id: member_id,lesson_id:1,course_id:4});
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
          if(conf.head_imgs && conf.head_imgs.length>0){
            _this.defaultArr = conf.head_imgs
          }
          let view_group = {}
          _this.direct_buy = da.has_direct_buy
          _this.suc_num = conf.member_join_num
          _this.vid = da.course_default_mp4
          _this.setSrc()
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
        }else if(res.data.code == 309){
            window.localStorage.clear();
            window.location.reload();    
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
          title: this.configData.title,
          desc: this.configData.desc,
          imgUrl: this.configData.imgUrl,
        };
        let vid = this.$common.VL.getRequest().view_member_id
        if(vid > 0){
          if(this.has_group){
            link = window.location.origin + this.lessonUrl + '?view_member_id=' + vid
          }else {
            link = window.location.origin + this.lessonUrl + '?view_member_id=' + member_id
          }
        }else {
          link = window.location.origin + this.lessonUrl + '?view_member_id=' + member_id
        }
        console.log(this.haveGroup)
        if(this.has_group && this.xNum > 0){
          configObj.title = '仅差' + this.xNum + '人拼团成功！' + this.configData.title
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
                _this.showShare = false
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
                _this.showShare = false
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
    background: #FCFCFC;
    position: relative;
    .head{
      position: relative;
      .video_box{
          width: 100%;
          height: 5.94rem;
          padding-top: 1.8rem;
          background: url('../assets/imgs/index_head.png');
          background-size: cover;
          .video_wrap{
              width: 100%;
              height: 4.22rem;
              background: #000;
              .video{
                  width: 100%;
                  height: 100%;
                  border-radius: .24rem;
              }
          }
      }
      .lesson_info{
        width: 100vw;
        background: #FFF;
        box-shadow: 0 .02rem .06rem 0 rgba(0,0,0,.1);
        text-align: left;
        margin-bottom: .28rem;
        position: relative;
        .lesson_name{
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            font-size: .48rem;
            color: #333;
            padding-left: .32rem;
        }
        .lesson_desc{
            font-family: PingFangSC-Regular;
            font-size: .24rem;
            color: #999;
            padding-left: .32rem;
        }
        .lesson_suc_tag{
            display: inline-block;
            width: 2.79rem;
            height: .67rem;
            margin: .2rem 0 .3rem .32rem;
        }
        .tips_ul{
            padding: .04rem 0 .16rem .32rem;
            li{
                font-size: .2rem;
                display: inline-block;
                height: .26rem;
                line-height: 1;
                padding:  .06rem .16rem 0;
                background: #FFCB9C;
                border-radius: .08rem;
                margin-right: .08rem;
                color: #fff;
            }
        }
        .lesson_price{
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            font-size: .4rem;
            color: #FF574D;
            letter-spacing: 0;
            padding-left: .36rem;
            letter-spacing: .03rem;
            padding-bottom: .3rem;
            .group_price{
                font-size: .6rem;
            }
            .direct_price{
                font-family: PingFangSC-Regular;
                font-weight: normal;
                font-size: .28rem;
                color: #999;
                text-decoration: line-through;
                letter-spacing: 0;
                padding: 0 .2rem 0 0;
            }
            .group_tag{
                display: inline-block;
                width: 1.25rem;
                height: .38rem;
                background: url('../assets/imgs/collage_tag.png');
                background-size: cover;
            }
        }
        .suc_num2{
            font-family: PingFangSC-Regular;
                font-size: .28rem;
                color: #51AA35;
                letter-spacing: 0;
                position: absolute;
                right: .4rem;
                top: .68rem;
        }
        .study_box{
            position: relative;
            width: 100vw;
            border-top: .02rem solid #DDD;
            .study_heads{
                width: 4.18rem;
                height: .9rem;
                padding: 0 .3rem;
                line-height: .9rem;
                display: inline-block;
                margin: .16rem auto;
                background-image: linear-gradient(to right, #FFFFFF 80%, rgba(170,170,170,.2) 100%);
                border-radius: .45rem;
                li{
                    width: .6rem;
                    height: .6rem;
                    display: inline-block;
                    vertical-align: top;
                    float: right;
                    margin: .15rem -.08rem 0 0;
                    position: relative;
                    img{
                        width: .6rem;
                        height: .6rem;
                        border-radius: 50%;
                        background: rgba(255,255,255,.2);
                        border: .02rem solid #FFFFFF;
                        box-shadow: .02rem .01rem .04rem 0 rgba(0,0,0,0.10);
                    }
                }
            }
            .suc_num{
                font-family: PingFangSC-Regular;
                font-size: .28rem;
                color: #51AA35;
                letter-spacing: 0;
                position: absolute;
                right: .32rem;
                top: .38rem;
            }
            .group_heads{
                position: absolute;
                top: 0;
                right: .32rem;
                li{
                    width: .64rem;
                    height: .64rem;
                    display: inline-block;
                    vertical-align: top;
                    margin: .32rem .08rem;
                    position: relative;
                    img{
                        width: .64rem;
                        height: .64rem;
                        border-radius: 50%;
                        background: rgba(255,255,255,.2);
                        border: .02rem solid #FFFFFF;
                        box-shadow: .02rem .01rem .04rem 0 rgba(0,0,0,0.10);
                    }
                    &:nth-child(1){
                        &::before{
                            display:inline-block;
                            content: '团长';
                            width: .64rem;
                            height: .22rem;
                            text-align: center;
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
                            padding: .01rem 0;
                            position: absolute;
                            left: 0;
                            top: .46rem;
                            z-index: 11;
                            white-space: nowrap;
                        }
                    }   
                }
            }
        }
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
        height: .96rem;
        line-height: .96rem;
        background: #fff;
        z-index: 1001;
        nav{
          width: 6.6rem;
          height: .96rem;
          line-height: .96rem;
          margin: auto;
          /*background: url('../assets/imgs/index_con_bg.png');*/
          /*background-size: cover;*/
          display: flex;
          .nav_li{
            flex: 1;
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            font-size: .32rem;
            color: #999;
            letter-spacing: 0;  
            text-align: center;
            position: relative;
            &.active{
                 color: #333;
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
      .index_content{
        width: 100%;
        min-height: .6rem;
        margin: auto;
        padding-bottom: 1.4rem;
        background: #FFF;
        box-shadow: 0 .02rem .06rem 0 rgba(0,0,0,.1);
        position: relative;
        z-index: 2;
        nav{
          width: 6.6rem;
          height: .96rem;
          line-height: .96rem;
          margin: auto;
          /*background: url('../assets/imgs/index_con_bg.png');*/
          /*background-size: cover;*/
          display: flex;
          .nav_li{
            flex: 1;
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            font-size: .32rem;
            color: #999;
            letter-spacing: 0;  
            text-align: center;
            position: relative;
            &.active{
                 color: #333;
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
    //   box-shadow: 0 .04rem 0 0 rgba(0,0,0,.3);
      border-radius: 0 0 .4rem .4rem;
      img{
          width: 100%;
          height: auto;
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
    .init_ft{
        width: 100vw;
        height: 1rem;
        line-height: 1rem;
        position: fixed;
        bottom: .3rem;
        left: 0;
        z-index: 101;
        .original{
            display: inline-block;
            vertical-align: top;
            width: 1.84rem;
            height: .88rem;
            padding-top: .2rem;
            background: #4E4E4E;
            margin-right: .3rem;
            background-image: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%);
            box-shadow: 0 .04rem .08rem 0 rgba(0,0,0,0.20);
            border-radius: .5rem;
            font-family: PingFangSC-Regular;
            font-size: .32rem;
            color: rgba(255,255,255,.7);
            letter-spacing: 0;
            text-align: center;
            line-height: 1;
            div{
                font-size: .24rem;
                padding-top: .12rem;
            }
        }
        .discount{
            display: inline-block;
            vertical-align: top;
            width: 4.72rem;
            height: .96rem;
            padding-top: .12rem;
            background-image: linear-gradient(90deg, #FFAA6C 0%, #FF564D 100%);
            box-shadow: 0 .04rem .08rem 0 rgba(79,28,24,.3);
            border-radius: .54rem;
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            font-size: .4rem;
            color: #FFFFFF;
            letter-spacing: 0;   
            line-height: 1;  
            div{
                width: 100%;
                // position: absolute;
                // top: 0;
                // left: 0;
                text-align: center;
                font-family: PingFangSC-Regular;
                font-weight: normal;
                font-size: .24rem;
                color: #FFFFFF;
                line-height: 1;
                padding-top: .08rem;
                span{
                    text-decoration: line-through;
                    line-height: 1.8;
                }
            }
        }
    }
    .study_btn{
        width: 6.54rem;
        height: 1.08rem;
        line-height: 1.08rem;
        position: fixed;
        bottom: .26rem;
        left: .48rem;
        z-index: 1001;
        background-image: linear-gradient(90deg, #94D328 0%, #51AA35 100%);
        box-shadow: 0 .02rem .06rem 0 rgba(0,0,0,0.30);
        border-radius: .54rem;
        font-family: PingFangSC-Semibold;
        font-weight: bold;
        font-size: .4rem;
        color: #FFF;
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
        width: 100vw;
        background: #FFFFFF;
        box-shadow: 0 -.02rem .06rem 0 #DDDDDD;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 101;
        padding: .16rem 0 .29rem;
        .txt_ing{
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            font-size: .32rem;
            color: #FF574D;
            letter-spacing: 0;
            text-align: left;
            padding-left: .24rem;
        }
        .txt_num{
            position: absolute;
            top: .22rem;
            right: .32rem;
            font-family: PingFangSC-Regular;
            font-size: .24rem;
            color: #AAA;
            letter-spacing: 0;
            span{
                color: #666;
            }
        }
        ul{
            margin: auto;
            /*display: inline-flex;*/
            font-size: 0;
            text-align: left;
            padding: .22rem 0 0 .08rem;
            li{
              display: inline-block;
              vertical-align: top;
              width: .88rem;
              height: .88rem;
              background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAABLFBMVEUAAADPz8/+/v7w8PD////////S0tL////////////Y2Nj////////////W1tbT09P9/f3U1NTW1tbX19f9/f3Z2dn////V1dX5+fn9/f38/Pz////V1dX////W1tb////////////////////////////V1dXZ2dnV1dXOzs7////p6enX19fY2NjX19fZ2dnj4+P6+vrT09Pj4+Pi4uLW1tbU1NTf39/g4OD7+/vT09Pq6urc3Nzv7+/d3d3Y2Nju7u7f39/u7u7j4+Pu7u7l5eX////Nzc28vLz9/f37+/vt7e3n5+f4+Pji4uLa2trz8/Pv7+/Y2Nj29vbT09PDw8PS0tLp6enV1dX6+vr19fXx8fHk5OTe3t7Jycng4ODc3NzAwMDFxcXQ0NBHiZYvAAAARnRSTlMA/h8DJxX19KlwbVAK2w3v2unOsWBgQiMYEw3v7efjw7ywrJ6YkltFPBP5yMGgelgp9vHwx3tTMwj5+PXx5N63sa+KgHo7BKlx1wAABA5JREFUaN612mlb2kAQB/AJl4IoqNVatdVq61HP3vfd/ocNObhBELXt9/8OTYyPxSoyCcvvBc++4JldJptlshuSeZONzacf7aQMPp1cWXuUzmS2pkiX+MZszoWvzMwOfA4z70wkSYPE47fM/Ac+ZSoEyt0Wl4AnjxNvaBjJ9JI/XKukcI0KPo2Zg8ipyTwrYpASMy/HKIqDFHMXAx1ZjSZWExTW4viR0SpCIEjW+CKFcgdAFWGoz9skdjiJ0Bw25qQXd7amEJpdYf5OEnen2SghgqaL9TgNlH3OtTaiymdpgHv3YZmI7v49ulVsDEN6OndrfAxL1ThDfW0+xdAs5lfUx5bRMDG0Y36e7TM/DT6FBh3k43STF+xCk3W6wQSKJnSZoGsWoFWM/jcJncrvtq+tz1q5vEtXvG5DK9vgTeoRz3EHWlnGDvXY55qCVspEoucHpLgI7VbpUqztQLOrU/UhRuIhXUhiRA4pkMZIlGozFFjCSJjMU+SbKyuIKRNiLr8k3wPpHDW7jd+FQp1dGyLFxgvyTDGbsu/XCxd+OQoiT8izwRVInJ2HZj7vpgKZpL+OWmUIlL2wJ6Xz1onXFGZ1gojGIeJFbVwkRnntOkTGiQgilpce+/JqeD/BhghRFiKV3rwraY46x4fSYs4oFI5xyZutDgS6nKF5iNSvjPlXoWCJEst7tOu2IVAul81/q4yXog4EijxD01xCWH+8WaQgYDe/UI6rCOm04F8QmTVKsYlwHC8+K8isUL4KhI4vH9QkjcETMj8NBamxsB00vfg1yI2FrEmP6vL8e5T7gVYgFqzZdTPEeDhFaxAL1ogu5KqcowfyGy1Y5cqQK/E0zYSpGm2vgyrkVPUb7bEFMdNxHBNhzFPGsDBCMVrESGWJEII6M84UwpD/6XuCdegUYqYaP38+ljvxaxeIWbwXsnh3vQ5ciFV4gzxtS5xWu1Kv2BAKymt58Rue7T4g30t2MSIJkpTX0S1R4GsHo5Ee9UNgcqSPsSYeSjYbo2u1ftKlVWhX5FScLiVsR/dmSI33qccyW5o7OF6OU49NNmzodY+u2OUmtLpDV21/hFaTo97WXLhpY1YXs1KcoBusQxOXp+N0g3i+6EADh427fbffjzG8jrFFfbxiHffbWIz6yhglDC1Gt3g9pmH8g465ojPdpnfMNUA2D9iIpFpjY4EGiq9bRhNRtHj6LknMMrsmwmvPxklmzoiyGT+5QGLbPxBKsQrcCXvkDvGZeLHG7vgihZVYNY2G5GS2ypzapyg2n7FoT/VTJk4RHcy8h+9I4RpVsipFYCmdHPbVkyf+DG911UVc88gOMs/MZ48TpEFyIsdswGezpxE0c7MbU6TL1Nac9/rP2kqe2UgtP0rPx7Ik8xewb6+/uEUVMgAAAABJRU5ErkJggg==');
              background-size: cover;
              position: relative;
              margin: 0 .16rem;
              &.default{
                &::before{
                  display:inline-block;
                  content: '待支付';
                  text-align: center;
                  width: .72rem;
                  height: .22rem;
                  line-height: .22rem;
                  background: #FFAF4C;
                  box-shadow: 0 .02rem 0 0 #D18E1A;
                  border-radius: .11rem;
                  font-family: PingFangSC-Semibold;
                  font-weight: bold;
                  font-size: .16rem;
                  color: #FFF;
                  letter-spacing: 0;
                  position: relative;
                  z-index: 11;
                  white-space: nowrap;
                  margin: .7rem 0 0 .08rem;
                }
              }
              &.ing:nth-child(1),&.suc:nth-child(1){
                &::before{
                  display:inline-block;
                  text-align: center;
                  content: '团长';
                  width: .72rem;
                  height: .22rem;
                  line-height: .22rem;
                  background: #FF5219;
                  box-shadow: 0 .02rem 0 0 #D18E1A;
                  border-radius: .11rem;
                  font-family: PingFangSC-Semibold;
                  font-weight: bold;
                  font-size: .16rem;
                  color: #FFF;
                  letter-spacing: 0;
                  position: relative;
                  z-index: 11;
                  white-space: nowrap;
                  margin: .7rem 0 0 .08rem;
                }
              }
              img{
                width: .88rem;
                height: .88rem;
                border-radius: 50%;
                position: absolute;
                /*border: .02rem solid #fff;*/
                top: 0;
                left: 0;
                box-shadow: 0 .02rem .06rem 0 #CFD0D2;
              }
            }
        }
        .btn{
            width: 3.2rem;
            height: .88rem;
            line-height: .88rem;
            background-image: linear-gradient(90deg, #94D328 0%, #51AA35 100%);
            box-shadow: 0 .02rem .06rem 0 rgba(0,0,0,.3);
            border-radius: .54rem;
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            font-size: .32rem;
            color: #FFF;
            letter-spacing: 0;
            position: absolute;
            bottom: .28rem;
            right: .28rem;
            &.join_btn{
                background-image: linear-gradient(90deg, #FFAA6C 0%, #FF564D 100%);
                box-shadow: 0 .04rem .08rem 0 rgba(79,28,24,0.30);
            }
        }
        .direct_btn{
            width: 2.26rem;
            height: .48rem;
            line-height: .48rem;
            background: #DDD;
            background-image: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%);
            box-shadow: 0 .04rem .08rem 0 rgba(0,0,0,0.20);
            border-radius: .05rem 0 0 0;
            position: absolute;
            right: 0;
            bottom: 100%;
            font-family: PingFangSC-Regular;
            font-size: .24rem;
            color: #FFF;
            letter-spacing: 0;
        }
    }
  }
  .share_wrap{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.6);
    z-index: 100001;
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

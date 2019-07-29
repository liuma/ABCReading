<template>
  <div>
    <div class="collage">
      <div :class="shareStatus||sucTagStatus?'container blur':'container'">
        <img src="../assets/images/collage_banner.png" class="banner">
        <div class="time_box" v-show="!hideTimeout">
           距结束还剩<span>{{hour}}:{{minute}}:{{sister}}</span>
        </div>
        <div class="content_box">
          <p class="title">ABC Reading美国小学图书馆（月卡）</p>
          <div class="info">
            <div class="price">¥{{groupPrice}}<span>¥198</span></div>
            <div class="num"><span>{{suc_num}}</span>人已成团</div>
          </div>
          <p class="desc">含美国原版ReadingA-Z系列绘本，含27个级别，2000+绘本，30天畅读权限</p>
        </div>
        <div class="default_box" v-if="!haveGroup">
          <ul>
            <li v-for="(item,index) in defaultArr" v-if="index<5">
              <img v-if="item" :src="item">
            </li>
          </ul>
          <div>{{suc_num}}人拼团成功！</div>
        </div>
        <div :class="sucStatus && selfNew?'collage_box cen':'collage_box'" v-else>
          <div v-if="sucStatus&&selfNew" class="full_txt">团已满，快去组建自己的队伍吧！</div>
          <div v-if="sucStatus&&!selfNew" class="status suc">拼团成功！</div>
          <div v-if="!sucStatus" class="status">还差<span>{{xNum}}</span>人拼团成功！</div>
          <ul>
            <li v-for="item in memberArr">
              <img class="h_img" v-if="item.head_img" :src="item.head_img">
              <div class="h_img" v-else></div>
              <span class="nickname">{{item.nick_name}}</span>
            </li>
          </ul>
        </div>
        <p class="suc_tips">三人拼团➡️提示成功➡️app登陆（已登陆的重启刷新）</p>
        <img src="https://qnfile.abctime.com/collage/collage_info.png" class="info_pic">
        <div v-if="endStatus" class="btn_box3">啊哦...活动已结束</div>
        <div class="btn_box" v-if="defaultStatus && !endStatus">
          <div class="btn_left" @click="toOrder(1)">
            <p>¥<span>{{directPrice}}</span></p>
            <p>直接购买</p>
          </div>
          <div class="btn_right" v-if="!haveCollage" @click="toOrder(2)">
            <p>¥<span>{{groupPrice}}</span>立即参团</p>
            <div class="icon"></div>
          </div>
          <div class="btn_right" v-else @click="toOrder(2)">
            <p>¥<span>{{groupPrice}}</span>限时3人拼团</p>
            <div class="icon"></div>
          </div>
        </div>
        <div v-show="selfSuc && !defaultStatus && !endStatus" class="btn_box2" @click="toDown">团购成功 立即使用<span class="icon"></span></div>
        <div v-show="selfIng && !defaultStatus && !endStatus" class="btn_box2" @click="backCollage">拼团中...<span class="icon"></span></div>
        <div v-show="selfShare && !defaultStatus && !endStatus" class="btn_box2" @click="showShareToast">邀请好友参团<span class="icon"></span></div>
        <div v-show="selfNew && !defaultStatus && !endStatus" class="btn_box2" @click="toOrder(2,1)">发起新团<span class="icon"></span></div>
      </div>
    </div>
    <div v-show="shareStatus" class='toast_wrap' @click="hideShareToast">
      <div class="arrow"></div>
      <p class="time">
        距结束还剩<span>{{hour}}:{{minute}}:{{sister}}</span>
      </p>
      <p class="num">
        还差<span>{{xNum}}</span>人，快邀请好友拼团吧！
      </p>
      <div class="icon_a"></div>
    </div>
    <div v-show="sucTagStatus" class='suc_wrap' @click="hideSucToast">
      <div class="suc_box">
        <div class="tag2"></div>
        <div class="tag_box">
          <div class="icon_wrap">
            <div class="icon"></div>
          </div>
        </div>
        <p class="t1">支付成功！</p>
        <p class="t2" v-if="type == 2">快快邀请好友一起拼团吧！</p>
        <p class="t2" v-else>下载ABC Reading<br>即可畅读2000+RAZ绘本～</p>
        <div class="btn" @click="showShareToast" v-if="type == 2">邀请好友拼团</div>
        <div class="btn" @click="toDown" v-else>立即畅读</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Collage',
  data(){
    return{
      groupPrice:'9.9',
      directPrice:'38',
      haveGroup: false,
      hideTimeout: true,
      directType:1,
      gouprType:2,
      endStatus: true,
      endTime:0,
      xNum:2,
      sucStatus: false,
      sucTagStatus: false,
      groupType:2,
      view_member_id:0,
      haveCollage: true,
      defaultStatus: true,
      suc_num: 1350,
      selfSuc: true,
      selfIng: false,
      selfNew: false,
      selfShare: false,
      memberArr:[],
      defaultArr:[
        'https://cdn2.txbimg.com/avatar/001/10/00/06_avatar_big.jpg',
        'https://cdn2.txbimg.com/avatar/001/10/00/05_avatar_big.jpg',
        'https://cdn2.txbimg.com/avatar/001/10/00/00_avatar_big.jpg',
        'https://cdn2.txbimg.com/avatar/001/00/00/12/bc15_200.jpg',
        'https://cdn2.txbimg.com/avatar/001/00/00/10_avatar_big.jpg'
      ],
      hour:'00',
      minute:'00',
      sister:'00',
      shareStatus: false,
      type:1,
      isSelf:false
    }
  },
  created(){
  },
  mounted(){
    this.getCollageInfo();
    this.getMemberInfo();
  },
  methods:{
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
    getCollageInfo(){
      let member_id = window.localStorage.getItem('monthCardCollageMemberid')
      let view_member_id = this.$common.VL.getRequest().view_member_id || 0;
      let act_id = this.$common.VL.getRequest().aid || 2;
      this.view_member_id = this.$common.VL.getRequest().view_member_id || 0;
      let url = this.$common.config.gzhUrl + 'v3/group/month-card/group'
      let fd = this.$common.getParam('get',{member_id:member_id,view_member_id:view_member_id,act_id:act_id})
      let _this = this;
      this.$axios.get(url+'?'+fd).then((res) => {
        if(res.data.code == 200){
          // 商品配置
          let da = res.data.data
          let conf = da.conf
          if(conf.head_imgs.length > 0){
            _this.defaultArr = conf.head_imgs
          }
          _this.groupPrice = conf.group_buy.price
          _this.groupType = conf.group_buy.type
          _this.directPrice = conf.direct_buy.price
          _this.directType = conf.direct_buy.type
          _this.suc_num = conf.member_join_num

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
              if(view_group.members[i].head_img || view_group.members[i].nick_name){
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
          _this.showSucToast();
          _this.shareConfig()
      }else if(res.data.code == 11001){
          _this.endStatus = true;
        }
      })
    },
    getMemberInfo(){
      let openid = window.localStorage.getItem('monthCardCollageOpenid')
      let userUrl = this.$common.config.gzhUrl + 'v3/member/passport/get-info';
      let fd = this.$common.getParam('get',{openid:openid});
      this.$axios.get(userUrl+'?'+fd).then((res) => {
        if(res.data.code == 200){
          window.localStorage.setItem('monthCardCollagePhone',res.data.data.phone)
        }
      })
    },
    backCollage(){
      window.location.href = 'collage.html'
    },
    toOrder(type,ne){
      if(ne){
        window.location.href = 'collage.html'
        return
      }
      let ph = window.localStorage.getItem('monthCardCollagePhone')
      let act_id = this.$common.VL.getRequest().aid || 2;
      let source_id = this.$common.VL.getRequest().sid || 106;
      if(!ph){
        if(this.view_member_id > 0 ){
          this.$router.push({name:'Login',query:{type:type,vid:this.view_member_id,aid:act_id,sid:source_id}})
        }else {
          this.$router.push({name:'Login',query:{type:type,aid:act_id,sid:source_id}})
        }
        return
      }
      if(type>0){
        if(this.view_member_id > 0 && !ne){
          this.$router.push({name:'Order',query:{type:type,vid:this.view_member_id,aid:act_id,sid:source_id}})
        }else {
          this.$router.push({name:'Order',query:{type:type,aid:act_id,sid:source_id}})
        }
        if(type == 1){
          TDAPP.onEvent('按钮点击_38元直接购买');
        }else if(type == 2){
          TDAPP.onEvent('按钮点击_9.9拼团');
        }
      }
    },
    showShareToast(){
      this.sucTagStatus = false
      this.shareStatus = true
      TDAPP.onEvent('按钮点击_邀请好友');
    },
    hideShareToast(){
      this.shareStatus = false
    },
    showSucToast(){
      let tag = window.localStorage.getItem('sucTag')
      let type = window.localStorage.getItem('type')
      if(parseInt(tag)>0){
        this.sucTagStatus = true
        if(type == 1){
          this.type = 1
        }else {
          if(this.sucStatus){
            this.type = 1
          }else {
            this.type = 2
          }
        }
      }
    },
    hideSucToast(){
      window.localStorage.removeItem('sucTag')
      window.localStorage.removeItem('type')
      this.sucTagStatus = false
    },
    shareConfig(){
      let member_id = localStorage.getItem('monthCardCollageMemberid')
      let lUrl = encodeURIComponent(window.location.href)
      let wUrl = this.$common.config.gzhUrl + "v3/wechat/wechat/get-wechat"
      let fd = this.$common.getParam('get', {url: lUrl, member_id: member_id});
      let link = '';
      let configObj = {
        title:'限时拼团！9.9元抢美国原版RAZ绘本！',
        desc: '好未来重磅引进，畅读27个级别，2000+RAZ绘本',
        imgUrl: 'https://qnfile.abctime.com/share_logo_new.png',
      };
      let vid = this.$common.VL.getRequest().view_member_id
      let aid = this.$common.VL.getRequest().aid
      let sid = this.$common.VL.getRequest().sid
      if(vid > 0){
        if(this.haveGroup){
          if(this.isSelf){
            link = window.location.origin + '/mini_pay/month/collage.html?view_member_id=' + member_id
          }else {
            link = window.location.origin + '/mini_pay/month/collage.html?view_member_id=' + vid
          }
        }else {
          link = window.location.origin + '/mini_pay/month/collage.html?view_member_id=' + member_id
        }
      }else {
        link = window.location.origin + '/mini_pay/month/collage.html?view_member_id=' + member_id
      }
      if(aid>0){link += '&aid='+aid}
      if(sid>0){link += '&sid='+sid}
      console.log(link)
      if(this.haveGroup && this.xNum > 0){
        configObj.title = '【仅剩' + this.xNum + '人】9.9元拼团购买美国原版RAZ月卡'
        configObj.desc = '我已下单，快来和我一起拼团购买吧'
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



<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  .toast_wrap{
    position: fixed;
    left: 0;
    top:0;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,.7);
    font-size: .4rem;
    color: #fff;
    text-align: right;
    .arrow{
      position: absolute;
      width: 2.19rem;
      height: 1.89rem;
      background: url('../assets/images/collage_share_arrow.png');
      background-size: cover;
      top: .25rem;
      right: .45rem;
    }
    .time{
      text-align: center;
      padding-top: 2.4rem;
      font-family: Helvetica;
      font-size: .36rem;
      color: #FFC100;
      letter-spacing: .045rem;
      span{
        padding-left: .3rem;
      }
    }
    .num{
      font-family: Helvetica;
      font-size: .32rem;
      color: #FFFFFF;
      letter-spacing: .04rem;
      text-align: center;
      padding-top: .25rem;
      span{
        color: #FFC100;
      }
    }
    .icon_a{
      display: inline-block;
      width: 1.55rem;
      height: 1.8rem;
      background: url('../assets/images/collage_share_a.png');
      background-size: cover;
      margin: .11rem .48rem;
    }
  }
  .suc_wrap{
    position: fixed;
    left: 0;
    top:0;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,.7);
    font-size: .4rem;
    color: #fff;
    .suc_box{
      width: 5.6rem;
      /*height: 3.4rem;*/
      padding-bottom: .4rem;
      border-radius: .1rem;
      margin: auto;
      background: #fff;
      margin-top: 3.3rem;
      position: relative;
      .tag2{
        width: 2.67rem;
        height: 1.34rem;
        background: url('../assets/images/collage_suc_tag2.png');
        background-size: cover;
        position: absolute;
        left: 1.46rem;
        top: -1.2rem;
        z-index: -1;
      }
      .tag_box{
        width: 1.12rem;
        height: 1.12rem;
        background: #fff;
        border-radius: 50%;
        position: absolute;
        top: -.45rem;
        left: 2.24rem;
        .icon_wrap{
          width: .9rem;
          height: .9rem;
          border-radius: .5rem;
          background: linear-gradient(to right, #A0D267 50%, #90C94F 50%);
          margin: .11rem .11rem;
          position: relative;
          .icon{
            width: .54rem;
            height: .44rem;
            background: url('../assets/images/collage_suc_tag1.png');
            background-size: cover;
            margin: auto;
            position: absolute;
            top: .22rem;
            left: .18rem;
          }
        }
      }
      .t1{
        font-family: Helvetica;
        font-size: .36rem;
        color: #3C3B3B;
        letter-spacing: .045rem;
        padding-top: .82rem;
      }
      .t2{
        font-family: Helvetica;
        font-size: .28rem;
        color: #B9B9B9;
        letter-spacing: .035rem;
        padding-top: .15rem;
      }
      .btn{
        width: 3.1rem;
        height: .98rem;
        line-height: .98rem;
        text-align: center;
        font-weight: bold;
        margin: auto;
        margin-top: .3rem;
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
  }
  .container{
    background: #EFF7FC;
    padding-bottom: 1.2rem;
    &.blur{
      -webkit-filter: blur(2px);
      filter: blur(2px);
    }
    .banner{
      width: 100%;
      height: 3.8rem;
      margin-bottom: -.38rem;
    }
    .time_box{
      width: 100%;
      height: .6rem;
      line-height: .6rem;
      background: rgba(250,71,61,.71);
      position: fixed;
      top: 0;
      left: 0;
      font-family: HiraginoSansGB-W6;
      font-size: .26rem;
      color: #FFFFFF;
      letter-spacing: .016rem;
      text-align: center;
      text-shadow: 0 .02rem .04rem rgba(0,0,0,.5);
      span{
        margin-left: .1rem;
      }
    }
    .content_box{
      text-align: left;
      background: #FFFFFF;
      border-radius: .2rem;
      box-shadow: 0 .02rem .08rem 0 rgba(120,120,120,.5);
      width: 6.8rem;
      padding: 0 0 .28rem .4rem;
      margin: auto;
      position: relative;
      .title{
        font-family: HiraginoSansGB-W6;
        font-weight: bold;
        font-size: .3rem;
        color: #1D1D1D;
        letter-spacing: .0136rem;
        padding-top: .25rem;
      }
      .info{
        position: relative;
        .price{
          font-family: HiraginoSansGB-W6;
          font-weight: bold;
          font-size: .44rem;
          color: #E02E24;
          letter-spacing: .02rem;
          span{
            font-family: HiraginoSansGB-W3;
            font-size: .24rem;
            color: #6A6A6A;
            text-decoration: line-through;
            padding-left: .12rem;
          }
        }
        .num{
          font-family: HiraginoSansGB-W3;
          font-size: .24rem;
          color: #6A6A6A;
          letter-spacing: .016rem;
          position: absolute;
          right: .25rem;
          top: .15rem;
          span{
            color: #F18F02;
          }
        }
      }
      .desc{
        font-family: HiraginoSansGB-W3;
        font-size: .22rem;
        color: #858585;
        letter-spacing: .015rem;
        line-height: .36rem;
        width: 6.2rem;
      }
    }
    .collage_box{
      text-align: left;
      background: #FFFFFF;
      border-radius: .2rem;
      box-shadow: 0 .02rem .08rem 0 rgba(120,120,120,.5);
      width: 7.2rem;
      /*height: 1.8rem;*/
      padding-bottom: .2rem;
      margin: auto;
      margin-top: .2rem;
      position: relative;
      .full_txt{
        font-family: PingFangSC-Semibold;
        font-weight: bold;
        font-size: .24rem;
        text-align: center;
        color: #E02E24;
        padding-top: .1rem;
      }
      &.cen{
        text-align: center;
      }
      .status{
        display: inline-block;
        vertical-align: top;
        padding: .7rem 0 0 .32rem;
        font-family: PingFangSC-Semibold;
        font-size: .22rem;
        color: #6A6A6A;
        letter-spacing: .0015rem;
        margin-right: .2rem;
        &.suc{
          margin-right: .66rem;
          color: #E02E24;
        }
        span{
          font-family: HiraginoSansGB-W3;
          font-size: .36rem;
          color: #E02E24;
          padding: 0 .05rem 0 .1rem;
          line-height: 1;
          vertical-align: top;
        }
      }
      ul{
        display: inline-block;
        margin-top: .35rem;
        li{
          width: 1.1rem;
          height: 1.1rem;
          background: url('../assets/images/collage_member_bg.png') no-repeat;
          background-size: cover;
          display: inline-block;
          margin: 0 .13rem;
          position: relative;
          vertical-align: top;
          margin-bottom: .4rem;
          .h_img{
            width: 1.1rem;
            height: 1.1rem;
            border-radius: 50%;
            border: .04rem solid #FFF;
            box-shadow: 0 .02rem .06rem 0 #CFD0D2;
            margin: -.04rem 0 0 -.04rem;
          }
          .nickname{
            font-size: .18rem;
            color: #C7C7C7;
            font-family: "PingFang SC";
            padding-top: .1rem;
            width: 1.1rem;
            display: inline-block;
            vertical-align: top;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin: auto;
            text-align: center;
          }
          &:nth-child(1)::before{
            content: '团长';
            position: absolute;
            right: -.06rem;
            top: -.13rem;
            background: #FFCA4D;
            box-shadow: 0 .02rem 0 0 #D18E1A;
            border-radius: .17rem;
            font-family: HiraginoSansGB-W6;
            font-size: .22rem;
            color: #FFFFFF;
            letter-spacing: .0076rem;
            text-align: center;
            line-height: 1;
            padding: .07rem .1rem;
          }
        }
      }
    }
    .default_box{
      text-align: left;
      background: #FFFFFF;
      border-radius: .2rem;
      box-shadow: 0 .02rem .08rem 0 rgba(120,120,120,.5);
      width: 7.2rem;
      height: 1.8rem;
      margin: auto;
      margin-top: .2rem;
      position: relative;
      div{
        font-family: PingFangSC-Semibold;
        font-size: .24rem;
        color: #E02E24;
        letter-spacing: .009rem;
        position: absolute;
        top: .72rem;
        right: .34rem;
      }
      ul{
        display: inline-block;
        margin: .35rem 1.4rem 0 .35rem;
        li{
          width: 1.1rem;
          height: 1.1rem;
          background: url('../assets/images/collage_member_bg.png') no-repeat;
          background-size: cover;
          display: inline-block;
          float: right;
          margin-right: -.5rem;
          position: relative;
          img{
            width: 1.1rem;
            height: 1.1rem;
            border-radius: 50%;
            border: .04rem solid #FFF;
            box-shadow: 0 .02rem .06rem 0 #CFD0D2;
            margin: -.04rem 0 0 -.04rem;
          }
        }
      }
    }
    .suc_tips{
      font-family: HiraginoSansGB-W3;
      font-size: 0.22rem;
      color: #858585;
      letter-spacing: 0.015rem;
      line-height: 3;
      width: 100%;
      text-align: center;
    }
    .info_pic{
      width: 100%;
      height: auto;
    }
    .btn_box{
      width: 100%;
      height: 1.2rem;
      background: #EE5148;
      position: fixed;
      bottom: 0;
      .btn_left{
        position: absolute;
        top: 0;
        left: 0;
        width: 2.6rem;
        height: 1.05rem;
        background: #ECA8A4;
        color: #fff;
        padding-top: .15rem;
        p{
          font-family: HiraginoSansGB-W6;
          font-weight: bold;
          font-size: .24rem;
          letter-spacing: .02rem;
          text-align: center;
          span{
            font-size: .36rem;
          }
        }
      }
      .btn_right{
        width: 100%;
        height: 100%;
        text-align: right;
        line-height: 1.2rem;
        p{
          padding-right: 1.17rem;
          font-family: HiraginoSansGB-W6;
          font-size: .24rem;
          color: #FFFFFF;
          letter-spacing: .01rem;
          text-shadow: 0 .01rem 0 #B13434;
          span{
            font-size: .36rem;
            letter-spacing: .045rem;
            margin-right: .16rem;
          }
        }
        .icon{
          width: .9rem;
          height: 1.04rem;
          background: url('../assets/images/collage_btn_star.png');
          background-size: cover;
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }
    }
    .btn_box2{
      width: 100%;
      height: 1.2rem;
      background: #EE5148;
      position: fixed;
      bottom: 0;
      line-height: 1.2rem;
      font-family: HiraginoSansGB-W6;
      font-size: .36rem;
      color: #FFFFFF;
      letter-spacing: .045rem;
      text-align: center;
      text-shadow: 0 .01rem 0 #B13434;
      .icon{
        width: .9rem;
        height: 1.04rem;
        background: url('../assets/images/collage_btn_star.png');
        background-size: cover;
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
    .btn_box3{
      width: 100%;
      height: 1.2rem;
      background: #D3D2D2;
      position: fixed;
      bottom: 0;
      line-height: 1.2rem;
      font-family: HiraginoSansGB-W6;
      font-size: .36rem;
      color: #FFFFFF;
      letter-spacing: .045rem;
      text-align: center;
      text-shadow: 0 .01rem 0 #9D9D9D;
    }
  }
</style>

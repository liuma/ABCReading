<template>
  <div class="catalog">
    <div class="user_info">
      <div class="img_wrap">
        <img :src="head_img">
      </div>
      <div class="info">
        <p class="nickname">{{nickname}}</p>
        <div class="progress">
          <div class="current" :style="'width:'+(20+count/courseArr.length*80)+'%'"></div>
          {{count+'/'+courseArr.length}}
        </div>
      </div>
    </div>
    <div class="cata_container" ref="viewBox">
      <div class="bg_up1"></div>
      <img src="../../assets/imgs/bg_up2.png" class="bg_up2" :style="'transform:translateX(-'+scoLeft*0.8+'px)'">
      <img src="../../assets/imgs/bg_main.png" class="bg_main" :style="'transform:translateX(-'+scoLeft*0.6+'px)'">
      <!--<div class="bg_up2" :style="'transform:translateX(-'+scoLeft*0.8+'px)'"></div>-->
      <!--<div class="bg_main" :style="'transform:translateX(-'+scoLeft*0.6+'px)'"></div>-->
      <ul class="cata_box">
        <li v-for="(c,index) in courseArr" @click="c.is_unlock?toPart(c.id):''">
          <img class="letter_img" :src="'https://qnfile.abctime.com/extend/letter/'+cataArr[index]+'.png'">
          <div :class="c.is_unlock>0?'Hidden':'lock'">
            <span class="icon"></span>
            <p>学完前面的课程<br>
              自动解锁</p>
          </div>
          <div v-if="index == (count-1)" class="role_a"></div>
        </li>
      </ul>
      <div class="repeat_bg"></div>
    </div>
    <eject :message="ejectText" :showState="ejectStatus"></eject>
    <div class="hv_tip">
      <div class="icon"></div>
      <p class="p_txt1">请旋转至横屏，开始学习</p>
      <p class="p_txt2">
        如不能横屏，请按下方步骤操作：<br/>
        1.请手机首页下拉，打开自动“旋转”按钮；<br/>
        2.微信内点击“我的”-“通用”-允许“横屏显示”。<br/>
      </p>
    </div>
  </div>
</template>
<script scoped>
  import Eject from '../Eject'
  export default {
    name: 'Pay',
    components: {
      eject: Eject,
    },
    data () {
      return {
        cataArr:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
        courseArr:[],
        nickname:'',
        head_img:'',
        num:2,
        canGroup:true,
        ejectText:'',
        ejectStatus: false,
        count:0,
        scoLeft:0
      }
    },
    created(){
      // this.getInfo()
      // this.shareConfig()
    },
    mounted(){
      this.getCourseList()
      this.shareConfig()
      this.nickname = window.localStorage.getItem('extendAbcNickname')
      this.head_img = window.localStorage.getItem('extendAbcHeadimg');
      this.box = this.$refs.viewBox;
      // 监听这个dom的scroll事件
      this.box.addEventListener('scroll', () => {
        this.scoLeft = this.$refs.viewBox.scrollLeft;
      }, false)
    },
    methods: {
      toPart(id){
        this.$router.replace({name:'Part',query:{id:id}})
      },
      showEject: function (text) {
        this.ejectText = text
        this.ejectStatus = true
      },
      initEject: function () {
        this.ejectStatus = false
      },
      getCourseList(){
        let member_id = localStorage.getItem('extendAbcMemberid');
        let wUrl = this.$common.config.gzhUrl + "v3/marketingcourse/course/list"
        let fd = this.$common.getParam('get', {course_id:1,member_id: member_id});
        this.$axios.get(wUrl+'?'+fd).then((res) => {
          console.log(res.data)
          if(res.data.code == 200){
            this.courseArr = res.data.data.list
            this.count = res.data.data.unlock_count
            localStorage.setItem('extendAbcLength',this.courseArr.length)
          }
        })
      },
      shareConfig(){
        let member_id = localStorage.getItem('extendAbcMemberid')
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
      }
    }
  }
</script>

<style scoped lang="less">
  .catalog{
    width: 100vw;
    height: 100vh;
    overflow: auto;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
    position: relative;
    .user_info{
      position: fixed;
      top: .18rem;
      left: .18rem;
      z-index: 7;
      .img_wrap{
        width: .92rem;
        height: .92rem;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 .02rem .06rem 0 #CFD0D2;
        img{
          width: .8rem;
          height: .8rem;
          border-radius: 50%;
          margin-top: .06rem;
        }
      }
      .info{
        width: 2.15rem;
        height: .72rem;
        padding-left: .55rem;
        background: #FFFFFF;
        border-radius: 0 .74rem .74rem 0;
        position: absolute;
        top: .1rem;
        left: .44rem;
        z-index: -1;
        .nickname{
          padding: .06rem 0 0 0;
          text-align: left;
          font-family: PingFangSC-Regular;
          font-size: .24rem;
          color: #000000;
          letter-spacing: 0;
        }
        .progress{
          width: 1.8rem;
          height: .24rem;
          line-height: .24rem;
          background: rgba(255,82,25,.3);
          border-radius: .12rem;
          font-family: PingFangSC-Semibold;
          font-weight: bold;
          font-size: .2rem;
          color: #FFFFFF;
          letter-spacing: 0;
          position: relative;
          .current{
            /*width: 1.2rem;*/
            width: 20%;
            height: .24rem;
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            background: #FF5F26;
            border-radius: .12rem;
          }
        }
      }
    }
    .cata_container {
      width: 100vw;
      height: 100vh;
      
      transform-style: preserve-3d;
      perspective: 1px;
      -webkit-perspective: 1px;
      -webkit-transform-style: preserve-3d;
      transform: translateZ(0px);
      -webkit-transform: translateZ(0px);
      background: #FFEBC9;
      overflow-y: hidden;
      overflow-x: scroll;
      z-index: 2;
      position: relative;
      .repeat_bg{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100vw;
        /*width: 91.56rem;*/
        height: 2.4rem;
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAADwCAMAAACKY+LeAAAAVFBMVEX8xIDVfRH/r0zplS7/1aHisHLspk/qmji/cA/pljHfjy7mnEDdiiXahR77wnz4vXT1t2zqo0zYghnon0X6v3j3unD0tGfysWHuq1fWfxXvrl7ilTdFAOk/AAABVklEQVR42u3V3U6EMBCG4U9RkFKglOVv9/7v08QYA1LaDmDiku89njwZhoPi9ZTIkCFDhgwZMmTIkCFDhgyZizPJKZEhQ4YMmWsz2bwkCY44mbxJF+URIw4mS5dlESOubdLwNml4myRf3SYw8hQ/nAwZMmSuz7ycEhkyZMiQCaXaQh1mSgMARh9jyhpf1eUhpsd3/RGmwU/NfkZhltrL2BqzaruTGbBo2Me0+FW7h9FYpeWM7bCqs2JmhKNRyhRwVsgYXcFZpSXMZLCRmQTMiM3GeOYBT49YprzB062MZHp46+OYBoGaGEYhmJoxgcP4zxNkBkQ0hJgWUbV+RiEy5WNsjchq62HuiO6+zRQQVGwxuoKgSruZqYOoboL7k4QVTsZAmHEyFYRVTgbiyJAhc2nm7ZTIkCFDhgyZv2E+HL2LO4n5Z284GTJkyJAhQ4YMGTJkrsl8AuFseVjQcuX3AAAAAElFTkSuQmCC') repeat-x;
        background-size: auto 100%;
        z-index: 8;
      }
      .bg_up1{
        position: absolute;
        top: 0;
        left: 0;
        /*width: 91.56rem;*/
        height: 5.65rem;
        background: #FFF2E0;
        background-image: linear-gradient(0deg, rgba(255,242,224,0.00) 10%, #FFF2E0 100%);
        z-index: 2;
        display: none;
      }
      .bg_up2{
        position: fixed;
        top: 0;
        left: 0;
        /*width: 49.4rem;*/
        width: auto;
        /*width: 100vw;*/
        height: 5.16rem;
        /*background: url('../../assets/imgs/bg_up2.png') no-repeat;*/
        /*background-size: cover;*/
        z-index: 6;
      }
      .bg_main{
        position: fixed;
        left: 0;
        /*top: .44rem;*/
        bottom: 1.18rem;
        /*width: 59.59rem;*/
        width: auto;
        height: 6.04rem;
        /*background: url('../../assets/imgs/bg_main.png') no-repeat;*/
        /*background-size: cover;*/
        z-index: 7;
      }
      .cata_box{
        width: auto;
        text-align: left;
        font-size: 0;
        white-space: nowrap;
        /*padding:1.62rem 0 0 1.08rem;*/
        /*margin-top: -3.1rem;*/
        margin-top: calc(~'100vh - 4.6rem');
        padding:0 0 0 1.08rem;
        position: relative;
        z-index: 10;
        li{
          display: inline-block;
          vertical-align: top;
          width: 2.4rem;
          height: 2.4rem;
          margin-right: 1.08rem;
          position: relative;
          .letter_img{
            width: 100%;
            height: 100%;
          }
          .lock{
            position: absolute;
            width: 2.04rem;
            height: 2.04rem;
            border-radius: .3rem;
            background: rgba(0,0,0,.2);
            left: .18rem;
            top: .18rem;
            text-align: center;
            .icon{
              display: inline-block;
              width: .38rem;
              height: .5rem;
              background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAyCAMAAAAHpFkRAAAAYFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////98JRy6AAAAH3RSTlMA8uUcGdiVBr4t7oBPDPim9Me2n5uPhndrRzQmD25JHwZtpAAAAXZJREFUOMvdlEmSwyAMRZkxnod4ip1w/1t2Iag2JtAsepe/cUm8AiS+jO6i28gx5uNGUVrsoX/1YCmqxtoTruPUSwd6RffSH4rsx7A9qlJNoyoXfN7P3r6gruLC1hFS1FJXwnJhXzY4xMtSOHcLsNEkKz9TmcwYYNwklZ9RJsMDDI5o/EwD1wgwbRRJfRmmZq4T4rNykBT6TwkJVKEzKgwndFYCni4vhWbzaVeWmLW1NeuztcaKklqhXmsNlsYYGCXS12jjQ4x2hHQ0h9HSxCXNYJ0GdRmMWIz8G8sfmi8hnDxqYhrOoX2sI+iTFx72scBtdRqrwXHWblMam6zhdrjy6bfEb8cJJe1IQg3LtfAm5H1FC1QgncnbJ4rq2TqTI9ZD22mMovAoPbP/O+Cekb2Acn9HOUDQLucdOpcWFgbpfOzeu5zqo3G9P+qpdC5gyEkRnRRR3lwMKWq4TZOs+hjUVzIcNIFDCIvYYMpdFBw7ghdi93b6AR6PWxvqWdW6AAAAAElFTkSuQmCC');
              background-size: cover;
              margin: .77rem auto 0;
            }
            p{
              font-family: FZY4JW--GB1-0;
              font-size: .16rem;
              width: 100%;
              color: #FFFFFF;
              letter-spacing: 0;
              text-align: center;
              position: absolute;
              left: 0;
              bottom: 0;
            }
          }
          .role_a{
            width: 1.56rem;
            height: 1.89rem;
            background: url('../../assets/imgs/role_a.png');
            background-size: cover;
            position: absolute;
            top: 1.16rem;
            left: 1.95rem;
          }
        }
      }
    }
    .hv_tip{
      width: 100vw;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, .8);
      z-index: 1001;
      font-size: .2rem;
      font-family: PingFangSC-Semibold;
      font-weight: bold;
      color: #FFD356;
      .icon{
        width: 1.02rem;
        height: .76rem;
        margin: 1rem auto 0;
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMkAAACWCAMAAABDwFwVAAAApVBMVEUAAADr9f/+///////////+/v/////////7+//////t9v/x9f/////////////w+//////u9v/////u9P/0+f/////+/v/y+f/r9//w+P/1/P////////////////////////////////////////////////////////////////////////////////////////////////////////////////9YCPw6AAAANnRSTlMAGpaLjpuQkQb3GATdoWEJ6BawFAxllB4RDwvx5+Hrh3Uq2cRbtqVtUSMCu518PNBoSqo/ODTmdfBCAAAFfklEQVR42u3d7XKiMBiG4Sd2tYGoiKCCWq3W2s9tt/uR8z+07ZoKVqxg4M0C4/2HX51yTYwMDCbY5Hf7bUuelNXud32UrUFPatUboFTxjtSuw1GiFESXgvI0kLkqzwdsPM0nmY5RkrpS1e60Nt3KlPqtTZ0rqeqiJPXlpiaH6iVN8gcqp/MhQ0lqqxHh+IhPjkNmAlvKlfpTlCR1QXxG1N1xSRdRa3WJREmSmy4Qd3Sm9BF3KTehJCUl4rv1lcO6FlWSAKMf88sDzQcMqJbk686SA50lZ8lZkl71JN3Xyc0vHKhqkob81wFK1SQKIm+QqGKShlRNkKhaki1EviJRpSQRRK6QqEySVixJgQyRrEKSGCKt5VPz+2qB3aoj6cpE0+f7EFGVkbzKQ1k3KwFVZSQT+UXtOwf/qozkRn7Z7HsAoDKSF3mk6RtQGQm68lidoDqSHcp0dXfxtDdxrt6qI9mhzPHe4vrz3PlWHUlMaUM1ms9k3JpXRhJRZtjm3E1iypNfGQlWyYew9jqm3LiVkWBl/RuSB+z2axlRlm5lJFg0buf7p8sb8ajwykgOdx1fWEog+ZZDgntrS7kuVHLpO9ysBL+j7+P7IiUNxpjt+dygBC/bUZksCpWo7IAbk2AVzfrCJQoTCkOSeNr/KFYS53EzEjSlajKikMQWeomzlKo+iUQVCAMS/LGk6p5GogoNSPBdqq44oYS5nF4iXuNJTyNR+eQS/I4HhVLCPEEtwc+d10ge7hdUEuYKasnDx6RfisfG++HJJZIwmxNLcCFVK3Wh7FNIVA6xxN4OykQdAzIJG9NK0JCfeqCTMIdQIhaLhdxt9kgoYZxM8nsp5WyyK2mBUmJzIonXk/s9kEqYLWgkgwTkFrQS5tJI5gnJG7WEhSSS+31IG+QSxikkeNqTXBuQuI8UEmc+2YVYgQEJC2iujOHdMpY0YULCeLGSuLfb7ZAszEhcConqoTWJZwm9hDkkEpXfbbZeYEri7knK+PZgNgkb10Zi10bCnNpIvNpImKiNJKyNxK6NhDm1kYS1kbi1kTBRG8m4NpKgNhK7NhL2mEEyVgtTUBYvZzHWlfB0yWAqDTYdaEqcNAnvSMN1uJbET5OYg8QULUmQIhnI/9BAR+Lho4uDEr8n/0M9X0PiHpd0pepq3cjf5UVKz22p6hYv6ctN6xErIB9p8abc1NeQ2MclbTUihUCYg3SK+oft4iXqgviTFRLPvIaPVbxEbmoWArFPeEVWQ8LMSbwTJOUeE59W4pqTcFqJZ0xig1YSGJMExJLQmIQjPf5yqy3xTUlspKd+l6MpcUxJQqQl1HjoSoQpicj0Zqu+xIYhiYe0RlYuiZdRMhr2esMR6Xz/IVMl72chE32cV5hRMpTvDSmHBPN0yTDpiM7LySjpbfSkX8GX6ZIDIxKdl8goUcccV0VqiQczEnGyRE3/deZP1xhRz+oWh0QS4lRJfLOaccaLxG0nhcTF6ZK+OnYUJTUv+SiAQsI1JNFDnZ/NLA1bH3WixzMEEh8akvwrwBYv8aAjyb8qb+ESV+hI8q+UXLjEFtCR5F69ungJh5Yk94rihUsc6ElyrvJevGQMXUmuipc4qIfE5qiH5B1SD4krUA9JCNRC4nKUVXLa3W/wiNJK1BMJggGJm9NI9J8SuQ70GpiRZM0eQzdmlUjiOcjRtQHJ0MsyHKFArkSfXtKC8I9j3NBB/gYzesl7wgk9++BgBGOBYhJ/+gYkUBw/DDzXZrZtu64X+A5/RJG1qCXHOkvOkrOkLhLL9I5hHaJNfuItlIij33gp3taKNvLNsOKtxp4vDvbtxFp7XX5qXeQGZWV5y/ZTZdiSr0wb+XWkXuXbXJFrUsq44aXxX20UU0l+SfMXG4eQsma3QiYAAAAASUVORK5CYII=');
        background-size: cover;
      }
      .p_txt1{
        padding-top: .2rem;
      }
      .p_txt2{
        color: #fff;
        display: inline-block;
        margin: auto;
        text-align: left;
        padding: .5rem;
        font-size: .16rem;
        font-weight: normal;
        /*font-size: 10px;*/
      }
    }
    /*竖屏*/
    @media screen and (orientation:portrait){
      .hv_tip{
        display: block;
      }
    }
    /*横屏*/
    @media screen and (orientation:landscape){
      .hv_tip{
        display: none;
      }
    }
  }
</style>

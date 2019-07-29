<template>
  <div class="catalog">
    <div class="cata_container" ref="viewBox">
      <ul class="cata_box">
        <li v-for="item in courseArr" @click="toPart(item.id,item.cover)">
          <img :src="item.cover" class="cata_pic">
          <div v-show="item.is_finish" class="tag_finish">已完成</div>
          <p class="cata_txt">{{item.name}}</p>
        </li>
      </ul>
    </div>
    <div class="cata_ft"></div>
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
        cataArr:[],
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
    },
    mounted(){
      this.getCourseList()
      this.nickname = window.localStorage.getItem('extendAbcNickname')
      this.head_img = window.localStorage.getItem('extendAbcHeadimg');
      this.box = this.$refs.viewBox;
      // 监听这个dom的scroll事件
      this.box.addEventListener('scroll', () => {
        this.scoLeft = this.$refs.viewBox.scrollLeft;
      }, false)
    },
    methods: {
      toPart(id,cover){
        localStorage.setItem('musicalPartCover',cover);
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
        let fd = this.$common.getParam('get', {course_id:2,member_id: member_id});
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
        let lUrl = encodeURIComponent(window.location.href)
        let wUrl = this.$common.config.gzhUrl + "v3/wechat/wechat/get-wechat"
        let member_id = localStorage.getItem('monthCardCollageMemberid')
        let fd = this.$common.getParam('get', {url: lUrl, member_id: member_id});
        // let conf = {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
        this.$axios.post(wUrl + '?' + fd).then((res) => {
          if(res.data.code == 200){
          let data = res.data.data
            // 微信配置
            wx.config({
              debug: false,
              appId: data.appId,
              timestamp: data.timestamp,
              nonceStr: data.nonceStr,
              signature: data.signature,
              jsApiList: ['hideMenuItems', 'chooseWXPay', 'startRecord','stopRecord','onVoiceRecordEnd','playVoice','pauseVoice','stopVoice','onVoicePlayEnd'] // 功能列表，我们要使用JS-SDK的什么功能
            });
            wx.ready(function () {
              wx.checkJsApi({
                jsApiList: ['hideMenuItems', 'chooseWXPay', 'startRecord','stopRecord','onVoiceRecordEnd','playVoice','pauseVoice','stopVoice','onVoicePlayEnd'],
                success: function (res) {
                  wx.hideMenuItems({ menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline','menuItem:share:qq','menuItem:share:weiboApp','menuItem:share:QZone','menuItem:copyUrl','menuItem:originPage','menuItem:openWithQQBrowser','menuItem:openWithSafari']
                  });
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
  .catalog{
    width: 100vw;
    height: 100vh;
    background: url('../../assets/imgs/cata_bg.png') no-repeat;
    background-size: 100% auto;
    overflow: auto;
    position: relative;
    background-color: #A9D832;
    .cata_container {
      overflow-y: hidden;
      z-index: 2;
      position: relative;
      .cata_box{
        width: auto;
        text-align: left;
        font-size: 0;
        white-space: nowrap;
        /*padding:1.62rem 0 0 1.08rem;*/
        /*margin-top: -3.1rem;*/
        margin-top: 1.2rem;
        padding-left: .8rem;
        position: relative;
        z-index: 10;
        li{
          display: inline-block;
          vertical-align: top;
          width: 2.7rem;
          height: 3.2rem;
          background: #FFF;
          border-radius: 1.35rem 1.35rem .3rem .3rem;
          position: relative;
          margin-right: .3rem;
          .cata_pic{
            width: 2.36rem;
            height: 2.36rem;
            border-radius: 50%;
            margin: .17rem .17rem;
          }
          .tag_finish{
            width: 1.08rem;
            height: .48rem;
            background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAAAwCAMAAADD9G9zAAAA/FBMVEXAwMDExMQAAADHx8fIyMjHx8fHx8fGxsbIyMjHyMHFxcXJycnGxsaj1yDExMTAwMCj1x7Gxsao1jXGx8LFxcXGxsak1ian1zCz0Wiw0lzFxcXGxsbHx8el1yep1T2q00Wr1ESj1ySl1iuk1imq1ULFyL2i1xz////W7Zv2++q54VSw3T7F5nH5/PHN6ob8/fjc8Kre8bD0+uTu+Nak2CHH53bC5Gqn2Sfr9s7K6H224E3T7JT6/fS+42Li8rjL6YCy3kSr2jCo2ivm9MG74lr4/O7Q643A5Ga030iu3Dn9/vr1++ft99Lp9cvX7pzy+eHx+dzZ7qLo9cfa76VxJadAAAAAJnRSTlMEDQAbM01kCwkQLgcU4SIY9jdgRD0o6bqUhVpHKerKtbOslpVsXdI9oUYAAAOGSURBVFjDxdhpd5pAGIZhKLFR3JcsTdK9fR9xTQLUDfddo0nb//9fOjgoS+jRptJeH3I8fuBmBg+ZGeHVjhAMZ8EuRcOnjHhEp0w4aveEbSscyXyMp+jIUvGPmUiY17YxISpm4hSQeEaMCnaMDeszBehzJMw7vPWJAvWJ1wRzDiMZClgmEhV4TJTiFLC4JG5iQjj2hQL3JRZmKXNgF/RHmg2NNvrk0b+tkL8LSWQp9sQScdel8h6VJllqkxIRDapokekHJuR2CzTIVzzBnprAZvEsRQ4qntnWmoBOpC1RnRNRCbgjy+zbRgd45J8KGrmkzmJhFjtNyt6782oRVywDbSJ9801Nse/iAc8YnjmWk6dmTJLJpeg2AfJkGS3QIaKVOX8t4CdxRfhoeGISj52Qk9aekVNhF8s/KgsYiqKUwf4sgLHyY0ZMG1hVXDqATi4nm5joiXVRHfjGmvDRsmJtcmkDI29M9InlgaJvTAeebl06VmwEfKuXHVYNYP6SWNcRKw4KtibNgS4x2jo/hct0rdOBsaoTgMkupsChO7UnazC8dxjWiA6NefErzqr3NQM2ozlTHmq0x97Y8M5p3dasu9eoVzLpSwB1e7J7qvLMsPaCZ+bnDjC6ZJvAR/uvYrVvJYsBqCVubo8MqKrqErhXTXcvHFlX1e33mEdZI4tWxZCoAZSIe1lsjCdi1vCx3MV6QOsIMQN1MjULWzrwg3+yJ6sCTO1Y56l5YGxGTj2gQx4GHsitNsa4tovNgcqBse99Z6vOviC3PqCQy2DIL9/gb+DRgbEuGKNsMRZgerSllRrTQrsDqK544xF40vh/1Pvv+Z+PvLk31n+AV552GuBcg+0uANQHfM4t44N++qSN8p3hqs6tOretItmm4FzvKRVYtjTa0McwqQXaG9uvqed/rlvuSxVabY12BsXivP/7n36KApdiMb4siFPg4ieSteC5oMBdyDyWlN9Q4N6wpRxfpGbPKWDnWb5IZcvvdOBDe5M2l9+bjYWc/UCB+pCVJVHgW6ZEOvSeAvQ+lE6wWeSbweRNLnT5lgLy9jKUu0mKwnabK8m50NfLd+fHP5o4f3f5NZSTJfbEdht46SadDV1dvT66q6tQNn0jbTfwvJZMyOnc9XXoyK6vc2k5keQt+9AlJiXOZPnkyGT5LCHFxKjgOU4SI7GkdHTJWEQMC8J/OCj7p0eAvwAcdHhWIRGoZwAAAABJRU5ErkJggg==');
            background-size: cover;
            position: absolute;
            left: .76rem;
            top: 2.19rem;
          }
          .cata_txt{
            font-family: FZY4JW--GB1-0;
            font-size: .26rem;
            color: #444444;
            letter-spacing: .006rem;
            text-align: center;
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
        }
      }

    }
    .cata_ft{
      width: 3.35rem;
      height: 1.8rem;
      background: url('../../assets/imgs/cata_ft.png');
      background-size: cover;
      position: fixed;
      bottom: 0;
      right: .4rem;
    }
    .hv_tip{
      width: 100vw;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, .8);
      z-index: 1001;
      font-size: .4rem;
      font-family: PingFangSC-Semibold;
      font-weight: bold;
      color: #FFD356;
      .icon{
        width: 1.02rem * 2;
        height: .76rem * 2;
        margin: 3rem auto 0;
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
        font-size: .3rem;
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

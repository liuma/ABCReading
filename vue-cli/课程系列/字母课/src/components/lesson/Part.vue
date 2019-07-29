<template>
  <div class="part">
    <div class="part_container">
      <div class="table">
        <img :src="'https://qnfile.abctime.com/extend/letter/'+cataArr[ind]+'.png'">
        <div class="role_a"></div>
      </div>
      <div class="leaf"></div>
      <ul>
        <li v-for="(item,$index) in partArr" @click="toStudy(item.id)" :class="locationArr[$index]>0?'active':''"><span :class="item.cls"></span>{{item.txt}}</li>
      </ul>
    </div>
    <div class="hv_tip">
      <div class="icon"></div>
      <p>请旋转至横屏，体验更佳</p>
    </div>
    <div class="back" @click="back"></div>
  </div>
</template>
<script scoped>
  import Eject from '../Eject'
  export default {
    name: 'Part',
    components: {
      eject: Eject,
    },
    data () {
      return {
        cataArr:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
        ind:0,
        content:{},
        partArr:[
          {id:1,cls:'icon icon1',txt:'看视频'},
          {id:2,cls:'icon icon2',txt:'读绘本'},
          {id:3,cls:'icon icon3',txt:'写字母'},
          {id:4,cls:'icon icon4',txt:'唱歌谣'}
        ],
        locationArr:[0,0,0,0],

        nickname:'',
        head_img:'',
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
      this.getCourseInfo()
      this.ind = this.$route.query.id-1 || 0;
    },
    methods: {
      back(){
        this.$router.replace({name:'Cata'})
      },
      getCourseInfo(){
        let member_id = localStorage.getItem('extendAbcMemberid'),lesson_id=this.$route.query.id;
        let wUrl = this.$common.config.gzhUrl + "v3/marketingcourse/course/info"
        let fd = this.$common.getParam('get', {course_id:1,member_id: member_id,lesson_id:lesson_id});
        this.$axios.get(wUrl+'?'+fd).then((res) => {
          if(res.data.code == 200){
            let da = res.data.data
            this.content = da.content;
            this.locationArr = da.location
            localStorage.setItem('letterContent',JSON.stringify(da.content))
          }
        })
      },
      toStudy(part){
        let nameStr = '',conStr='';
        switch (part){
          case 1:
            nameStr = 'PartOne';
            conStr = 'video'
            break;
          case 2:
            nameStr = 'PartTwo'
            conStr = 'book'
            break;
          case 3:
            nameStr = 'PartThree'
            conStr = 'letter'
            break;
          case 4:
            nameStr = 'PartFour'
            conStr = 'song'
            break;
        }
        this.activePart(part);
        this.$router.replace({name:nameStr,query:{id:this.ind+1,part:part}})
      },
      showEject: function (text) {
        this.ejectText = text
        this.ejectStatus = true
      },
      initEject: function () {
        this.ejectStatus = false
      },
      activePart(p_id){
        let member_id = localStorage.getItem('extendAbcMemberid'),lesson_id=this.$route.query.id;
        let wUrl = this.$common.config.gzhUrl + "v3/marketingcourse/course/lesson-location"
        let fd = this.$common.getParam('get', {course_id:1,member_id: member_id,lesson_id:lesson_id,location:p_id});
        this.$axios.get(wUrl+'?'+fd).then((res) => {
          if(res.data.code == 200){

          }
        })
      },
    }
  }
</script>

<style scoped lang="less">
  .part_container {
    width: 100%;
    min-height: 100vh;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABTYAAAJuAgMAAAD3PrW/AAAADFBMVEXsqVngkUrmoFPppVYQ6d8EAAAEDElEQVR42uzcsY0CMRRFUQQ52TZBCVMFyfZH7CGgBOqhio33BaO1BLLn7znxjV5gWxppDgAAAAAAAAAAAPC/ndpvq7AnTOcWnsKOMC3ZP4QdYbpkfxNuhuY05+7C8cdNqXD8ZVgqHP9UKxUCAAAAAAAAn7PkV2VhT5he0d+FHWE6tbAKO8J0bEm4GZrTnLsLxx83pcIJLsNS4finWqkQAAAAAAAAAADgrb6+eZurOc05LXOac17mNOe8zGnOeZnTnPMypznnZU5zzut6AAAAAAAAAAAA/vhr+VXYE6ZzC09hR5iW7B/CjjBdsr8JN0NzmnN34fjjplQ4/jIsFY5/qpUKAQAAAAAAgM9Z8quysCdMr+jvwo4wnVpYhR1hOrYk3AzNac7dheOPm1LhBJdhqXD8U61UCMAPe3dsgzAMRVE0Ij2DMEKmyIjUDkVGYB6moM4vIlkK8rc5p37VLWx3BgAAAAAAAADgT/ju/kKrnHKmJaececkpZ15yypmXnHLmJaececkpZ17rBAAAAAAAAAAAAHCZuRxthjXD6F6Ct2HFMFpKsBtWDKNHCZ6Gp0M55exu2P64GWrY/jIcatj+qTbUEAAAAAAAAPidpRzthjXD6BP2L8OKYTSXYDOsGEa3EhmeDuWUs7th++NmqGGCy3CoYfun2lBDAAAAAAAAAAC65Lv7C61yypmWnHLmJaececkpZ15yypmXnHLmJaecea0TAAAAAAAAAAAA3ZnL0Wb4Ze+OjRSGgTCM3kBOIZTgKiiReCFwCdRDFRezged2xozkvffiL/oDSZFdCbNLJC9hIcyWSFZhIcyukdyFm6E5zXm4cPxx0yocfxm2Csc/1VqFAAAAAAAAwPcs8WkVVsLsnfqnsBBm50gewkKYnSITbobmNOfhwvHHTatwgsuwVTj+qdYqBAAAAAAAAAAA2JPf3e/pZk5zTsuc5pyXOc05L3Oac17mNOe8zGnOeZnTnPO6/QAAAAAAAAAAAH/8tPxDWAmzSyQvYSHMlkhWYSHMrpHchZuhOc15uHD8cdMqHH8ZtgrHP9VahQAAAAAAAMD3LPFpFVbC7J36p7AQZudIHsJCmJ0iE26G5jTn4cLxx02rcILLsFU4/qnWKgQAAAAAAAAAAIB/wu/ud3QzpzmnZU5zzuu33Tq2QRiIwTCKoGcQRsgUjEjtUGQE5mEK6riIdAU6x3qv/qq/uLM5zVmXOc1ZlznNWZc5zVmXOc1Z1/MCAAAAAAAAADDZLfZW4UiY3SP5CAfCbIlkEw6E2SOSl/AwNKc5TxfOf25ahfM/w1bh/FOtVQgAAAAAAAD8zxJ7m3AkzL6pfwsHwuwWySocCLNrZMLD0JzmPF04/7lpFRb4DFuF80+1ViHU8QPOGHPm5tzUmwAAAABJRU5ErkJggg==") no-repeat;
    background-size: 100% 100%;
    .table{
      width: 4.37rem;
      height: 3.37rem;
      background: url('../../assets/imgs/table_bg.png');
      background-size: cover;
      position: absolute;
      left: 0;
      top: 1.89rem;
      text-align: left;
      img{
        width: 2.8rem;
        height: 2.8rem;
        margin: -1.26rem 0 0 1.06rem;
      }
      .role_a{
        width: 1.56rem;
        height: 1.89rem;
        background: url('../../assets/imgs/role_a.png');
        background-size: cover;
        margin: .3rem 0 0 .23rem;
      }
    }
    .leaf{
      width: 1.01rem;
      height: .95rem;
      background: url('data:image/png;base64,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');
      background-size: cover;
      position: absolute;
      top: 1.65rem;
      right: .38rem;
    }
    ul{
      padding: .51rem 0 .35rem;
      margin-left: 4.77rem;
      li{
        width: 5.35rem;
        height: 1.1rem;
        margin-bottom: .32rem;
        line-height: 1.1rem;
        background: #9E4F40;
        box-shadow: 0 .04rem .1rem 0 #CD8443;
        border-radius: .16rem;
        font-family: HiraginoSansGB-W6;
        font-weight: bold;
        font-size: .32rem;
        color: #FFFCE7;
        letter-spacing: .02rem;
        text-align: left;
        padding-left: 2.25rem;
        position: relative;
        &.active{
          width: 5.55rem;
          height: 1.3rem;
          margin-bottom: .22rem;
          margin-left: -.1rem;
          background: url('data:image/png;base64,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');
          background-size: 100% 100%;
          box-shadow: none;
          color: #9E4F40;
        }
        .icon{
          position: absolute;
          width: 1.02rem;
          height: .95rem;
          left: .58rem;
          top: -.15rem;
          &.icon1{
            background: url('data:image/png;base64,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');
            background-size: cover;
          }
          &.icon2{
            background: url('data:image/png;base64,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');
            background-size: cover;
          }
          &.icon3{
            background: url('data:image/png;base64,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');
            background-size: cover;
          }
          &.icon4{
            background: url('data:image/png;base64,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');
            background-size: cover;
          }
        }
      }
    }
  }
  .back{
    position: absolute;
    width: .44rem;
    height: .36rem;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAkCAMAAADFCSheAAAAUVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////8IN+deAAAAG3RSTlMAr4wEoiB3q30+j4mna1lFnZaSLRuEdHBcNgzuTD/HAAAAh0lEQVQ4y+XKORLCMBAEwFnLQrfki/P/D8UqIiigZlPouPEipLxUA4Y5SRcNcw/ycFFcmRVXnOJKVFxpius11/zulWV4L5Vrz2chFaAJreHI54TM54yZzxGFzxW3ib2DAezITBfrfp+3C/jiT/em2R6KPYLfPfPbg9/OgrGl/U4rSDasBh/cATbkBoDdSRHxAAAAAElFTkSuQmCC');
    background-size: cover;
    top: .16rem;
    left: .23rem;
  }
  .hv_tip{
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .8);
    z-index: 1001;
    font-size: .32rem;
    font-family: PingFangSC-Semibold;
    font-weight: bold;
    color: #FFD356;
    .icon{
      width: 2.04rem;
      height: 1.53rem;
      margin: 4rem auto 0;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMkAAACWCAMAAABDwFwVAAAApVBMVEUAAADr9f/+///////////+/v/////////7+//////t9v/x9f/////////////w+//////u9v/////u9P/0+f/////+/v/y+f/r9//w+P/1/P////////////////////////////////////////////////////////////////////////////////////////////////////////////////9YCPw6AAAANnRSTlMAGpaLjpuQkQb3GATdoWEJ6BawFAxllB4RDwvx5+Hrh3Uq2cRbtqVtUSMCu518PNBoSqo/ODTmdfBCAAAFfklEQVR42u3d7XKiMBiG4Sd2tYGoiKCCWq3W2s9tt/uR8z+07ZoKVqxg4M0C4/2HX51yTYwMDCbY5Hf7bUuelNXud32UrUFPatUboFTxjtSuw1GiFESXgvI0kLkqzwdsPM0nmY5RkrpS1e60Nt3KlPqtTZ0rqeqiJPXlpiaH6iVN8gcqp/MhQ0lqqxHh+IhPjkNmAlvKlfpTlCR1QXxG1N1xSRdRa3WJREmSmy4Qd3Sm9BF3KTehJCUl4rv1lcO6FlWSAKMf88sDzQcMqJbk686SA50lZ8lZkl71JN3Xyc0vHKhqkob81wFK1SQKIm+QqGKShlRNkKhaki1EviJRpSQRRK6QqEySVixJgQyRrEKSGCKt5VPz+2qB3aoj6cpE0+f7EFGVkbzKQ1k3KwFVZSQT+UXtOwf/qozkRn7Z7HsAoDKSF3mk6RtQGQm68lidoDqSHcp0dXfxtDdxrt6qI9mhzPHe4vrz3PlWHUlMaUM1ms9k3JpXRhJRZtjm3E1iypNfGQlWyYew9jqm3LiVkWBl/RuSB+z2axlRlm5lJFg0buf7p8sb8ajwykgOdx1fWEog+ZZDgntrS7kuVHLpO9ysBL+j7+P7IiUNxpjt+dygBC/bUZksCpWo7IAbk2AVzfrCJQoTCkOSeNr/KFYS53EzEjSlajKikMQWeomzlKo+iUQVCAMS/LGk6p5GogoNSPBdqq44oYS5nF4iXuNJTyNR+eQS/I4HhVLCPEEtwc+d10ge7hdUEuYKasnDx6RfisfG++HJJZIwmxNLcCFVK3Wh7FNIVA6xxN4OykQdAzIJG9NK0JCfeqCTMIdQIhaLhdxt9kgoYZxM8nsp5WyyK2mBUmJzIonXk/s9kEqYLWgkgwTkFrQS5tJI5gnJG7WEhSSS+31IG+QSxikkeNqTXBuQuI8UEmc+2YVYgQEJC2iujOHdMpY0YULCeLGSuLfb7ZAszEhcConqoTWJZwm9hDkkEpXfbbZeYEri7knK+PZgNgkb10Zi10bCnNpIvNpImKiNJKyNxK6NhDm1kYS1kbi1kTBRG8m4NpKgNhK7NhL2mEEyVgtTUBYvZzHWlfB0yWAqDTYdaEqcNAnvSMN1uJbET5OYg8QULUmQIhnI/9BAR+Lho4uDEr8n/0M9X0PiHpd0pepq3cjf5UVKz22p6hYv6ctN6xErIB9p8abc1NeQ2MclbTUihUCYg3SK+oft4iXqgviTFRLPvIaPVbxEbmoWArFPeEVWQ8LMSbwTJOUeE59W4pqTcFqJZ0xig1YSGJMExJLQmIQjPf5yqy3xTUlspKd+l6MpcUxJQqQl1HjoSoQpicj0Zqu+xIYhiYe0RlYuiZdRMhr2esMR6Xz/IVMl72chE32cV5hRMpTvDSmHBPN0yTDpiM7LySjpbfSkX8GX6ZIDIxKdl8goUcccV0VqiQczEnGyRE3/deZP1xhRz+oWh0QS4lRJfLOaccaLxG0nhcTF6ZK+OnYUJTUv+SiAQsI1JNFDnZ/NLA1bH3WixzMEEh8akvwrwBYv8aAjyb8qb+ESV+hI8q+UXLjEFtCR5F69ungJh5Yk94rihUsc6ElyrvJevGQMXUmuipc4qIfE5qiH5B1SD4krUA9JCNRC4nKUVXLa3W/wiNJK1BMJggGJm9NI9J8SuQ70GpiRZM0eQzdmlUjiOcjRtQHJ0MsyHKFArkSfXtKC8I9j3NBB/gYzesl7wgk9++BgBGOBYhJ/+gYkUBw/DDzXZrZtu64X+A5/RJG1qCXHOkvOkrOkLhLL9I5hHaJNfuItlIij33gp3taKNvLNsOKtxp4vDvbtxFp7XX5qXeQGZWV5y/ZTZdiSr0wb+XWkXuXbXJFrUsq44aXxX20UU0l+SfMXG4eQsma3QiYAAAAASUVORK5CYII=');
      background-size: cover;
    }
    p{
      padding-top: .4rem;
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
</style>

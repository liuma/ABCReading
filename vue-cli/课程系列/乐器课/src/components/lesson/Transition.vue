<template>
  <div class="trans">
    <div class="trans_container">
      <p class="txt">{{textArr[ind]}}</p>
      <div class="tag">
        <div class="btn_left" v-show="ind==3" @click="toStudy(5)"></div>
        <div class="btn_right" v-show="ind==3" @click="toStudy(4)"></div>
      </div>
    </div>
    <audio id="audio" class="Hidden" autoplay preload @ended="onEnd()" :src="audio_url" controls></audio>
    <div class="hv_tip">
      <div class="icon"></div>
      <p>请旋转至横屏，体验更佳</p>
    </div>
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
        ind:0,
        id:0,
        num:2,
        ejectText:'',
        ejectStatus: false,
        textArr:['视频欣赏','绘本阅读','互动游戏','动画歌谣'],
        audio_url:''
      }
    },
    created(){
      // this.getInfo()
      // this.shareConfig()
    },
    mounted(){
      this.ind = this.$route.query.part-1 || 0;
      this.id = this.$route.query.id;
      this.audio_url = 'https://qnfile.abctime.com/extend/musical/trans_audio' + this.$route.query.part + '.mp3'
      wx.ready(function () {
        document.querySelector('#audio').play()
      })
    },
    methods: {
      back(){
        this.$router.replace({name:'Cata'})
      },
      onEnd(){
        if(this.ind == 3){

        }else{
          this.toStudy(this.ind+1)
        }
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
          case 5:
            nameStr = 'PartFive'
            conStr = 'song'
            break;
        }
        this.$router.replace({name:nameStr,query:{id:this.id,part:part}})
      },
      showEject: function (text) {
        this.ejectText = text
        this.ejectStatus = true
      },
      initEject: function () {
        this.ejectStatus = false
      }
    }
  }
</script>

<style scoped lang="less">
  .trans_container {
    width: 100%;
    height: 100vh;
    background: #DAF1FF;
    position: relative;
    .txt{
      width: 100%;
      font-family: FZY4JW--GB1-0;
      font-size: .6rem;
      color: #5D5F5E;
      letter-spacing: .0375rem;
      text-align: center;
      position: absolute;
      bottom: 3.9rem;
      text-align: center;
    }
    .tag{
      width: 9.21rem;
      height: 3.02rem;
      background: url('../../assets/imgs/trans_tag.png');
      background-size: cover;
      margin: auto;
      position: absolute;
      left: calc(~'50% - 4.6rem');
      bottom: .88rem;
      .btn_left{
        width: 2.58rem;
        height: 1.08rem;
        background: url('../../assets/imgs/trans_btn1.png');
        background-size: cover;
        position: absolute;
        bottom: 1.27rem;
        left: 3.25rem;
      }
      .btn_right{
        width: 2.58rem;
        height: 1.08rem;
        background: url('../../assets/imgs/trans_btn2.png');
        background-size: cover;
        position: absolute;
        left: 6.13rem;
        bottom: 1.27rem;
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

<template>
  <div class="part">
    <div class="part_container">
      <div class="table">
        <div class="img_box">
          <img :src="cover">
        </div>
        <div class="role_a"></div>
      </div>
      <div class="leaf"></div>
      <ul>
        <li v-for="(item,$index) in partArr" @click="toStudy($index+1)" :class="$index==currentLocation?'current':''">
          <!--<div :class="locationArr[$index]>0?'txt_bg active':'txt_bg'">-->
          <div :class="item.completed?'txt_bg active':'txt_bg'">
            <span :class="item.cls"></span>{{item.txt}}
            <span :class="item.tagCls"></span>
          </div>
        </li>
      </ul>
    </div>
    <eject :message="ejectText" :showState="ejectStatus"></eject>
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
        ind:0,
        content:{},
        partArr:[
          {id:1,cls:'icon icon1',tagCls:'tag tag1',txt:'视频欣赏','completed':false},
          {id:2,cls:'icon icon2',tagCls:'tag tag2',txt:'绘本阅读','completed':false},
          {id:3,cls:'icon icon3',tagCls:'tag tag3',txt:'互动游戏','completed':false},
          {id:4,cls:'icon icon4',tagCls:'tag tag4',txt:'动画歌谣','completed':false}
        ],
        locationArr:[0,0,0,0],
        currentLocation:0,

        nickname:'',
        head_img:'',
        num:2,
        canGroup:true,
        ejectText:'',
        ejectStatus: false,
        cover:''
      }
    },
    created(){
      // this.getInfo()
      // this.shareConfig()
    },
    mounted(){
      this.getCourseInfo()
      this.ind = this.$route.query.id-1 || 0;
      this.cover = localStorage.getItem('musicalPartCover');
    },
    methods: {
      back(){
        this.$router.replace({name:'Cata'})
      },
      getCourseInfo(){
        let member_id = localStorage.getItem('extendAbcMemberid'),lesson_id=this.$route.query.id;
        let wUrl = this.$common.config.gzhUrl + "v3/marketingcourse/course/info"
        let fd = this.$common.getParam('get', {course_id:2,member_id: member_id,lesson_id:lesson_id});
        this.$axios.get(wUrl+'?'+fd).then((res) => {
          if(res.data.code == 200){
            let da = res.data.data
            this.content = da.content;
            this.locationArr = da.location;
            for(var i in this.locationArr){
              if(this.locationArr[i]>0){
                this.currentLocation++;
                this.partArr[i].completed = true
              }
            }
            localStorage.setItem('musicalContent',JSON.stringify(da.content))
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
        if(part<=this.currentLocation+1){
          this.$router.replace({name:'Transition',query:{id:this.ind+1,part:part}})
        }else {
          console.log('fff')
          this.showEject('完成上一个环节才能解锁哦～')
        };
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
  .part_container {
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(#A0EFFF 50%,#91D9F2 50%);
    background-size:100% 1.4rem;
    .table{
      width: 4.37rem;
      height: 3rem;
      background: url('../../assets/imgs/table_bg.png');
      background-size: cover;
      position: absolute;
      left: 0;
      top: 2.2rem;
      text-align: left;
      .img_box{
        width: 2.8rem;
        height: 2.8rem;
        box-shadow: 0 .04rem .1rem 0 #978360;
        margin: -1.26rem 0 0 1.06rem;
        background: #fff;
        border-radius: .36rem;
        img{
          width: 2.4rem;
          height: 2.4rem;
          margin: .2rem 0 0 .2rem;
        }
      }
      .role_a{
        width: 1.44rem;
        height: 1.69rem;
        background: url('../../assets/imgs/role_a.png');
        background-size: cover;
        margin: 0.2rem 0 0 2.62rem;
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
      padding: .26rem 0 .1rem;
      margin-left: 4.89rem;
      li{
        width: 7.38rem;
        height: 1.44rem;
        background: url('../../assets/imgs/part_item_bg.png');
        background-size: cover;
        font-family: HiraginoSansGB-W6;
        font-weight: bold;
        font-size: .32rem;
        color: #FFFCE7;
        letter-spacing: .02rem;
        text-align: left;
        position: relative;
        margin-bottom: .13rem;

        .txt_bg{
          width: 5.22rem;
          height: 1.06rem;
          line-height: 1.06rem;
          padding-left: 1.16rem;
          background: url('../../assets/imgs/bg_def.png');
          background-size: cover;
          position: absolute;
          top: .22rem;
          left: .85rem;
          font-family: FZY4JW--GB1-0;
          font-weight: bold;
          font-size: .32rem;
          color: #464646;
          letter-spacing: .02rem;
          text-align: left;
          &.active{
            background: url('../../assets/imgs/bg_ed.png');
            background-size: cover;
          }
        }
        &.current{
          background: url('../../assets/imgs/part_item_bg_current.png');
          background-size: cover;
        }
        .icon{
          position: absolute;
          width: .94rem;
          height: .88rem;
          left: -.4rem;
          top: .055rem;
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
        .tag{
          position: absolute;
          left: 4.11rem;
          top: .18rem;
          &.tag1{
            width: 1.88rem;
            height: .68rem;
            background: url('../../assets/imgs/tag1.png');
            background-size: cover;
          }
          &.tag2{
            width: 1.08rem;
            height: .68rem;
            background: url('../../assets/imgs/tag2.png');
            background-size: cover;
          }
          &.tag3{
            width: 1.88rem;
            height: .68rem;
            background: url('../../assets/imgs/tag3.png');
            background-size: cover;
          }
          &.tag4{
            width: 1.08rem;
            height: .68rem;
            background: url('../../assets/imgs/tag4.png');
            background-size: cover;
          }
        }

      }
    }
  }
  .back{
    position: absolute;
    width: .54rem;
    height: .59rem;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA7CAMAAAAHBYkxAAAAz1BMVEUAAACtXSfsgDmsXCfadjSsWyesWyjtgTzlfDfsgDnHay/sgDmrXCjsgDnrgDnsgDqsXCjsgDmsXCjrgDmsWyfsgDqsXSntgDnsgDvsgTqtWyjrgTutXCjtgTutXinrgTvugj6wYCjwgz6yXS7/qlXScDKrWyjrfzm4YyzrfzmrWyf////1wqH87ePtjE27ZCzmfDfScDH98ergeTXDaC70uZPtkFS0YCn76t741L330Lfyq33++PX75dfwoW3528jvmmPulFrrgTvxpnXsiUiyFroIAAAAKXRSTlMAQOzs/t2WP/z5/fv639rLy7+/tradnZiUbW1nZ1dXQS0tISED/Pnv7wOIpW0AAAIjSURBVEjHndXpeppQEIDhYRfjHpdo3DXLDE0ApcUtpml7/9dUKDYpnI3m++vzPnM2FXjNh4N2XXddvd4eDOdQKqenYy695yjRpIGcGhMpmjVRUHMmRMtrlHS9FGxKR2k6d4u3Lipybxm0vsES3awLLFNqV1ghliy3Tscty1znQy2FZ/hzvz8XzvPjHoT39cVLOhbu7/1tSJW3w3yzC2tKlbcpvrNMTeTKO2Ch7F035OrpF/N9SJWjUM/I5CSsp1JsvYTpKsWmA8zVim0OQ7ViG8JArdgG0FYrtjbUsdCrWmEdHtSz2B7gCvNtWMV2JWKbb3JWwXxfvRKuwjA8qF3CTMT/n2fCHX7C3UEVxe7lh4BV4REl7ruAPYIVcJ2UBRZ0QhS6nWCRYQdsH7kdn06vyZG8vSGbb8OItijs+SU5F+aZbWkEC4rEbO8l7bFQRAsAQzLulLITM8wAgD75Qrbj/Zj71E+YRmSK2JHz12ESaZBkURyI3PlwOBfuLCYL0qZEPpbOJ5rCn1pEUVkVEbUgSyOisJwKKd3ZpW7BSVUX/rYyiCgqtUIyVvCeViMiP5CjwCeimgb/NKak2JQpM6akMeSyKc3fitDWpzQb8q0zR9GWiyLK1BqKjWuUTQyDwp5CP/ukNgZOmkGX4mpoVoIEVMywGtMlQwNuqy5J6q5AlNYSoZYGsqYWD1lTUKX1jbwx+hqUajGyO5Zxf29YHXu0AE6/AZNVmZgnIaFjAAAAAElFTkSuQmCC');
    background-size: cover;
    top: .18rem;
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

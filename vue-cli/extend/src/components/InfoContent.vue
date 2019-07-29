<template>
  <div>
    <div class="content">
      <div class="con_box">
        <div class="info">
          <p class="title">0元体验ABC Reading</p>
          <p class="title_mid">7天畅读RAZ原版在线绘本</p>
          <img src="../assets/imgs/login_info2.png" class="info_img2">
          <p class="content_tip">and more......</p>
          <p class="title_mid">5天亲子英语伴读课</p>
          <ul class="day5">
            <li><img src="../assets/imgs/login_info_ft1.png"><p>场景对话</p></li>
            <li><img src="../assets/imgs/login_info_ft2.png"><p>绘本精读</p></li>
            <li><img src="../assets/imgs/login_info_ft3.png"><p>儿歌拓展</p></li>
          </ul>
        </div>
      </div>
      <div class="con_box">
        <div class="info">
          <p class="title">孩子坚持分级阅读的收获</p>
          <ul class="info3">
            <li><span class="icon icon1"></span>海量单词积累阅读量</li>
            <li><span class="icon icon2"></span>减少入学英语学习压力</li>
            <li><span class="icon icon3"></span>养成自主阅读习惯</li>
            <li><span class="icon icon4"></span>提高英语听、说、读能力</li>
          </ul>
          <p class="title">ABC Reading 是什么？</p>
          <p class="text">ABC Reading是好未来（原学而思）教育集团斥资数千万美元，独家引进知名分级阅读Reading A~Z版权,并贴合中国儿童特点研发的适合3-12岁孩子的英语分级阅读产品，涵盖27个级别，同步美国官网的千余本在线原版绘本。</p>
          <p class="title">ABC Reading 有什么？</p>
          <img src="../assets/imgs/login_info1.png" class="info_img">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoContent'
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
  /*公用内容*/
  .content {
    background: #35ADF2;
    padding-bottom: .5rem;
    .title_box {
      width: 100%;
      margin: 0 auto .4rem;
      position: relative;
      text-align: center;
      font-family: Helvetica;
      font-size: .36rem;
      color: #FFFBBF;
      letter-spacing: .015rem;
      text-align: center;
      line-height: 1;
      div {
        position: absolute;
        width: .1rem;
        height: .1rem;
        border-radius: 50%;
        border: .01rem solid #FFFBBF;
        &.left {
          left: 0;
          top: .12rem;
          margin-left: .9rem;
          &::after {
            content: '';
            width: 1.04rem;
            height: .01rem;
            background: #FFFBBF;
            border-radius: .02rem;
            position: absolute;
            left: .1rem;
            top: .04rem;
          }
        }
        &.right {
          right: 0;
          top: .12rem;
          margin-right: .9rem;
          &::after {
            content: '';
            width: 1.04rem;
            height: .01rem;
            background: #FFFBBF;
            border-radius: .02rem;
            position: absolute;
            right: .1rem;
            top: .04rem;
          }
        }
      }
    }
    .info{
      margin: auto;
      margin-top: .6rem;
      width: 6.6rem;
      background: #fff;
      border-radius: .2rem;
      position: relative;
      text-align: center;
      padding: .4rem 0 .6rem;
      .hd{
        width: 6.78rem;
        position: absolute;
        left: -.09rem;
        top: -.6rem;
      }
      .title{
        font-family: Helvetica;
        font-size: .24rem;
        color: #F38320;
        letter-spacing: 0;
        text-align: left;
        padding: .2rem 0 0 .88rem;
        position: relative;
        &::before{
          content: '';
          width: .06rem;
          height: .26rem;
          background: #FFBC81;
          border-radius: .03rem;
          position: absolute;
          left: .66rem;
          top: .23rem;
        }
      }
      .title_mid{
        font-family: PingFangSC-Semibold;
        font-weight: bold;
        font-size: .26rem;
        color: #35ADF2;
        letter-spacing: 0;
        text-align: center;
        position: relative;
        display: inline-block;
        margin: .22rem auto;
        &::before{
          content: '';
          width: .06rem;
          height: .06rem;
          background: #35ADF2;
          border-radius: .03rem;
          position: absolute;
          left: -.18rem;
          top: .15rem;
        }
        &::after{
          content: '';
          width: .06rem;
          height: .06rem;
          background: #35ADF2;
          border-radius: .03rem;
          position: absolute;
          right: -.18rem;
          top: .15rem;
        }
      }
      .content_tip{
        font-family: PingFangSC-Semibold;
        font-weight: bold;
        font-size: .2rem;
        line-height: .7rem;
        color: #89D4FF;
        letter-spacing: 0;
        text-align: center;
      }
      .text{
        text-align: left;
        width: 5.68rem;
        margin: auto;
        text-indent: 2em;
        font-family: PingFangSC-Regular;
        font-size: .24rem;
        color: #4A4A4A;
        letter-spacing: 0;
        line-height: .5rem;
      }
      .info_img{
        width: 5.2rem;
        margin-top: .2rem;
      }
      .info_img2{
        width: 4.7rem;
        margin-top: .2rem;
      }
      .info3{
        li{
          height: .52rem;
          line-height: .52rem;
          text-align: left;
          padding-left: .88rem;
          font-family: PingFangSC-Regular;
          font-size: .24rem;
          color: #2E2E2E;
          letter-spacing: 1px;
          .icon{
            display: inline-block;
            width: .3rem;
            height: .3rem;
            margin: .11rem .22rem 0 0;
            vertical-align: top;
            &.icon1{
              background: url('../assets/imgs/login_info_icon1.png');
              background-size: cover;
            }
            &.icon2{
              background: url('../assets/imgs/login_info_icon2.png');
              background-size: cover;
            }
            &.icon3{
              background: url('../assets/imgs/login_info_icon3.png');
              background-size: cover;
            }
            &.icon4{
              background: url('../assets/imgs/login_info_icon4.png');
              background-size: cover;
            }
          }
        }
      }
      .day5{
        display: flex;
        align-items: center;
        li{
          flex: 1;
          img{
            width: 1.18rem;
          }
          p{
            font-family: PingFangSC-Regular;
            font-size: .24rem;
            color: #4A4A4A;
            letter-spacing: 0.55px;
            text-align: center;
            padding-top: .18rem;
          }
        }
      }
    }
  }
</style>

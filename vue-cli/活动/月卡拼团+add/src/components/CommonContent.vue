<template>
  <div>
    <div class="content">
      <div class="title_box">
        <div class="left"></div>
        ABC Reading
        <div class="right"></div>
      </div>
      <div class="content1">
        <p>
          “ABC Reading”是好未来（学而思）教育斥资数千万美金独家引进美国知名分级阅读系列 ReadingA-Z ，并且贴合中国孩子特点研发的适合国内3-12岁孩子使用的英语阅读产品，涵盖27个级别，2000本原版绘本。
        </p>
      </div>
      <div class="title_box">
        <div class="left"></div>
        会员权益
        <div class="right"></div>
      </div>
      <div class="content2">
        <ul>
          <li>
            <img src="../assets/imgs/vip1.png">
            <p>27个级别 2000+绘本</p>
          </li>
          <li>
            <img src="../assets/imgs/vip2.png">
            <p>专属学习计划</p>
          </li>
          <li>
            <img src="../assets/imgs/vip3.png">
            <p>专属社群 学习增值</p>
          </li>
          <li>
            <img src="../assets/imgs/vip4.png">
            <p>独家配套 名师精讲</p>
          </li>
        </ul>
      </div>
      <div class="title_box">
        <div class="left"></div>
        产品特色
        <div class="right"></div>
      </div>
      <div class="content3">
        <ul>
          <li>
            <p class="text1">科学学习闭环</p>
            <p class="text2">课前单词预习-课中阅读-课后习题测试</p>
            <div class="img_wrap">
              <img src="../assets/imgs/con1.png">
            </div>
          </li>
          <li>
            <p class="text1">AI智能跟读打分</p>
            <p class="text2">孩子英语开口神器</p>
            <div class="img_wrap">
              <img src="../assets/imgs/con2.png">
            </div>
          </li>
          <li>
            <p class="text1">单词针对性练习</p>
            <p class="text2">常用500词 学、认、练</p>
            <div class="img_wrap">
              <img src="../assets/imgs/con3.png">
            </div>
          </li>
          <li>
            <p class="text1">寓教于乐</p>
            <p class="text2">亲子互动、游戏PK</p>
            <div class="img_wrap">
              <img src="../assets/imgs/con4.png">
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="ft_tal">
      <div class="tal_logo"></div>
      <p>（好未来独家引进版权）</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '我是体验页'
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      console.log(this.$axios)
    }
  }
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
  /*公用内容*/
  .content {
    .title_box {
      width: 100%;
      margin: 1.35rem auto .4rem;
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
        border: .01rem solid #ADE1FF;
        &.left {
          left: 0;
          top: .12rem;
          margin-left: .9rem;
          &::after {
            content: '';
            width: 1.04rem;
            height: .01rem;
            background: #ADE1FF;
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
            background: #ADE1FF;
            border-radius: .02rem;
            position: absolute;
            right: .1rem;
            top: .04rem;
          }
        }
      }
    }
    .content1 {
      width: 6.6rem;
      height: 2.6rem;
      margin: auto;
      background: rgba(31, 100, 212, .6);
      border: .03rem solid #2CA3F6;
      border-radius: .38rem;
      font-family: PingFangSC-Medium;
      font-weight: bold;
      font-size: .24rem;
      color: #FFFFFF;
      letter-spacing: 0;
      line-height: .5rem;
      p {
        width: 6rem;
        margin: auto;
        margin-top: .27rem;
      }
    }
    .content2 {
      width: 5.8rem;
      margin: auto;
      font-size: 0;
      li {
        width: 50%;
        display: inline-block;
        font-size: .24rem;
        color: #FFFFFF;
        letter-spacing: .005rem;
        text-align: center;
        line-height: .3rem;
        img {
          width: 1.1rem;
          height: 1.1rem;
        }
        p {
          margin: .25rem 0 .48rem;
        }
      }
    }
    .content3 {
      li {
        .text1 {
          font-family: PingFangSC-Semibold;
          font-weight: bold;
          font-size: .34rem;
          color: #FFFFFF;
          letter-spacing: .03rem;
          text-align: center;
          margin-top: .32rem;
        }
        .text2 {
          font-family: PingFangSC-Medium;
          font-weight: bold;
          font-size: .24rem;
          color: #FFFFFF;
          letter-spacing: 0;
          text-align: center;
        }
        .img_wrap {
          width: 6.8rem;
          height: 3.17rem;
          margin: auto;
          margin-top: .22rem;
          background: url('../assets/imgs/con_bg.png') no-repeat;
          background-size: cover;
          img {
            width: 4.86rem;
            height: 2.74rem;
            margin-top: .23rem;
          }
        }
      }
    }
  }

  //底部tal标识
  .ft_tal {
    padding: .7rem 0 .3rem;
    .tal_logo {
      width: 1.69rem;
      height: .39rem;
      margin: auto;
      background: url('../assets/imgs/tal.png') no-repeat;
      background-size: 100%;
    }
    p {
      font-size: .24rem;
      color: #002C53;
      letter-spacing: .057rem;
      text-align: center;
    }
  }
</style>

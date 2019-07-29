<template>
  <div class="catalog">
    <header>
      <img src="https://qnfile.abctime.com/extend/list_lesson8.png"/>
      <div class="info_hd">
          <p class="name">国宝奇遇记</p>
          <p class="desc">给孩子看的动画版“国宝档案”</p>
          <div class="progress_wrap">
            学习进度
            <div class="progress_all">
                <div class="progress_current" :style="'width:'+ (completeNum/courseArr.length*5 + 0.74) +'rem'">{{completeRate}}</div>
            </div>
          </div>
      </div>
    </header>
    <nav>
      <div class="nav_hd">
        <p class="nav_title">课程章节</p>
        <span class="all_num">共{{courseArr.length}}节</span>
        <ul v-if="showNav">
          <li v-for="(item,$index) in navArr" @click="nav_ind=$index" :class="nav_ind==$index?'active':''">
            {{item}}
          </li>
        </ul>
      </div>
    </nav>
    <div class="list_wrap">
        <div class="list" v-for="(item,index) in courseArr">
            <div :class="item.is_finish?'course_wrap completed':'course_wrap'" @click="toPart(item.id,index)" :id="'ind'+index" v-show="index<(nav_ind*10+10) && index>=nav_ind*10">
                <span class="course_ind">第{{index+1}}节</span>
                <span class="course_name">{{item.name}}</span>
                <div class="icon"></div>
            </div>
        </div>
    </div>
    <eject :message="ejectText" :showState="ejectStatus"></eject>
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
        scoLeft:0,
        navArr:[],
        nav_ind:0,
        navSubArr:[],
        completeNum:0,
        completeRate:'',
        showNav: true
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
      // this.box = this.$refs.viewBox;
      // // 监听这个dom的scroll事件
      // this.box.addEventListener('scroll', () => {
      //   this.scoLeft = this.$refs.viewBox.scrollLeft;
      // }, false)
    },
    methods: {
      toPart(id,no){
        this.$router.push({name:'Lesson',query:{id:id}})
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
        let fd = this.$common.getParam('get', {course_id:3,member_id: member_id});
        this.$axios.get(wUrl+'?'+fd).then((res) => {
          console.log(res.data)
          if(res.data.code == 200){
            this.courseArr = res.data.data.list
            this.completeNum = res.data.data.unlock_count
            console.log(this.completeNum)
            this.completeRate = parseInt(this.completeNum/this.courseArr.length * 100)+ '%'
            let navLen = Math.floor(this.courseArr.length / 10);
            let navL = this.courseArr.length - (navLen * 10);
            if(this.courseArr.length<=10){
                this.showNav = false
            }
            if(navL>0){
              navLen++
            }
            for(let i=0;i<navLen;i++){
              let numMax = i*10 + 10;
              if(numMax>this.courseArr.length){
                numMax = this.courseArr.length
              }
              this.navArr.push((i*10 + 1)+'-'+numMax)
            }
            console.log(this.navArr)
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
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    position: relative;
    background: #FCFCFC;
    padding-bottom: .9rem;
    header{
      position: relative;
      img{
        width: 100vw;
        height: 3.57rem;
      }
      .info_hd{
          background: #fff;
          box-shadow: 0 .02rem .06rem 0 rgba(0,0,0,.1);
          text-align: left;
          padding: .24rem 0 .32rem .32rem;
          .name{
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            font-size: .36rem;
            color: #333;
            letter-spacing: 0;
          }
          .desc{
            font-family: PingFangSC-Regular;
            font-size: .24rem;
            color: #999;
            letter-spacing: 0;
            width: 6.8rem;
          }
      }
      .progress_wrap{
        font-family: PingFangSC-Semibold;
        font-weight: bold;
        font-size: .24rem;
        color: #333;
        letter-spacing: 0;
        margin-top: .28rem;
        .progress_all{
          display: inline-block;
          vertical-align: top;
          margin: 0 0 0 .16rem;
          width: 5.74rem;
          height: .28rem;
          background: #ECECEC;
          border-radius: .14rem;
          position: relative;
          .progress_current{
            // width: 1.6rem;
            height: .28rem;
            background: #6EBC2F;
            border-radius: .14rem;
            font-family: PingFangSC-Semibold;
            font-size: .21rem;
            color: #FFF;
            text-align: center;
            letter-spacing: 0;
            line-height: .28rem;
          }
        }
      }
    }
    nav{
      text-align: center;
      .nav_hd{
        width: 100vw;
        // height: 1.28rem;
        margin: .28rem auto 0;
        background: #fff;
        position: relative;
        .nav_title{
            text-align: left;
            font-family: PingFangSC-Semibold;
            font-size: .32rem;
            color: #333;
            letter-spacing: 0;
            padding: .24rem  0 .12rem .32rem;
        }
        .all_num{
            font-family: PingFangSC-Regular;
            font-size: .24rem;
            color: #999;
            position: absolute;
            top: .32rem;
            right: .32rem;
        }
        ul{
          font-size: 0;
          width: 7.34rem;
          height: .48rem;
          margin: .11rem auto 0;
        //   position: absolute;
        //   left: .08rem;
        //   bottom: 0;
          white-space: nowrap;
          overflow-x: scroll;
          overflow-y: hidden;
          &::-webkit-scrollbar {display:none}
          li{
            display: inline-block;
            font-family: Helvetica;
            font-family: PingFangSC-Regular;
            font-size: .28rem;
            color: #666;
            letter-spacing: 0;
            text-align: center;
            width: 1.12rem;
            height: .36rem;
            padding-bottom: .12rem;
            position: relative;
            margin: 0 .08rem;
            &.active{
              color: #6EBC2F;  
              &::after{
                content: '';
                width: 1.12rem;
                height: .06rem;
                border-radius: .03rem;
                background: #6EBC2F;
                position: absolute;
                bottom: .05rem;
                left: 0;
              }
            }
          }
        }
      }
      .nav_sub_wrap{
        width: 7rem;
        margin: auto;
        background: #fff;
        border-radius: 0 0 .4rem .4rem;
        .nav_sub{
          width: 6rem;
          margin: auto;
          font-size: 0;
          padding-bottom: .3rem;
          .nav_sub_ind{
            display: inline-block;
            width: .6rem;
            font-family: FZY4JW--GB1-0;
            font-size: .3rem;
            color: #A4A4A4;
            letter-spacing: .02rem;
            padding: .3rem 0 0;
          }
        }
      }
    }
    .list_wrap{
        background: #fff;
        margin-top: .34rem;
        .list{
            .course_wrap{
                width: 6.86rem;
                height: .88rem;
                line-height: .88rem;
                background: #FFFFFF;
                box-shadow: 0 .02rem .06rem .01rem rgba(0,0,0,.14);
                border-radius: .16rem;
                margin: .28rem auto;
                font-family: PingFangSC-Regular;
                font-size: .28rem;
                color: #333;
                letter-spacing: 0;
                text-align: left;
                position: relative;
                .course_ind{
                    display: inline-block;
                    vertical-align: top;
                    width: 1.1rem;
                    padding-left: .24rem;
                }
                .course_name{
                    display: inline-block;
                    vertical-align: top;
                    width: 3.8rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .icon{
                    width: .33rem;
                    height: .4rem;
                    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAoCAMAAABHNWOVAAAAflBMVEUAAAD/t4X/rX3/tIH/rHb/rXb/qnT/q3P/rHb/rHf/s3v/rHT/qnT/q3P/rHT/rHX/rHP/q3T/q3T/qnP/q3T/rXX/qnP/q3L/qnP/q3P/q3L/q3L/q3P/q3P/q3P/qnT/q3P/rHX/qnL/qnP/qnP/q3L/qnP/q3T/q3P/qnKtOEgRAAAAKXRSTlMABAwHHBFNMhkVCiA8NigvKyVXSUUiZfdSv+zMsp16b15B6eLY8qmRg5BMRyMAAAFcSURBVDjLnZTnloQgDIUXFRQp9jZO0em8/wsuOCVHR5g9e//mOzchJPn5oxDyfR8h5Ih7GGMv9i2IiUeMsYDiGKF1gDK+666tDKi3ZoNiWhUbpbUTWbRm4+Mg6dSkc54ysIEkOOMX9VBzC8EGkkRpqd7qSRrguQ3yoqRQoMs9rB42QAShIUBdKZ82QBA10+aQVKbgTwK05TIwmeyEOtXJ9G4b8WqfRuyEaZ80iINQTa0RJ6GOgmEfuQhVSxp/IRKdxpml+EI0+zF1ZjntiahclW4Hwl2vPd5zwvWkWDvW1XkppAEsv38byKjnyPpz/SEvRAqbsSSa3dCOMM+fxFkb8PdOwCQ3L4Pr0JZPg/k29K8maYP3cMFGUckPm6lJdTu9cXkDfMzCst723V43aTbkUAjNREnalowCFmVxHaIsEZyLlEGJS4QGVVaxCAw+kNhcKRMHYIFMl87E/6VfaMZVHkCd238AAAAASUVORK5CYII=');
                    background-size: cover;
                    position: absolute;
                    top: .24rem;
                    right: .2rem;
                }
                &::before{
                    content: '';
                    width: .08rem;
                    height: .08rem;
                    line-height: .33rem;
                    text-align: center;
                    border-radius: 50%;
                    background: #FFAA72;
                    position: absolute;
                    top: .08rem;
                    left: .08rem;
                }
                &.completed{
                    &::after{
                        content: '已学';
                        width: .72rem;
                        height: .34rem;
                        line-height: .34rem;
                        text-align: center;
                        border-radius: .165rem;
                        background: rgba(110,188,47,.6);
                        font-family: PingFangSC-Semibold;
                        font-size: .2rem;
                        color: #FFF;
                        font-size: .2rem;
                        color: #fff;
                        letter-spacing: 0;
                        position: absolute;
                        top: .27rem;
                        right: .84rem;
                    }
                    &::before{
                        content: '';
                        background: #6EBC2F;
                    }
                    .icon{
                        width: .48rem;
                        height: .48rem;
                        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAkFBMVEX///9uvC/9/vz4/PXw+On7/fn2+/LT68Hi8tb5/ffy+ez0+u/d8M/r9uLp9d/n9N3h8dTk89jX7sbV7MLQ6rzu9+fs9uTt9+bl89vN6bd6wkByvjXa78rG5q7D5KnK57Ol1n+a0W6SzWKLyli84J6Ex05/xEd2wDq33pm03JS+4aKt2oms2Yif03We03WUzmauADSoAAABd0lEQVRIx+2V2XqDIBCFy6C4AOIet2iiaZau7/92xVLb3FSH23491/PPAWc4PvzLUgDggha23A0oY4wGLiDrKXeKsixChkIAKC/FYXzL1Y5TBAEBl1lDtA6xdBAmwIpkJJ96rKttE3B5JC7EqH3xpb4JwOqJQtWRb02eKtZNgDpJRn50uSXGZAXwPXKvMVWOMUECpHlKytkEBRgdReQwbYIGyHlflaEmkICZYhQyF5CAmWLkaAIPkHYfhdQGIE280xYWANEWgRXQVw61AZo0sQLaa6dsjnQ+ZbG0uPRx7wmlh438rM1tyITCD27s8zTW9QFuNS7Pg9fNzwi5fFNfp2KJnG2gPQx550vHvNJfgOxuR091JkzYrIVAu7R/HfRto9U4AxpW6fQ1q2vtrbc3SRmJvjGzMu3peu67rPDT/ji9z6c3mbSRrZTLOM3z3Ot0e0R+g0tDmQghYlUukbdJ8KKUsgiXKNokIKCMs7kcsP9EVwt0+V/XB+lLGU1dPr8LAAAAAElFTkSuQmCC');
                        background-size: cover;
                        position: absolute;
                        top: .2rem;
                        right: .12rem;
                    }
                }
            } 
        }
    }
  }
</style>

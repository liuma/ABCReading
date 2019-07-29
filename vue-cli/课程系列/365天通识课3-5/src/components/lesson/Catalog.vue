<template>
  <div class="catalog">
    <header>
      <img src="../../assets/imgs/lesson_hd.png" alt="">
    </header>
    <nav>
      <div class="nav_hd">
        <p class="nav_title">课程章节</p>
        <ul>
          <li v-for="(item,$index) in navArr" @click="nav_ind=$index" :class="nav_ind==$index?'active':''">
            {{item}}
          </li>
        </ul>
      </div>
      <div class="nav_sub_wrap">
        <div class="nav_sub">
          <!--<a v-for="(item,index) in courseArr" :href="'#ind'+index" class="nav_sub_ind" v-show="index<(nav_ind*20+20) && index>=nav_ind*20"></a>-->
          <div v-for="(item,index) in courseArr" @click="toPart(item.id,index)" class="nav_sub_ind" v-show="index<(nav_ind*20+20) && index>=nav_ind*20">
            {{index+1}}
          </div>
        </div>
      </div>
    </nav>
    <div class="list" v-for="(item,index) in courseArr">
      <div :class="item.is_finish?'course_wrap completed':'course_wrap'" @click="toPart(item.id,index)" :id="'ind'+index" v-show="index<(nav_ind*20+20) && index>=nav_ind*20">
        <span class="course_ind">第{{index+1}}节</span>
        <span class="course_name">{{item.name}}</span>
        <div class="icon"></div>
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
        navSubArr:[]
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
        this.$router.push({name:'Lesson',query:{id:id,no:no}})
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
            let navLen = Math.floor(this.courseArr.length / 20);
            let navL = this.courseArr.length - (navLen * 20)
            if(navL>0){
              navLen++
            }
            for(let i=0;i<navLen;i++){
              let numMax = i*20 + 20;
              if(numMax>this.courseArr.length){
                numMax = this.courseArr.length
              }
              this.navArr.push((i*20 + 1)+'-'+numMax)
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
    background: #EFF9EA;
    padding-bottom: .9rem;
    header{
      position: relative;
      img{
        width: 100vw;
        height: 3.57rem;
      }
      .progress_wrap{
        position: absolute;
        left: .53rem;
        top: 2.18rem;
        font-family: FZY4JW--GB1-0;
        font-weight: bold;
        font-size: .24rem;
        color: #FFFFFF;
        letter-spacing: 0;
        .progress_all{
          display: inline-block;
          vertical-align: top;
          margin-top: .03rem;
          width: 2.08rem;
          height: .21rem;
          background: #FFFFFF;
          border-radius: .105rem;
          position: relative;
          .progress_current{
            width: .6rem;
            height: .21rem;
            background: #F19CF0;
            border-radius: .105rem;
            font-family: PingFangSC-Semibold;
            font-size: .15rem;
            color: #FFFFFF;
            letter-spacing: .01rem;
            text-align: center;
            line-height: .21rem;
          }
        }
      }
    }
    nav{
      text-align: center;
      .nav_hd{
        width: 7rem;
        height: 1.32rem;
        margin: auto;
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArwAAACEBAMAAACAIuWZAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAhUExURUxpcf7TJvzSJfzRJf3SJf/aLvzSJf3SJf/VKP/TJvzRJcMzBNYAAAAKdFJOUwBQb+WQDsyvITchajGUAAACuklEQVR42u3ZzW8SQRiA8VW7pt666AVPZYIXT5pVYjhVnITEU6Mh2XhqQrIYzoRJOJmYGnqTm9ubXS1x/0pnt6WyyEc/eBHp8xwJA9lfhpmdxXHyuYV6s5rY4latuO/QwtxBuXsmVumU5ou5j9rJeHbAN4xncx3ZyZgDO309h+vBm2RKlY4qfsIy3/ZATcie9+LrrCF3q8nM/JZmIo+mrO76s6Xi3enj3s3RHU1ko0vFw9sKGwwK2jQXIsVPpg2+s1h3NL7VqZWiW6QcRIVyvXt5n50pi0kvuWJxaGql4iavGO7RoFA2YfWqMsO/t6qHyXXzQ6OVt0mzOYg8pU3oX5vk+eQnbiU3L3O28/k/hQ7sXL2Z6p/2Jn4G7WSZWehOTXlWes2XDteaeqpcXw7q2P1v/rq/JFLFFUutrbUX9RvrINroR54V1Za0WRW77I+5fU3ueyaw/TA0RmulStY76h8KizeCfmQ1C0ppbUwY+iu70PHd7XPy74p9S27NLXrKnsGn9LZ+WuOs3K/NPX8xe0P21nRMOliln2JSydBfmeW0XomtvJRffe+jsfwOLnjfgrH8flwch7GQaGcNNrYNbrS59aCQaMjasILV4T0QMr3MeJ8CIdNJxlsFQug8mv3DhoNU6b9u92CQ6pnlPYZBql+ciIXPxS47m9zets+hQvZgsQWCXHs865XswPkAglw/nccgyPWdJw6SnXDbK3vj2wNBrqHTBkGuUx5Hih7b4JXlxUAyeOGFl+CFF16CF154CV544SV44SV44YWX4IUXXoIXXngJXngJXnjhJXjhhZfghRdeghdeeAleeAleeOEleOGFl+CFF16CF16CF154CV544SV44YWX4IUXXoIXXoIXXngJXnjhJXjhhZfghZfghRdeghdeeAleeOEleOEleOGFl+CFF166fL8BwHnewUYarfkAAAAASUVORK5CYII=');
        background-size: cover;
        position: relative;
        .nav_title{
          font-family: FZY4JW--GB1-0;
          font-weight: bold;
          font-size: .45rem;
          color: #FFFFFF;
          letter-spacing: .01rem;
          text-align: center;
          padding-top: .25rem;
        }
        ul{
          font-size: 0;
          width: 6rem;
          height: .48rem;
          margin: auto;
          position: absolute;
          left: .5rem;
          bottom: 0;
          white-space: nowrap;
          overflow-x: scroll;
          li{
            display: inline-block;
            font-family: Helvetica;
            font-size: .3rem;
            color: #FFFFFF;
            letter-spacing: 0;
            width: 20%;
            padding-bottom: .12rem;
            position: relative;
            &.active{
              &::after{
                content: '';
                width: .71rem;
                height: .07rem;
                background: rgba(255,255,255,.7);
                border-radius: .04rem .04rem 0 0;
                position: absolute;
                bottom: 0;
                left: calc(~'50% - .355rem');
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
    .list{
      .course_wrap{
        width: 6.54rem;
        height: .9rem;
        line-height: .9rem;
        background: #FFFFFF;
        box-shadow: 0 .03rem .09rem 0 rgba(0,0,0,0.08);
        border-radius: .45rem;
        margin: .2rem auto;
        font-family: FZY4JW--GB1-0;
        font-weight: bold;
        font-size: .28rem;
        color: #333333;
        letter-spacing: 0;
        text-align: left;
        position: relative;
        .course_ind{
          display: inline-block;
          vertical-align: top;
          width: 1.15rem;
          padding-left: .25rem;
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
          width: .14rem;
          height: .26rem;
          background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAaBAMAAAB1IXBvAAAAElBMVEUAAADznvPynPHynPHynPHxnPAQqUjDAAAABXRSTlMAFdTEtTuxabkAAAAmSURBVAjXY3AWYAADU0UILRQEEWBUpaZAMIyGicPUUcZFuBvmDwDUOwlrl6IFYQAAAABJRU5ErkJggg==');
          background-size: cover;
          position: absolute;
          top: .33rem;
          right: .25rem;
        }
        &::after{
          content: '待学';
          width: .69rem;
          height: .33rem;
          line-height: .33rem;
          text-align: center;
          border-radius: .165rem;
          background: #F19CF0;
          font-family: FZY4JW--GB1-0;
          font-weight: normal;
          font-size: .2rem;
          color: #fff;
          letter-spacing: 0;
          position: absolute;
          top: .29rem;
          right: .54rem;
        }
        &.completed{
          &::after{
            content: '已学';
            background: #00C321;
          }
          .icon{
            width: .14rem;
            height: .26rem;
            background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAaBAMAAAB1IXBvAAAAElBMVEUAAAAAziQAxCIAwyIAxCIAwyHWfixRAAAABXRSTlMAFdTEtTuxabkAAAAmSURBVAjXY3AWYAADU0UILRQEEWBUpaZAMIyGicPUUcZFuBvmDwDUOwlrl6IFYQAAAABJRU5ErkJggg==');
            background-size: cover;
            position: absolute;
            top: .33rem;
            right: .25rem;
          }
        }
      }
    }
  }
</style>

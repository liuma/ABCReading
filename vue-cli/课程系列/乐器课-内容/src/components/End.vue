<template>
  <div class="end">
    <div class="wrap">
      <img class="posterImg" src="https://qnfile.abctime.com/extend/musical/poster.png">
      <p class="save_txt">长按图片保存奖状</p>
      <div class="back" @click="back"></div>
    </div>
  </div>
</template>
<script scoped>
  import QRCode from 'qrcodejs2'
  import html2canvas from 'html2canvas'
  import Hv from './Hv'
  export default {
    name: 'End',
    components:{
      hv:Hv
    },
    data () {
      return {
        posterImg: '',
        wrapShow:false,
        loadStatus:true,
        lesson_name:'The Clever Xylophone'
      }
    },
    created(){
      // this.getInfo()
      // this.shareConfig()
      // this.getPoster()
    },
    mounted(){
      // this.getPoster()
      // this.createQrcode('333')
      // this.createQrcode(location.origin+'/extend/letter/index.html')
    },
    methods: {
      back(){
        this.$router.replace({name:'Cata'})
      },
      getPoster(){
        this.showWrap();
        this.createPoster()
      },
      showWrap(){
        this.wrapShow = true
      },
      createQrcode(text){
        console.log(text)
        // 生成二维码
        const qrcodeImgEl = document.getElementById('qrcodeImg')
        let currClientWidth = document.documentElement.clientWidth;
        let codeWidth = 54 * currClientWidth / 1334;
        qrcodeImgEl.innerHTML = ''
        let qrcode = new QRCode(qrcodeImgEl, {
          width: codeWidth,
          height: codeWidth,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        })
        qrcode.makeCode(text);
        this.getPoster()
      },
      createPoster(txt) {
        // 生成海报
        const domObj = document.getElementById('posterHtml');

        var width = domObj.offsetWidth
        var height = domObj.offsetHeight
        var canvasBox = document.createElement("canvas");
        var scale = window.devicePixelRatio;
        // var rect = $('.upload_box').get(0).getBoundingClientRect();
        canvasBox.width = width * scale;
        canvasBox.height = height * scale;

        canvasBox.style.width = width + "px";
        canvasBox.style.height = height + "px";
        canvasBox.getContext("2d").scale(scale, scale);
        const vm = this;
        console.log(domObj.offsetWidth)
        html2canvas(domObj, {
          canvas: canvasBox,
          useCORS: true,
          allowTaint: true,
          logging: false,
          letterRendering: true,
          scale:scale,
          onclone(doc) {
            let e = doc.querySelector('#posterHtml')
            e.style.display = 'block'
          }
        }).then(function(canvas) {
          vm.loadStatus = false
          // 在微信里,可长按保存或转发
          vm.posterImg = canvas.toDataURL('image/png')
        })
      },
    }
  }
</script>

<style scoped lang="less">
  .end{
    width: 100vw;
    height: 100vh;
    background: url('../assets/imgs/end_bg.png') bottom no-repeat;
    background-size: 100% auto;
    background-color: #5362AF;
    position: relative;
    .back{
      position: absolute;
      width: .54rem;
      height: .59rem;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA7CAMAAAAHBYkxAAAAz1BMVEUAAACtXSfsgDmsXCfadjSsWyesWyjtgTzlfDfsgDnHay/sgDmrXCjsgDnrgDnsgDqsXCjsgDmsXCjrgDmsWyfsgDqsXSntgDnsgDvsgTqtWyjrgTutXCjtgTutXinrgTvugj6wYCjwgz6yXS7/qlXScDKrWyjrfzm4YyzrfzmrWyf////1wqH87ePtjE27ZCzmfDfScDH98ergeTXDaC70uZPtkFS0YCn76t741L330Lfyq33++PX75dfwoW3528jvmmPulFrrgTvxpnXsiUiyFroIAAAAKXRSTlMAQOzs/t2WP/z5/fv639rLy7+/tradnZiUbW1nZ1dXQS0tISED/Pnv7wOIpW0AAAIjSURBVEjHndXpeppQEIDhYRfjHpdo3DXLDE0ApcUtpml7/9dUKDYpnI3m++vzPnM2FXjNh4N2XXddvd4eDOdQKqenYy695yjRpIGcGhMpmjVRUHMmRMtrlHS9FGxKR2k6d4u3Lipybxm0vsES3awLLFNqV1ghliy3Tscty1znQy2FZ/hzvz8XzvPjHoT39cVLOhbu7/1tSJW3w3yzC2tKlbcpvrNMTeTKO2Ch7F035OrpF/N9SJWjUM/I5CSsp1JsvYTpKsWmA8zVim0OQ7ViG8JArdgG0FYrtjbUsdCrWmEdHtSz2B7gCvNtWMV2JWKbb3JWwXxfvRKuwjA8qF3CTMT/n2fCHX7C3UEVxe7lh4BV4REl7ruAPYIVcJ2UBRZ0QhS6nWCRYQdsH7kdn06vyZG8vSGbb8OItijs+SU5F+aZbWkEC4rEbO8l7bFQRAsAQzLulLITM8wAgD75Qrbj/Zj71E+YRmSK2JHz12ESaZBkURyI3PlwOBfuLCYL0qZEPpbOJ5rCn1pEUVkVEbUgSyOisJwKKd3ZpW7BSVUX/rYyiCgqtUIyVvCeViMiP5CjwCeimgb/NKak2JQpM6akMeSyKc3fitDWpzQb8q0zR9GWiyLK1BqKjWuUTQyDwp5CP/ukNgZOmkGX4mpoVoIEVMywGtMlQwNuqy5J6q5AlNYSoZYGsqYWD1lTUKX1jbwx+hqUajGyO5Zxf29YHXu0AE6/AZNVmZgnIaFjAAAAAElFTkSuQmCC');
      background-size: cover;
      top: .18rem;
      left: .23rem;
    }
    .poster_wrap{
      width: 100vw;
      height: 100vh;
      overflow: scroll;
      .poster{
        width: 9.2rem;
        height: 5.17rem;
        /*padding-top: 1.26rem;*/
        /*background: url('../assets/imgs/certificate_bg.png');*/
        background-size: cover;
        position: relative;
        margin: .5rem auto;
        position: fixed;
        top: 10000px;
        left: 10000px;
        img{
          width: 9.2rem;
          height: 5.17rem;
        }
        /*.pic_wrap{*/
          /*width: 1.4rem;*/
          /*height: 1.4rem;*/
          /*border-radius: .36rem;*/
          /*margin: auto;*/
          /*box-shadow: 0 .02rem .08rem 0 rgba(147,139,124,.5);*/
          /*img{*/
            /*width: 1.2rem;*/
            /*height: 1.2rem;*/
            /*border-radius: .3rem;*/
            /*margin-top: .1rem;*/
          /*}*/
        /*}*/
        /*.txt_box{*/
          /*width: 4.71rem;*/
          /*height: .78rem;*/
          /*background: rgba(255,233,193,.7);*/
          /*border-radius: .415rem;*/
          /*margin: .1rem auto;*/
          /*font-size: 0;*/
          /*li{*/
            /*display: inline-block;*/
            /*width: 1.57rem;*/
            /*height: 100%;*/
            /*p{*/
              /*font-family: FZY4JW--GB1-0;*/
              /*font-size: .2rem;*/
              /*color: #C2935C;*/
              /*letter-spacing: .009rem;*/
              /*text-align: center;*/
              /*padding-top: .12rem;*/
              /*span{*/
                /*display: inline-block;*/
                /*font-size: .26rem;*/
                /*color: #FC8618;*/
                /*letter-spacing: .012rem;*/
                /*padding-top: .05rem;*/
              /*}*/
            /*}*/
          /*}*/
        /*}*/
        /*.txt_p{*/
          /*font-family: FZY4JW--GB1-0;*/
          /*font-size: .24rem;*/
          /*color: #C2935C;*/
          /*letter-spacing: .011rem;*/
          /*text-align: center;*/
        /*}*/
        /*#qrcodeImg{*/
          /*width: .54rem;*/
          /*height: .54rem;*/
          /*position: absolute;*/
          /*right: 1.97rem;*/
          /*bottom: .61rem;*/
        /*}*/
      }

    }
  }
  .btn{
    position: absolute;
    top: 0;
    left: 0;
  }
  .poster_btn{
    width: 2.56rem;
    height: .72rem;
    line-height: .72rem;
    background: #D98B34;
    box-shadow: 0 .04rem .08rem 0 rgba(217,139,52,0.40);
    border-radius: .26rem;
    font-family: PingFangSC-Semibold;
    font-weight: bold;
    font-size: .28rem;
    color: #FFFFFF;
    letter-spacing: 0;
    position: absolute;
    left: 50%;
    top: 12rem;
    margin-left: -1.28rem;
    /*margin: -.2rem auto .4rem;*/
  }
  .wrap{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 103;
    background: rgba(0,0,0,.5);
    .poster{
      width: 100% * 2;
      height: 13.34rem * 2;
      background: url('../assets/imgs/poster_bg.png');
      background-size: cover;
      position: absolute;
      top: 10000px;
      left: 10000px;
      #qrcodeImg{
        width: 2rem * 2;
        height: 2rem * 2;
        position: absolute;
        top: 10.7rem * 2;
        left: 2.75rem * 2;
      }
    }
    .posterImg{
      width: 70%;
      height: auto;
      margin-top: .35rem;
    }
    .save_txt{
      font-family: FZY4JW--GB1-0;
      font-size: .2rem;
      color: #B1B1B1;
      letter-spacing: .009rem;
      text-align: center;
      padding-top: .1rem;
    }
    .loading{
      p{
        font-size: .36rem;
        color: #FFF;
        padding-top: 1rem;
      }
    }
    .spinner {
      margin: 2rem auto 0;
      width: .6rem;
      height: .6rem;
      position: relative;
      z-index: 1001;
    }
    .container1 > div, .container2 > div, .container3 > div {
      width: .12rem;
      height: .12rem;
      background-color: #1ABC9C;
      border-radius: 100%;
      position: absolute;
      -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
      animation: bouncedelay 1.2s infinite ease-in-out;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
    }
    .spinner .spinner-container {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .container2 {
      -webkit-transform: rotateZ(45deg);
      transform: rotateZ(45deg);
    }

    .container3 {
      -webkit-transform: rotateZ(90deg);
      transform: rotateZ(90deg);
    }

    .circle1 { top: 0; left: 0; }
    .circle2 { top: 0; right: 0; }
    .circle3 { right: 0; bottom: 0; }
    .circle4 { left: 0; bottom: 0; }

    .container2 .circle1 {
      -webkit-animation-delay: -1.1s;
      animation-delay: -1.1s;
    }

    .container3 .circle1 {
      -webkit-animation-delay: -1.0s;
      animation-delay: -1.0s;
    }

    .container1 .circle2 {
      -webkit-animation-delay: -0.9s;
      animation-delay: -0.9s;
    }

    .container2 .circle2 {
      -webkit-animation-delay: -0.8s;
      animation-delay: -0.8s;
    }

    .container3 .circle2 {
      -webkit-animation-delay: -0.7s;
      animation-delay: -0.7s;
    }

    .container1 .circle3 {
      -webkit-animation-delay: -0.6s;
      animation-delay: -0.6s;
    }

    .container2 .circle3 {
      -webkit-animation-delay: -0.5s;
      animation-delay: -0.5s;
    }

    .container3 .circle3 {
      -webkit-animation-delay: -0.4s;
      animation-delay: -0.4s;
    }

    .container1 .circle4 {
      -webkit-animation-delay: -0.3s;
      animation-delay: -0.3s;
    }

    .container2 .circle4 {
      -webkit-animation-delay: -0.2s;
      animation-delay: -0.2s;
    }

    .container3 .circle4 {
      -webkit-animation-delay: -0.1s;
      animation-delay: -0.1s;
    }

    @-webkit-keyframes bouncedelay {
      0%, 80%, 100% { -webkit-transform: scale(0.0) }
      40% { -webkit-transform: scale(1.0) }
    }

    @keyframes bouncedelay {
      0%, 80%, 100% {
        transform: scale(0.0);
        -webkit-transform: scale(0.0);
      } 40% {
          transform: scale(1.0);
          -webkit-transform: scale(1.0);
        }
    }
  }
</style>

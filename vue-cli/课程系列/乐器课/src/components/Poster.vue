<template>
  <div class="wrap" v-show="wrapShow">
    <div class="poster" id="posterHtml">
      <div id="qrcodeImg"></div>
    </div>
    <img class="posterImg" :src="posterImg" alt="" v-show="!loadStatus">
    <p class="save_txt" v-show="!loadStatus">长按上面图片保存</p>
    <div @click="wrapShow = false" class="close" v-show="!loadStatus"></div>
    <div class="loading" v-show="loadStatus">
      <div class="spinner">
        <div class="spinner-container container1">
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
          <div class="circle4"></div>
        </div>
        <div class="spinner-container container2">
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
          <div class="circle4"></div>
        </div>
        <div class="spinner-container container3">
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
          <div class="circle4"></div>
        </div>
      </div>
      <p>海报生成中...</p>
    </div>
  </div>
</template>
<script scoped>
  import QRCode from 'qrcodejs2'
  import html2canvas from 'html2canvas'
  import Eject from './Eject'
  export default {
    name: 'Pay',
    components: {
      eject: Eject,
    },
    data () {
      return {
        posterImg: '',
        wrapShow:false,
        loadStatus:true
      }
    },
    created(){
      // this.getInfo()
      // this.shareConfig()
    },
    mounted(){
      this.createQrcode('333')
    },
    methods: {
      showWrap(){
        this.wrapShow = true
      },
      createQrcode(text){
        // 生成二维码
        const qrcodeImgEl = document.getElementById('qrcodeImg')
        let currClientWidth = document.documentElement.clientWidth;
        let codeWidth = 352 * currClientWidth / 750;
        qrcodeImgEl.innerHTML = ''
        let qrcode = new QRCode(qrcodeImgEl, {
          width: codeWidth,
          height: codeWidth,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        })
        qrcode.makeCode(text)
      },
      createPoster(txt) {
        this.createQrcode(txt)
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
  .wrap{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 103;
    background: rgba(0,0,0,.8);
    .poster{
      width: 100% * 2;
      height: 12.05rem * 2;
      background: url('../assets/imgs/poster_bg.png');
      background-size: cover;
      position: absolute;
      top: 10000px;
      left: 10000px;
      #qrcodeImg{
        width: 1.15rem * 2;
        height: 1.15rem * 2;
        position: absolute;
        top: 9.87rem * 2;
        left: .54rem * 2;
      }
    }
    .posterImg{
      width: 60%;
      height: auto;
      margin-top: .96rem;
    }
    .save_txt{
      font-family: PingFangSC-Semibold;
      font-weight: bold;
      font-size: .36rem;
      color: #FFD356;
      padding-top: .36rem;
    }
    .close{
      width: .8rem;
      height: .8rem;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAclBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9eWEHEAAAAJnRSTlMAxgmZlwULrXIOsbhXPBdSp6R5QTIrWry6ioZ/dWo3NiOSvUofkVdiLd0AAAKNSURBVFjDpJPbkqowEEX3jhNDCARBQWe8zu3/f/GkizpzI5qI68lKxUV3djcS2HNTfLbGkc60n0VztpiProuWE9qi1pjDptvyCttuc3dxjeHIohvqi7daW3+ph27BEdPoe3RVSWF1PCn8QZ2OKwplla2sDQOu6HGFvnAMmBo5+Ofx+wo3UGMPzx5J1juprtHpV5Yqd+vUtYKBg0UG9sBAoW/ekRBNj0x6I2NgcRUv+b0skc3yRWbB4wof8tAV7qKSAD8QxYtvjTtZizFaow39vm1mrOhb6NpG8pU8gm+GUZKZZl0k+k10XcQOK8ykmhbjd2FeMJswPbvfwYT9NUvMZmnCXuMHNckeD9AHQY0vtCEPeIgDab6THkhn8RDW/QhVl2SDB2nIUk9+zyBWlUmMYPYwmq/VcQoT3sv9ElHUvnyPnLr/q9tFFicQWlhEjWpBlkBseTsE9DY+g3vGjeqJ5D4+i1s9DvUKiP5RjPFjhQgrsh4rPSJtTPtwHN+uJU9IGFNlj5zIFrAkFW4ZVaYPiqTFOdwAUsa0Twjxn1FJ2LeNTyrPJwPYSCYDksYsHwZJ5VWyThvTvnECXyXkCzKMGT5cJGZDemQYM3zwpIGTqDOMGT4ZQQeSGkljlg+a5L/mzF0FYBCGoqWhqYPQzd2h//+LnRwlN+EM/QFBjPdxgh+IX1l9FFMfRRwbc3VstME2Vwf7lb6eeeLrPbE4mCfEQZEvz8iXILCeEtiSBZx7C8BNCrfRitFbYPS7KHLXoggflvg4xwdOPhIfHQvtfK3giw9fzfjyyNdbvoDziICHGDxm4UEQj6p4mMbjPh5I8siUh7rrOkPBzuOCwTiL7v+wXFjrj97mWn/M1sP1xwcvnCP1ct9eVwAAAABJRU5ErkJggg==');
      background-size: cover;
      margin: .44rem auto;
    }
    .loading{
      p{
        font-size: .36rem;
        color: #FFF;
        padding-top: 2rem;
      }
    }
    .spinner {
      margin: 30% auto 0;
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

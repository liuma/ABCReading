<template>
  <div class='dialog_wrap' v-show='showStatus'>
      <div class="content">
        <p>{{message}}</p>
        <div class="btn_hide" @click="hideEject()">确定</div>
      </div>
  </div>
</template>
<script>
  export default{
    name:'dialogs',
    data(){
      return{
        showStatus: this.showState
      }
    },
    props:['message','showState'],
    methods:{
      hideEject(){
        this.showStatus = false
        this.$parent.initDialogs()
      }
    },
    watch:{
      showState:function (val,oldVal) {
        if(val){
          this.showStatus = true
        }
      }
    }
  }
</script>
<style scoped lang="less">
  .dialog_wrap{
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top:0;
    z-index: 10001;
    background: rgba(0,0,0,.7);
    .content{
        width: 75%;
        background: #4848D5;
        border-radius: .3rem;
        margin: 35% auto;
        padding-bottom: .36rem;
        p{
            max-width: 90%;
            margin: auto;
            text-align: center;
            font-family: PingFangSC-Semibold;
            font-size: .34rem;
            color: #F8E71C;
            letter-spacing: 0;
            line-height: .6rem;
            padding: .5rem 0;
        }
        .btn_hide{
            width: 2.5rem;
            height: .86rem;
            margin: auto;
            line-height: .86rem;
            background-image: linear-gradient(0deg, #F38E10 0%, #FCD926 100%);
            box-shadow: 0 .06rem 0 0 rgba(0,0,0,0.14);
            border-radius: .5rem;
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            font-size: .4rem;
            color: #A04D1A;
            letter-spacing: .016rem;
        }
    }
  }
</style>

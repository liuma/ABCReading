<template>
  <div class='toast_wrap' v-show='showStatus'>
    <!--
    <div class='kz-wrapper' >
      <div class='kz-text'>
        <strong><slot name='text' ></slot></strong>
      </div>
      <div class='footer'>
        <div @click='tocancel' class='kz-btn'>取消</div>
        <div class='kz-btn' @click='took'>确定</div>
      </div>
    </div>
    -->
    <p>{{message}}</p>
  </div>
</template>
<script>
  export default{
    name:'eject',
    data(){
      return{
        showStatus: this.showState
      }
    },
    props:['message','showState'],
    methods:{
      hideEject(){
        this.showStatus = false
        this.$parent.initEject()
      }
    },
    watch:{
      showState:function (val,oldVal) {
        console.log(val)
        if(val){
          this.showStatus = true
          setTimeout(this.hideEject,2000)
        }
      }
    }
  }
</script>
<style scoped lang="less">
  .toast_wrap{
    position: fixed;
    left: 0;
    top:35%;
    z-index: 10001;
    width: 100%;
    /*margin-top: 35%;*/
    p{
      border-radius: 10px;
      max-width: 60%;
      display: inline-block;
      margin: auto;
      padding: 8px;
      font-size: 14px;
      background: rgba(0,0,0,.7);
      color: #FFFFFF;
      text-align: center;
    }
  }
</style>

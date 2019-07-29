<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  // provide (){
  //   return {
  //     reload: this.reload
  //   }
  // },
  data(){
    return {
      isRouterAlive: true
    }
  },
  created(){
    this.wxConfig()
  },
  methods:{
    wxConfig () {
      let lUrl = encodeURIComponent(window.location.href)
      let wUrl = this.$common.config.gzhUrl + "v3/wechat/wechat/get-wechat"
      let member_id = localStorage.getItem('monthCardCollageMemberid')
      let fd = this.$common.getParam('get', {url: lUrl, member_id: member_id});
      // let conf = {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
      this.$axios.post(wUrl + '?' + fd).then((res) => {
        if(res.data.code == 200){
          let data = res.data.data
          // 微信配置
          wx.config({
            debug: false,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseWXPay', 'startRecord','stopRecord','onVoiceRecordEnd','playVoice','pauseVoice','stopVoice','onVoicePlayEnd'] // 功能列表，我们要使用JS-SDK的什么功能
          });
          wx.ready(function () {
            wx.checkJsApi({
              jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseWXPay', 'startRecord','stopRecord','onVoiceRecordEnd','playVoice','pauseVoice','stopVoice','onVoicePlayEnd'],
              success: function (res) {
              }
            });
          });
        }
      })
    },
  }
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
.Hidden{
  display: none;
}
#app {
  font-family: PingFangSC-Regular, 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: .2rem;
  background-color: #FFAF4C;
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
    &:link, &:visited, &:hover {
      text-decoration: none;
    }
  }
}
</style>

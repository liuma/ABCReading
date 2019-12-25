<template>
  <div id="app" v-cloak>
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
      isRouterAlive: true,
      levelList:[
        {val: 1, name:'Leval aa'},
        {val: 2, name:'Leval A'},
        {val: 3, name:'Leval B'},
        {val: 4, name:'Leval C'},
        {val: 5, name:'Leval D'},
        {val: 6, name:'Leval E'},
        {val: 7, name:'Leval F'},
        {val: 8, name:'Leval G-Z'},
      ],
      ageList:[
        {val: 1, name:'1岁'},
        {val: 2, name:'2岁'},
        {val: 3, name:'3岁'},
        {val: 4, name:'4岁'},
        {val: 5, name:'5岁'},
        {val: 6, name:'6岁'},
        {val: 7, name:'7岁'},
        {val: 8, name:'8岁'},
        {val: 9, name:'9岁'},
        {val: 10, name:'10岁'},
        {val: 11, name:'11岁'},
        {val: 12, name:'12岁'},
        {val: 13, name:'12岁+'},
      ],
      timeList:[
        {val: 1, name:'0-0.5年'},
        {val: 2, name:'0.5-1年'},
        {val: 3, name:'1-1.5年'},
        {val: 4, name:'1.5-2年'},
        {val: 5, name:'2年以上'},
      ],
      beforeList:[
        {val: 1, name:'零基础'},
        {val: 2, name:'认识少量单词'},
        {val: 3, name:'会读英文句子'},
        {val: 4, name:'能进行英文对话'},
      ],
      afterList:[
        {val: 1, name:'认识少量单词'},
        {val: 2, name:'会读英文句子'},
        {val: 3, name:'熟练应用单词，自发组句'},
        {val: 3, name:'能进行英文对话'},
      ]
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
img{
    display: block;
    margin: auto;
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
  background-color: #FFF;
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
    &:link, &:visited, &:hover {
      text-decoration: none;
    }
  }
  select,input,textarea{
    border: none;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar{display: none;}
}
</style>

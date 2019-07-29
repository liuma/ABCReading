// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import common from './utils/common'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$common = common

router.beforeEach((to, from, next) => {
  let mcLimitBuyOpenid = common.VL.getRequest().openid || window.localStorage.getItem('mcLimitBuyOpenid') || '';
  let mcLimitBuyMemberid = common.VL.getRequest().member_id || window.localStorage.getItem('mcLimitBuyMemberid') || '';
  if(mcLimitBuyMemberid && mcLimitBuyOpenid){
    window.localStorage.setItem('mcLimitBuyOpenid',mcLimitBuyOpenid)
    window.localStorage.setItem('mcLimitBuyMemberid',mcLimitBuyMemberid)
    next()
    return false
  }else{
    window.location.href = common.config.gzhUrl + "v3/wechat/wechat/grant?state=H5&url="+encodeURIComponent(window.location.origin+'/mini_pay/mc/buy.html'+window.location.search);
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

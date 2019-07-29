// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import common from './utils/common'
import vueContent from './utils/content'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$common = common

router.beforeEach((to, from, next) => {
  let extendNueOpenid = common.VL.getRequest().openid || window.localStorage.getItem('extendNueOpenid') || '';
  if(extendNueOpenid){
    window.localStorage.setItem('extendNueOpenid',extendNueOpenid)
    next()
    return false
  }else{
    window.location.href = common.config.gzhUrl + "v2/wechat/wechat/grant?state=H5&url="+encodeURIComponent(window.location.origin+'/extend/nue/index.html'+window.location.search);
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
//$.get('../../config.json',function (data) {
// var cof = data.config;
// window.location.href = cof.gzhUrl + "v2/wechat/wechat/grant?state=H5&url="+window.location.href;
// })

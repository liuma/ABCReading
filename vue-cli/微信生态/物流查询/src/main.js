// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import common from './utils/common'
import VueClipboard  from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$common = common

router.beforeEach((to, from, next) => {
//   let extendAbcOpenid = common.VL.getRequest().openid || window.localStorage.getItem('extendAbcOpenid') || '';
//   if(extendAbcOpenid && extendAbcMemberid){
//     window.localStorage.setItem('extendAbcOpenid',extendAbcOpenid)
    next()
//     return false
//   }else{

//   }

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

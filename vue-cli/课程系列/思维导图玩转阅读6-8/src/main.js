// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import common from './utils/common'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueTouch from 'vue-touch'
// import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
Vue.use(VueTouch,{name: 'v-touch'})

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$common = common

router.beforeEach((to, from, next) => {
  let extendAbcOpenid = common.VL.getRequest().openid || window.localStorage.getItem('extendAbcOpenid') || '';
  let extendAbcMemberid = common.VL.getRequest().member_id || window.localStorage.getItem('extendAbcMemberid') || '';
  if(extendAbcOpenid && extendAbcMemberid){
    window.localStorage.setItem('extendAbcOpenid',extendAbcOpenid)
    window.localStorage.setItem('extendAbcMemberid',extendAbcMemberid)
    next()
    return false
  }else{
    window.location.href = common.config.gzhUrl + "v3/wechat/wechat/grant?state=H5&url="+encodeURIComponent(window.location.origin+'/extend/swdt/index.html'+window.location.search);
  }

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

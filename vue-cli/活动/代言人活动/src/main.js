// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import common from './utils/common'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$common = common

router.beforeEach((to, from, next) => {
  let voteOpenid = common.VL.getRequest().openid || window.localStorage.getItem('voteOpenid') || '';
  let voteMemberid = common.VL.getRequest().member_id || window.localStorage.getItem('voteMemberid') || '';
  console.log('222',voteOpenid);
  if(voteOpenid && voteMemberid){
    window.localStorage.setItem('voteOpenid',voteOpenid)
    window.localStorage.setItem('voteMemberid',voteMemberid)
    next()
    return false
  }else{
    window.location.href = common.config.gzhUrl + "v3/wechat/wechat/grant?state=H5&url="+encodeURIComponent(window.location.origin+'/vote/index.html'+window.location.search);

    // window.location.href = common.config.gzhUrl + "v3/wechat/wechat/grant?state=H5&url="+encodeURIComponent(window.location.href);
  }

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

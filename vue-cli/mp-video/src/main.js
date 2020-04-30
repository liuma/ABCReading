import Vue from 'vue'
import App from './App.vue'
import router from './router'
import api from './api/install'
import common from './utils/common'
import './utils/common.css'
Vue.use(api)

Vue.config.productionTip = false
Vue.prototype.$common = common

router.beforeEach((to, from, next) => {
    
    let extendAbcOpenid = common.GetRequest().openid || window.localStorage.getItem('extendAbcOpenid') || '';
    // let extendAbcOpenid = 'otRyN1CFXVBn0DL1LqnmAQ2y2KNE2';  //2
    // let extendAbcOpenid = 'otRyN1CJoqyZ_YOVJ1qowzdb7QwA';  //3
    let extendAbcMemberid = common.GetRequest().member_id || window.localStorage.getItem('extendAbcMemberid') || '';
    if(extendAbcOpenid && extendAbcMemberid){
      window.localStorage.setItem('extendAbcOpenid',extendAbcOpenid)
      window.localStorage.setItem('extendAbcMemberid',extendAbcMemberid)
      next()
      return false
    }else{
    //   window.location.href = common.WX_URL + "v3/wechat/wechat/grant?state=H5&url="+encodeURIComponent(window.location.origin+'/index.html'+window.location.search);
      window.location.href = common.WX_URL + "v3/wechat/wechat/grant?state=H5&url="+window.location.href;
    }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

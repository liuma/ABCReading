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
  let nameArr = ['Part','PartOne','PartTwo','PartFour','PartFive','Finish','PartThree','Cata','Transition','End'],nameArr2 = []
  if(nameArr.indexOf(to.name)<0 && nameArr2.indexOf(to.name)<0){
    let currClientWidth,fontValue,originWidth;
    originWidth = 750;//设计稿宽度
    __resize();
    window.addEventListener('resize', __resize, false);
    function __resize() {
      currClientWidth = document.documentElement.clientWidth;
      if (currClientWidth > 768){
        currClientWidth = 768;
      }
      if (currClientWidth < 320){
        currClientWidth = 320;
      }
      fontValue = ((625 * currClientWidth) / originWidth).toFixed(2);
      console.log(fontValue);
      document.documentElement.style.fontSize = fontValue + '%';
    }
  }else {
    if(nameArr.indexOf(to.name)>=0){
      let currClientWidth,fontValue,originWidth;
      originWidth = 1334;//设计稿宽度
      __resize();
      window.addEventListener('resize', __resize, false);
      function __resize() {
        currClientWidth = document.documentElement.clientWidth;
        if (currClientWidth > 1024){
          currClientWidth = 1024;
        }
        if (currClientWidth < 568){
          currClientWidth = 568;
        }
        fontValue = ((625 * currClientWidth) / originWidth).toFixed(2);
        document.documentElement.style.fontSize = fontValue + '%';
      }
    }else {
      let currClientWidth,fontValue,originWidth;
      originWidth = 750;//设计稿宽度
      __resize();
      window.addEventListener('resize', __resize, false);
      function __resize() {
        currClientWidth = document.documentElement.clientHeight;
        if (currClientWidth > 768){
          currClientWidth = 768;
        }
        if (currClientWidth < 320){
          currClientWidth = 320;
        }
        fontValue = ((625 * currClientWidth) / originWidth).toFixed(2);
        console.log(fontValue);
        document.documentElement.style.fontSize = fontValue + '%';
      }
    }
  }

  let extendAbcOpenid = common.VL.getRequest().openid || window.localStorage.getItem('extendAbcOpenid') || '';
  let extendAbcMemberid = common.VL.getRequest().member_id || window.localStorage.getItem('extendAbcMemberid') || '';
  if(extendAbcOpenid && extendAbcMemberid){
    window.localStorage.setItem('extendAbcOpenid',extendAbcOpenid)
    window.localStorage.setItem('extendAbcMemberid',extendAbcMemberid)
    next()
    return false
  }else{
    window.location.href = common.config.gzhUrl + "v3/wechat/wechat/grant?state=H5&url="+encodeURIComponent(window.location.origin+'/extend/music/index.html'+window.location.search);
  }

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

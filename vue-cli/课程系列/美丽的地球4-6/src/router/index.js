import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Pay from '@/components/Pay'
import Cata from '@/components/lesson/Catalog'
import Lesson from '@/components/lesson/Lesson'
import Finish from '@/components/lesson/Finish'
import End from '@/components/End'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay
    },
    {
      path: '/lesson',
      name: 'Lesson',
      component: Lesson
    },
    {
      path: '/cata',
      name: 'Cata',
      component: Cata
    },
    {
      path: '/finish',
      name: 'Finish',
      component: Finish
    },
    {
      path: '/end',
      name: 'End',
      component: End
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

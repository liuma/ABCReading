import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Exchange from '@/components/Exchange'
import Cata from '@/components/lesson/Catalog'
import Lesson from '@/components/lesson/Lesson'

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
      path: '/exchange',
      name: 'Exchange',
      component: Exchange
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
  ]
})

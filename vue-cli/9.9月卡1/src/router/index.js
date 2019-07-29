import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Collage from '@/components/Collage'
import Order from '@/components/Order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Collage',
      component: Collage
    },
    {
      path: '/collage',
      name: 'Collage',
      component: Collage
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    }
  ]
})

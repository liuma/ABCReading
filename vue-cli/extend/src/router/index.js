import Vue from 'vue'
import Router from 'vue-router'
import Suc from '@/components/Suc'
import Login from '@/components/Login'
import List from '@/components/List'
import ListOne from '@/components/ListOne'
import ListTwo from '@/components/ListTwo'
import ListThree from '@/components/ListThree'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/suc',
      name: 'Suc',
      component: Suc
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/list',
      name: 'List',
      component: List,
    },
    {
      path: '/list/1',
      name: 'list1',
      component: ListOne
    },
    {
      path: '/list/2',
      name: 'list2',
      component: ListTwo
    },
    {
      path: '/list/3',
      name: 'list3',
      component: ListThree
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Detail from '@/components/Detail'
import Rank from '@/components/Rank'
import Submit from '@/components/Submit'
import Result from '@/components/Result'
import Address from '@/components/Address'

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
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/sub',
      name: 'Submit',
      component: Submit
    },
    {
      path: '/res',
      name: 'Result',
      component: Result
    },
    {
      path: '/add',
      name: 'Address',
      component: Address
    },
  ]
})

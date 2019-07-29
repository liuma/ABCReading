import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/components/Index'
// import Login from '@/components/Login'
// import Pay from '@/components/Pay'
// import Suc from '@/components/Suc'
import Cata from '@/components/lesson/Catalog'
import Transition from '@/components/lesson/Transition'
import Part from '@/components/lesson/Part'
import Part1 from '@/components/lesson/Part1'
import Part2 from '@/components/lesson/Part2'
import Part3 from '@/components/lesson/Part3'
import Part4 from '@/components/lesson/Part4'
import Part5 from '@/components/lesson/Part5'
import Finish from '@/components/lesson/Finish'
import End from '@/components/End'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Cata',
      component: Cata
    },
    {
      path: '/partOne',
      name: 'PartOne',
      component: Part1
    },
    {
      path: '/partTwo',
      name: 'PartTwo',
      component: Part2
    },
    {
      path: '/partThree',
      name: 'PartThree',
      component: Part3
    },
    {
      path: '/partFour',
      name: 'PartFour',
      component: Part4
    },
    {
      path: '/partFive',
      name: 'PartFive',
      component: Part5
    },
    {
      path: '/cata',
      name: 'Cata',
      component: Cata
    },
    {
      path: '/trans',
      name: 'Transition',
      component: Transition
    },
    {
      path: '/part',
      name: 'Part',
      component: Part
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
    }
  ]
})

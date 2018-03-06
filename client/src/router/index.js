import Vue from 'vue'
import Router from 'vue-router'
import AppMain from '@/components/AppMain'
import AppSearch from '@/components/AppSearch'
import AppLogin from '@/components/AppLogin'
import AppRegister from '@/components/AppRegister'

import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AppMain',
      component: AppMain,
      beforeEnter: AuthGuard
    },
    {
      path: '/search/:id',
      name: 'AppSearch',
      component: AppSearch,
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'AppLogin',
      component: AppLogin
    },
    {
      path: '/signup',
      name: 'AppRegister',
      component: AppRegister
    }
  ]
})

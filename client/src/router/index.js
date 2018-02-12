import Vue from 'vue'
import Router from 'vue-router'
import AppMain from '@/components/AppMain'
import AppSearch from '@/components/AppSearch'
import AppLogin from '@/components/AppLogin'
import AppRegister from '@/components/AppRegister'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AppMain',
      component: AppMain
    },
    {
      path: '/search',
      name: 'AppSearch',
      component: AppSearch
    },
    {
      path: '/login',
      name: 'AppLogin',
      component: AppLogin
    },
    {
      path: '/register',
      name: 'AppRegister',
      component: AppRegister
    }
  ]
})

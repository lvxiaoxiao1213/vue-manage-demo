import Vue from 'vue'
import Router from 'vue-router'
import Manage from '@/page/manage'
import Home from '@/page/home'
import Login from '@/page/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },{
      path: '/manage',
      component: Manage,
      children: [
        {
          path: '',
          component: Home,
          meta: []
        }
      ]
    }
  ]
})

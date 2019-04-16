import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Manage from '@/page/manage'
import Home from '@/page/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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

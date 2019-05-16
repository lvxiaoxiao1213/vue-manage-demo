import Vue from 'vue'
import Router from 'vue-router'
import Manage from '@/page/manage'
import Home from '@/page/home'
import Login from '@/page/login'
import UserList from '@/page/userList'
import ShopList from '@/page/shopList'
import FoodList from '@/page/foodList'
import OrderList from '@/page/orderList'
import AddGoods from '@/page/addGoods'

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
        },
        {
          path: '/userList',
          component: UserList,
          meta: ['数据管理', '用户列表']
        },
        {
          path: '/shopList',
          component: ShopList,
          meta: ['数据管理', '商户列表']
        },
        {
          path: '/foodList',
          component: FoodList,
          meta: ['数据管理', '食品列表']
        },
        {
          path: '/orderList',
          component: OrderList,
          meta: ['数据管理', '订单列表']
        },
        {
          path: '/addGoods',
          component: AddGoods,
          meta: ['添加数据', '添加商品']
        }
      ]
    }
  ]
})

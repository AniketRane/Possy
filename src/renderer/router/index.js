import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import TableView from '../views/TableView.vue'
import Settings from '../views/Settings.vue'

import Temp from '../views/Temp.vue'
import Menu from '../views/Menu/Menu.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    redirect: {
      name: 'tables'
    }
  },
  {
    path: '/tables',
    name: 'tables',
    component: TableView
  },
  {
    path: '/order/create/:table?',
    name: 'order.create',
    component: HomeView
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  },
  {
    path: '/menu',
    name: 'menu',
    component: Menu
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

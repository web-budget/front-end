import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView'

import publicRoutes from '@/router/public.routes.js'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  ...publicRoutes
]

const router = createRouter({
  routes,
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-active',
  history: createWebHistory(process.env.BASE_URL)
})

export default router

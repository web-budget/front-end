import { createRouter, createWebHistory } from 'vue-router'

import HomeTemplate from '@/components/templates/HomeTemplate'

import publicRoutes from '@/router/public.routes.js'
import registrationRoutes from '@/router/registration.routes.js'

const routes = [
  {
    path: '/',
    redirect: 'home',
    component: HomeTemplate,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue')
      }
    ]
  },
  ...publicRoutes,
  ...registrationRoutes
]

const router = createRouter({
  routes,
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-active',
  history: createWebHistory(process.env.BASE_URL)
})

/*
 TODO create router guard here to prevent user navigation
      to non public routes without being authenticated
*/

export default router

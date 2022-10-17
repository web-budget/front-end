import { createRouter, createWebHistory } from 'vue-router'

import HomeTemplate from '@/components/templates/HomeTemplate'

import publicRoutes from '@/router/public.routes.js'
import registrationRoutes from '@/router/registration.routes.js'

import { useUserSession } from '@/stores/user-session.store'

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

router.beforeEach((to, from, next) => {
  const userSession = useUserSession()
  if (to.matched.some(route => route.meta.public) || userSession.isValid()) {
    next()
  } else {
    next({ name: 'login', params: { redirect: to.path } })
  }
})

export default router

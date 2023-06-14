import { createRouter, createWebHistory } from 'vue-router'

import HomeTemplate from '@/components/templates/HomeTemplate.vue'

import publicRoutes from '@/router/public.routes.js'
import registrationRoutes from '@/router/registration.routes.js'
import administrationRoutes from '@/router/administration.routes.js'

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
        component: () => import('@/views/HomeView.vue'),
      },
    ],
  },
  ...publicRoutes,
  ...registrationRoutes,
  ...administrationRoutes,
]

const router = createRouter({
  routes,
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-active',
  history: createWebHistory(import.meta.env.BASE_URL),
})

router.beforeEach((to, from, next) => {
  const { isValid } = useUserSession()
  const publicRoute = to.matched.some((route) => route.meta.public)

  if (publicRoute || isValid()) {
    next()
  } else {
    next({
      name: 'login',
      query: { redirect: to.path },
    })
  }
})

export default router

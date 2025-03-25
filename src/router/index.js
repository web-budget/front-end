import { createRouter, createWebHistory } from 'vue-router'

import { useSessionStore } from '@/stores/session.store'

import HomeLayout from '@/layout/HomeLayout.vue'

import registrationRoutes from '@/router/registration.routes'
import financialRoutes from '@/router/financial.routes'
import investmentsRoutes from '@/router/investments.routes'
import configurationsRoutes from '@/router/configurations.routes'
import publicRoutes from '@/router/public.routes'

const routes = [
  {
    path: '/',
    component: HomeLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
      },
    ],
  },
  ...publicRoutes,
  ...registrationRoutes,
  ...configurationsRoutes,
  ...financialRoutes,
  ...investmentsRoutes,
]

const router = createRouter({
  routes: routes,
  history: createWebHistory(import.meta.env.BASE_URL),
})

router.beforeEach((to, from, next) => {
  const { isValid } = useSessionStore()

  const isPublicRoute = to.matched.some((route) => route.meta.public)

  if (!isPublicRoute && !isValid()) {
    next({ name: 'login', query: { redirect: to.path } })
    return
  }

  next()
})

export default router

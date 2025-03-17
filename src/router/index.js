import { createRouter, createWebHistory } from 'vue-router'

import registrationRoutes from '@/router/registration.routes'
import financialRoutes from '@/router/financial.routes'
import investmentsRoutes from '@/router/investments.routes'
import configurationsRoutes from '@/router/configurations.routes'
import publicRoutes from '@/router/public.routes'
import HomeLayout from '@/layout/HomeLayout.vue'

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

export default router

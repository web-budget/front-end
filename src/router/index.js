import { createRouter, createWebHistory } from 'vue-router'

import HomeLayout from '@/layout/HomeLayout.vue'
import SpecificMenuLayout from '@/layout/SpecificMenuLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/home/HomeView.vue'),
        },
      ],
    },
    {
      path: '/registration',
      component: SpecificMenuLayout,
      children: [
        {
          path: '/registration',
          name: 'registration',
          component: () => import('@/views/home/HomeView.vue'),
        },
      ],
    },
    {
      path: '/financial',
      component: SpecificMenuLayout,
      children: [
        {
          path: '/financial',
          name: 'financial',
          component: () => import('@/views/home/FinancialHomeView.vue'),
        },
      ],
    },
    {
      path: '/investments',
      component: SpecificMenuLayout,
      children: [
        {
          path: '/investments',
          name: 'investments',
          component: () => import('@/views/home/HomeView.vue'),
        },
      ],
    },
    {
      path: '/configurations',
      component: SpecificMenuLayout,
      children: [
        {
          path: '/configurations',
          name: 'configurations',
          component: () => import('@/views/home/HomeView.vue'),
        },
      ],
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
    },
  ],
})

export default router

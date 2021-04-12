import Vue from 'vue'
import VueRouter from 'vue-router'

import AuthenticationLayout from '@/components/layouts/Authentication'

Vue.use(VueRouter)

const routes = [
  {
    path: '/authentication',
    redirect: 'login',
    component: AuthenticationLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        meta: { public: true },
        component: () => import(/* webpackChunkName: "authentication" */ '../views/authentication/Login.vue')
      },
      {
        path: '/password/recover',
        name: 'recover-password',
        meta: { public: true },
        component: () => import(/* webpackChunkName: "authentication" */ '../views/authentication/RecoverPassword.vue')
      },
      {
        props: true,
        path: '/password/change/:token',
        name: 'change-password',
        meta: { public: true },
        component: () => import(/* webpackChunkName: "authentication" */ '../views/authentication/ChangePassword.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

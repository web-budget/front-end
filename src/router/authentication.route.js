import AuthenticationLayout from '@/components/layouts/AuthenticationLayout.vue'

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

export default routes

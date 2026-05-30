import AuthLayout from '@/components/layout/AuthLayout.vue'

const routes = [
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        meta: { public: true },
        component: () => import('@/views/auth/LoginView.vue')
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        meta: { public: true },
        props: (route) => ({
          token: route.params.token
        }),
        component: () => import('@/views/auth/ForgotPasswordView.vue')
      },
      {
        path: 'account-activation',
        name: 'account-activation',
        meta: { public: true },
        props: (route) => ({
          token: route.params.token
        }),
        component: () => import('@/views/auth/AccountActivationView.vue')
      },
      {
        path: 'recover-password',
        name: 'recover-password',
        meta: { public: true },
        props: (route) => ({
          token: route.params.token
        }),
        component: () => import('@/views/auth/RecoverPasswordView.vue')
      }
    ]
  },
  {
    path: '/error/not-found',
    name: '404',
    meta: { public: true },
    component: () => import('@/views/errors/NotFoundView.vue')
  },
  {
    path: '/error/forbidden',
    name: '403',
    meta: { public: true },
    component: () => import('@/views/errors/ForbiddenView.vue')
  },
  {
    path: '/error/server-error',
    name: '500',
    meta: { public: true },
    component: () => import('@/views/errors/ServerErrorView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    meta: { public: true },
    component: () => import('@/views/errors/NotFoundView.vue')
  }
]

export default routes

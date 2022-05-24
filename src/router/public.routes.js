import LoginTemplate from '@/components/templates/LoginTemplate'

const routes = [
  {
    path: '/login',
    redirect: 'login',
    component: LoginTemplate,
    children: [
      {
        path: '',
        name: 'login',
        meta: { public: true },
        component: () => import(/* webpackChunkName: "login-view" */ '../views/LoginView.vue')
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        meta: { public: true },
        component: () => import(/* webpackChunkName: "login-view" */ '../views/ForgotPasswordView.vue')
      },
      {
        props: true,
        path: 'recover-password/:token',
        name: 'recover-password',
        meta: { public: true },
        component: () => import(/* webpackChunkName: "login-view" */ '../views/RecoverPasswordView.vue')
      }
    ]
  }
]

export default routes

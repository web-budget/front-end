import LoginTemplate from '@/components/templates/LoginTemplate'
import ErrorTemplate from '@/components/templates/ErrorTemplate'

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
        component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        meta: { public: true },
        component: () => import(/* webpackChunkName: "login" */ '../views/ForgotPasswordView.vue')
      },
      {
        props: true,
        path: 'recover-password/:token',
        name: 'recover-password',
        meta: { public: true },
        component: () => import(/* webpackChunkName: "login" */ '../views/RecoverPasswordView.vue')
      }
    ]
  },
  {
    path: '/error',
    component: ErrorTemplate,
    children: [
      {
        path: 'session-expired',
        name: 'session-expired',
        meta: { public: true },
        component: () => import(/* webpackChunkName: "errors" */ '../views/error/SessionExpiredView.vue')
      },
      {
        path: 'unauthorized',
        name: 'unauthorized',
        meta: { public: true },
        component: () => import(/* webpackChunkName: "errors" */ '../views/error/UnauthorizedView.vue')
      }
    ]
  }
]

export default routes

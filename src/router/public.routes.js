const routes = [
  {
    path: '/auth/login',
    name: 'login',
    meta: { public: true },
    component: () => import('@/views/auth/LoginView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    meta: { public: true },
    component: () => import('@/views/errors/NotFoundView.vue'),
  },
  {
    path: '/error/not-found',
    name: '404',
    meta: { public: true },
    component: () => import('@/views/errors/NotFoundView.vue'),
  },
  {
    path: '/error/forbidden',
    name: '403',
    meta: { public: true },
    component: () => import('@/views/errors/ForbiddenView.vue'),
  },
  {
    path: '/error/unauthorized',
    name: '401',
    meta: { public: true },
    component: () => import('@/views/errors/UnauthorizedView.vue'),
  },
  {
    path: '/error/server-error',
    name: '500',
    meta: { public: true },
    component: () => import('@/views/errors/ServerErrorView.vue'),
  },
]

export default routes

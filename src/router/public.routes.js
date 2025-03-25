const routes = [
  {
    path: '/auth/login',
    name: 'login',
    meta: { public: true },
    component: () => import('@/views/auth/LoginView.vue'),
  }
]

export default routes

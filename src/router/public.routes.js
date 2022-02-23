
const routes = [
  {
    path: '/login',
    name: 'login',
    meta: { public: true },
    component: () => import(/* webpackChunkName: "authentication" */ '../views/LoginView.vue')
  }
]

export default routes

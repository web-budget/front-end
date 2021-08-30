import ErrorLayout from '@/components/layouts/ErrorLayout.vue'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'

const routes = [
  {
    path: '/error',
    redirect: 'error',
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: ErrorLayout
      },
      {
        path: '401',
        name: '401',
        component: () => import(/* webpackChunkName: "errors" */ '@/views/401.vue')
      },
      {
        path: '403',
        name: '403',
        component: () => import(/* webpackChunkName: "errors" */ '@/views/403.vue')
      },
      {
        path: '404',
        name: '404',
        component: () => import(/* webpackChunkName: "errors" */ '@/views/404.vue')
      }
    ]
  }
]

export default routes

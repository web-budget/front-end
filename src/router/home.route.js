import HomeLayout from '@/components/layouts/HomeLayout.vue'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'

const routes = [
  {
    path: '/',
    redirect: 'home',
    component: DefaultLayout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: HomeLayout
      }
    ]
  }
]

export default routes

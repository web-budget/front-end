import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import DashboardLayout from '@/components/layouts/DashboardLayout.vue'

const routes = [
  {
    path: '/dashboard',
    redirect: 'dashboard',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: DashboardLayout
      }
    ]
  }
]

export default routes

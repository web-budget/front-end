import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import FinancialLayout from '@/components/layouts/FinancialLayout.vue'

const routes = [
  {
    path: '/financial',
    redirect: 'financial',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'financial',
        component: FinancialLayout
      }
    ]
  }
]

export default routes

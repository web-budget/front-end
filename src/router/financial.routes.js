import FinancialLayout from '@/layout/FinancialLayout.vue'

const routes = [
  {
    path: '/financial',
    component: FinancialLayout,
    children: [
      {
        path: '/financial',
        name: 'financial',
        component: () => import('@/views/financial/FinancialHomeView.vue'),
      },
    ],
  },
]

export default routes

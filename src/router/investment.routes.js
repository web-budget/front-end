import investmentLayout from '@/components/layout/InvestmentLayout.vue'

const routes = [
  {
    path: '/investment',
    component: investmentLayout,
    children: [
      {
        path: '/investment',
        name: 'investment',
        component: () => import('@/views/investment/InvestmentHomeView.vue'),
      },
    ],
  },
]

export default routes

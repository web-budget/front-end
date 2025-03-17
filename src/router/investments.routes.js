import InvestmentsLayout from '@/layout/InvestmentsLayout.vue'

const routes = [
  {
    path: '/investments',
    component: InvestmentsLayout,
    children: [
      {
        path: '/investments',
        name: 'investments',
        component: () => import('@/views/investments/InvestmentsHomeView.vue'),
      },
    ],
  },
]

export default routes

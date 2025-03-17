import ConfigurationsLayout from '@/layout/ConfigurationsLayout.vue'

const routes = [
  {
    path: '/configurations',
    component: ConfigurationsLayout,
    children: [
      {
        path: '/configurations',
        name: 'configurations',
        component: () => import('@/views/configurations/ConfigurationsHomeView.vue'),
      },
    ],
  },
]

export default routes

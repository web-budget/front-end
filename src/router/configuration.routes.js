import ConfigurationLayout from '@/components/layout/ConfigurationLayout.vue'

const routes = [
  {
    path: '/configuration',
    component: ConfigurationLayout,
    children: [
      {
        path: '/configuration',
        name: 'configuration',
        component: () => import('@/views/configuration/ConfigurationHomeView.vue'),
      },
    ],
  },
]

export default routes

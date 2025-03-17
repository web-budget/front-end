import RegistrationLayout from '@/layout/RegistrationLayout.vue'

const routes = [
  {
    path: '/registrations',
    component: RegistrationLayout,
    children: [
      {
        path: '/registrations',
        name: 'registrations',
        component: () => import('@/views/registrations/RegistrationHomeView.vue'),
      },
    ],
  },
  {
    path: '/registrations/cost-centers',
    component: RegistrationLayout,
    children: [
      {
        path: '',
        name: 'cost-centers',
        component: () => import('@/views/registrations/cost-centers/CostCenterListView.vue'),
      },
      {
        path: 'create',
        name: 'cost-centers.create',
        component: () => import('@/views/registrations/cost-centers/CostCenterFormView.vue'),
      },
      {
        path: ':id/update',
        name: 'cost-centers.update',
        props: (route) => ({
          id: route.params.id,
          updating: true,
        }),
        component: () => import('@/views/registrations/cost-centers/CostCenterFormView.vue'),
      },
      {
        path: ':id/detail',
        name: 'cost-centers.detail',
        props: (route) => ({ id: route.params.id }),
        component: () => import('@/views/registrations/cost-centers/CostCenterDetailView.vue'),
      },
      {
        path: ':id/delete',
        name: 'cost-centers.delete',
        props: (route) => ({
          id: route.params.id,
          deleting: true,
        }),
        component: () => import('@/views/registrations/cost-centers/CostCenterDetailView.vue'),
      },
    ],
  },
]

export default routes

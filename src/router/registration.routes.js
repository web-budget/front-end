import RegistrationLayout from '@/layout/RegistrationLayout.vue'

const routes = [
  {
    path: '/registration',
    component: RegistrationLayout,
    children: [
      {
        path: '/registration',
        name: 'registration',
        component: () => import('@/views/registration/RegistrationHomeView.vue'),
      },
    ],
  },
  {
    path: '/registration/cost-centers',
    component: RegistrationLayout,
    children: [
      {
        path: '',
        name: 'cost-centers',
        component: () => import('@/views/registration/cost-centers/CostCenterListView.vue'),
      },
      {
        path: 'create',
        name: 'cost-centers.create',
        component: () => import('@/views/registration/cost-centers/CostCenterFormView.vue'),
      },
      {
        path: ':id/update',
        name: 'cost-centers.update',
        props: (route) => ({
          id: route.params.id,
          updating: true,
        }),
        component: () => import('@/views/registration/cost-centers/CostCenterFormView.vue'),
      },
      {
        path: ':id/detail',
        name: 'cost-centers.detail',
        props: (route) => ({ id: route.params.id }),
        component: () => import('@/views/registration/cost-centers/CostCenterDetailView.vue'),
      },
      {
        path: ':id/delete',
        name: 'cost-centers.delete',
        props: (route) => ({
          id: route.params.id,
          deleting: true,
        }),
        component: () => import('@/views/registration/cost-centers/CostCenterDetailView.vue'),
      },
    ],
  },
]

export default routes

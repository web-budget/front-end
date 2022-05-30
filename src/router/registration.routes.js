import HomeTemplate from '@/components/templates/HomeTemplate'

const routes = [
  {
    path: '/registration/cost-center',
    redirect: 'cost-centers',
    component: HomeTemplate,
    children: [
      {
        path: '',
        name: 'cost-centers',
        component: () => import(/* webpackChunkName: "cost-center" */ '@/views/registration/cost-center/CostCentersListView.vue')
      },
      {
        path: 'add',
        name: 'cost-centers.add',
        component: () => import(/* webpackChunkName: "cost-center" */ '@/views/registration/cost-center/CostCenterFormView.vue')
      },
      {
        path: ':id/edit',
        name: 'cost-centers.edit',
        props: (route) => ({ id: route.params.id, editing: true }),
        component: () => import(/* webpackChunkName: "cost-center" */ '@/views/registration/cost-center/CostCenterFormView.vue')
      },
      {
        path: ':id/detail',
        name: 'cost-centers.detail',
        props: (route) => ({ id: route.params.id, editing: false }),
        component: () => import(/* webpackChunkName: "cost-center" */ '@/views/registration/cost-center/CostCenterDetailView.vue')
      },
      {
        path: ':id/delete',
        name: 'cost-centers.delete',
        props: (route) => ({ id: route.params.id, deleting: false }),
        component: () => import(/* webpackChunkName: "cost-center" */ '@/views/registration/cost-center/CostCenterDetailView.vue')
      }
    ]
  }
]

export default routes

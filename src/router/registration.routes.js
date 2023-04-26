import HomeTemplate from '@/components/templates/HomeTemplate.vue'

const routes = [
  {
    path: '/registration/cost-center',
    redirect: 'cost-centers',
    component: HomeTemplate,
    children: [
      {
        path: '',
        name: 'cost-centers',
        component: () =>
          import(
            /* webpackChunkName: "cost-center" */ '@/views/registration/cost-center/CostCentersListView.vue'
          ),
      },
      {
        path: 'create',
        name: 'cost-centers.create',
        component: () =>
          import(
            /* webpackChunkName: "cost-center" */ '@/views/registration/cost-center/CostCenterFormView.vue'
          ),
      },
      {
        path: ':id/update',
        name: 'cost-centers.update',
        props: (route) => ({
          id: route.params.id,
          updating: true,
        }),
        component: () =>
          import(
            /* webpackChunkName: "cost-center" */ '@/views/registration/cost-center/CostCenterFormView.vue'
          ),
      },
      {
        path: ':id/detail',
        name: 'cost-centers.detail',
        props: (route) => ({ id: route.params.id }),
        component: () =>
          import(
            /* webpackChunkName: "cost-center" */ '@/views/registration/cost-center/CostCenterDetailView.vue'
          ),
      },
      {
        path: ':id/delete',
        name: 'cost-centers.delete',
        props: (route) => ({
          id: route.params.id,
          deleting: true,
        }),
        component: () =>
          import(
            /* webpackChunkName: "cost-center" */ '@/views/registration/cost-center/CostCenterDetailView.vue'
          ),
      },
    ],
  },
  {
    path: '/registration/wallet',
    redirect: 'wallets',
    component: HomeTemplate,
    children: [
      {
        path: '',
        name: 'wallets',
        component: () =>
          import(
            /* webpackChunkName: "wallet" */ '@/views/registration/wallet/WalletsListView.vue'
          ),
      },
      {
        path: 'create',
        name: 'wallets.create',
        component: () =>
          import(
            /* webpackChunkName: "wallet" */ '@/views/registration/wallet/WalletFormView.vue'
          ),
      },
      {
        path: ':id/update',
        name: 'wallets.update',
        props: (route) => ({
          id: route.params.id,
          updating: true,
        }),
        component: () =>
          import(
            /* webpackChunkName: "wallet" */ '@/views/registration/wallet/WalletFormView.vue'
          ),
      },
      {
        path: ':id/detail',
        name: 'wallets.detail',
        props: (route) => ({ id: route.params.id }),
        component: () =>
          import(
            /* webpackChunkName: "wallet" */ '@/views/registration/wallet/WalletDetailView.vue'
          ),
      },
      {
        path: ':id/delete',
        name: 'wallets.delete',
        props: (route) => ({
          id: route.params.id,
          deleting: true,
        }),
        component: () =>
          import(
            /* webpackChunkName: "wallet" */ '@/views/registration/wallet/WalletDetailView.vue'
          ),
      },
    ],
  },
]

export default routes

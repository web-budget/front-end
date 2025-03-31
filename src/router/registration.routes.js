import RegistrationLayout from '@/components/layout/RegistrationLayout.vue'

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
    path: '/registration/cards',
    component: RegistrationLayout,
    children: [
      {
        path: '',
        name: 'cards',
        component: () => import('@/views/registration/cards/CardListView.vue'),
      },
      {
        path: 'create',
        name: 'cards.create',
        component: () => import('@/views/registration/cards/CardFormView.vue'),
      },
      {
        path: ':id/update',
        name: 'cards.update',
        props: (route) => ({
          id: route.params.id,
          updating: true,
        }),
        component: () => import('@/views/registration/cards/CardFormView.vue'),
      },
      {
        path: ':id/detail',
        name: 'cards.detail',
        props: (route) => ({ id: route.params.id }),
        component: () => import('@/views/registration/cards/CardDetailView.vue'),
      },
      {
        path: ':id/delete',
        name: 'cards.delete',
        props: (route) => ({
          id: route.params.id,
          deleting: true,
        }),
        component: () => import('@/views/registration/cards/CardDetailView.vue'),
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
  {
    path: '/registration/financial-periods',
    component: RegistrationLayout,
    children: [
      {
        path: '',
        name: 'financial-periods',
        component: () =>
          import('@/views/registration/financial-periods/FinancialPeriodListView.vue'),
      },
      {
        path: 'create',
        name: 'financial-periods.create',
        component: () =>
          import('@/views/registration/financial-periods/FinancialPeriodFormView.vue'),
      },
      {
        path: ':id/update',
        name: 'financial-periods.update',
        props: (route) => ({
          id: route.params.id,
          updating: true,
        }),
        component: () =>
          import('@/views/registration/financial-periods/FinancialPeriodFormView.vue'),
      },
      {
        path: ':id/detail',
        name: 'financial-periods.detail',
        props: (route) => ({ id: route.params.id }),
        component: () =>
          import('@/views/registration/financial-periods/FinancialPeriodDetailView.vue'),
      },
      {
        path: ':id/delete',
        name: 'financial-periods.delete',
        props: (route) => ({
          id: route.params.id,
          deleting: true,
        }),
        component: () =>
          import('@/views/registration/financial-periods/FinancialPeriodDetailView.vue'),
      },
    ],
  },
  {
    path: '/registration/movement-classes',
    component: RegistrationLayout,
    children: [
      {
        path: '',
        name: 'movement-classes',
        component: () => import('@/views/registration/movement-classes/MovementClassListView.vue'),
      },
      {
        path: 'create',
        name: 'movement-classes.create',
        component: () => import('@/views/registration/movement-classes/MovementClassFormView.vue'),
      },
      {
        path: ':id/update',
        name: 'movement-classes.update',
        props: (route) => ({
          id: route.params.id,
          updating: true,
        }),
        component: () => import('@/views/registration/movement-classes/MovementClassFormView.vue'),
      },
      {
        path: ':id/detail',
        name: 'movement-classes.detail',
        props: (route) => ({ id: route.params.id }),
        component: () =>
          import('@/views/registration/movement-classes/MovementClassDetailView.vue'),
      },
      {
        path: ':id/delete',
        name: 'movement-classes.delete',
        props: (route) => ({
          id: route.params.id,
          deleting: true,
        }),
        component: () =>
          import('@/views/registration/movement-classes/MovementClassDetailView.vue'),
      },
    ],
  },
  {
    path: '/registration/wallets',
    component: RegistrationLayout,
    children: [
      {
        path: '',
        name: 'wallets',
        component: () => import('@/views/registration/wallets/WalletListView.vue'),
      },
      {
        path: 'create',
        name: 'wallets.create',
        component: () => import('@/views/registration/wallets/WalletFormView.vue'),
      },
      {
        path: ':id/update',
        name: 'wallets.update',
        props: (route) => ({
          id: route.params.id,
          updating: true,
        }),
        component: () => import('@/views/registration/wallets/WalletFormView.vue'),
      },
      {
        path: ':id/detail',
        name: 'wallets.detail',
        props: (route) => ({ id: route.params.id }),
        component: () => import('@/views/registration/wallets/WalletDetailView.vue'),
      },
      {
        path: ':id/delete',
        name: 'wallets.delete',
        props: (route) => ({
          id: route.params.id,
          deleting: true,
        }),
        component: () => import('@/views/registration/wallets/WalletDetailView.vue'),
      },
    ],
  },
]

export default routes

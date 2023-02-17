import HomeTemplate from '@/components/templates/HomeTemplate.vue'

const routes = [
  {
    path: '/administration/user',
    redirect: 'users',
    component: HomeTemplate,
    children: [
      {
        path: '',
        name: 'users',
        component: () =>
          import(
            /* webpackChunkName: "user" */ '@/views/administration/user/UsersListView.vue'
          ),
      },
      {
        path: 'create',
        name: 'users.create',
        component: () =>
          import(
            /* webpackChunkName: "user" */ '@/views/administration/user/UserFormView.vue'
          ),
      },
      {
        path: ':id/update',
        name: 'users.update',
        props: (route) => ({
          id: route.params.id,
          updating: true,
        }),
        component: () =>
          import(
            /* webpackChunkName: "user" */ '@/views/administration/user/UserFormView.vue'
          ),
      },
      {
        path: ':id/detail',
        name: 'users.detail',
        props: (route) => ({ id: route.params.id }),
        component: () =>
          import(
            /* webpackChunkName: "user" */ '@/views/administration/user/UserDetailView.vue'
          ),
      },
      {
        path: ':id/delete',
        name: 'users.delete',
        props: (route) => ({
          id: route.params.id,
          deleting: true,
        }),
        component: () =>
          import(
            /* webpackChunkName: "user" */ '@/views/administration/user/UserDetailView.vue'
          ),
      },
    ],
  },
]

export default routes

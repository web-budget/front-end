import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import AdministrationLayout from '@/components/layouts/AdministrationLayout.vue'

const routes = [
  {
    path: '/administration',
    redirect: 'administration',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'administration',
        component: AdministrationLayout
      },
      {
        path: 'users',
        redirect: 'users',
        component: AdministrationLayout,
        children: [
          {
            path: '',
            name: 'users',
            component: () => import(/* webpackChunkName: "users" */ '@/views/administration/users/UsersList.vue')
          },
          {
            path: 'add',
            name: 'users.add',
            component: () => import(/* webpackChunkName: "users" */ '@/views/administration/users/UserForm.vue')
          },
          {
            props: true,
            path: ':id/detail',
            name: 'users.detail',
            component: () => import(/* webpackChunkName: "users" */ '@/views/administration/users/UserDetail.vue')
          },
          {
            path: ':id/edit',
            name: 'users.edit',
            props: (route) => ({ id: route.params.id, editing: true }),
            component: () => import(/* webpackChunkName: "users" */ '@/views/administration/users/UserForm.vue')
          },
          {
            path: ':id/delete',
            name: 'users.delete',
            props: (route) => ({ id: route.params.id, deleting: true }),
            component: () => import(/* webpackChunkName: "users" */ '@/views/administration/users/UserDetail.vue')
          }
        ]
      }
    ]
  }
]

export default routes

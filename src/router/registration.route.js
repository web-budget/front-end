import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import RegistrationLayout from '@/components/layouts/RegistrationLayout.vue'

const routes = [
  {
    path: '/registration',
    redirect: 'registration',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'registration',
        component: RegistrationLayout
      }
    ]
  }
]

export default routes

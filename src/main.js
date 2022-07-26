import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

// utilities
import router from '@/router'
import i18n from '@/locales'

// UI things (magic)
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'
import ToastService from 'primevue/toastservice'
import VueGravatar from 'vue3-gravatar'

// some css
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'bootstrap/scss/bootstrap.scss'

// tabler (the real magic)
import '@/assets/css/tabler.min.css'
import '@/assets/js/tabler.min.js'

// web-budget custom
import '@/assets/scss/webbudget.scss'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(i18n)
  .use(router)
  .use(PrimeVue)
  .use(ToastService)
  .use(VueGravatar)
  .directive('tooltip', Tooltip)
  .mount('#app')

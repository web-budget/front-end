import { createApp } from 'vue'

import App from './App.vue'

// utilities
import router from '@/router'
import i18n from '@/locales'

// ui framework
import PrimeVue from 'primevue/config'

// some css
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'bootstrap/scss/bootstrap.scss'

// tabler
import '@/assets/css/tabler.min.css'
import '@/assets/js/tabler.min.js'

// web-budget custom
import '@/assets/scss/webbudget.scss'

createApp(App)
  .use(i18n)
  .use(router)
  .use(PrimeVue)
  .mount('#app')

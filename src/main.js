import { createApp } from 'vue'

// pinia
import { createPinia } from 'pinia'

import App from './App.vue'

// utilities
import router from '@/router'
import i18n from '@/locales'

// UI things (magic)
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'
import VueGravatar from 'vue3-gravatar'
import Toast from 'vue-toastification'

// some css
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'vue-toastification/dist/index.css'

// tabler (the real magic)
import '@tabler/core/dist/css/tabler.min.css'
import '@tabler/core/dist/js/tabler.min.js'

// web-budget custom
import '@/assets/scss/webbudget.scss'

createApp(App)
  .use(createPinia())
  .use(i18n)
  .use(router)
  .use(PrimeVue)
  .use(Toast, {
    transition: 'Vue-Toastification__fade',
    maxToasts: 20,
    newestOnTop: true,
  })
  .use(VueGravatar)
  .directive('tooltip', Tooltip)
  .mount('#app')

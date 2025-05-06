import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'

import router from '@/router'
import i18n from '@/locales'

import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'

import '@/assets/styles.scss'
import '@/assets/tailwind.css'

import defaultPreset from '@/primevue/default-preset'
import localizationPtBR from '@/primevue/localization_pt-BR.json'

createApp(App)
  .use(createPinia())
  .use(i18n)
  .use(router)
  .use(PrimeVue, {
    locale: { ...localizationPtBR },
    theme: {
      preset: defaultPreset,
      options: {
        darkModeSelector: '.app-dark',
      },
    },
  })
  .use(ToastService)
  .use(ConfirmationService)
  .mount('#app')

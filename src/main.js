import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import router from '@/router'
import i18n from '@/locales'

import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'
import StyleClass from 'primevue/styleclass'

import '@/assets/tailwind.css'
import '@/assets/styles.scss'

import defaultPreset from '@/utilities/primevue/default-preset'
import localizationPtBR from '@/utilities/primevue/localization_pt-BR.json'

const app = createApp(App)

app.use(createPinia())

app.use(router)
app.use(i18n)

app.use(PrimeVue, {
  locale: { ...localizationPtBR },
  theme: {
    preset: defaultPreset,
    options: {
      darkModeSelector: '.app-dark'
    }
  }
})
app.use(ToastService)
app.use(ConfirmationService)

app.directive('tooltip', Tooltip)
app.directive('styleclass', StyleClass)

app.mount('#app')

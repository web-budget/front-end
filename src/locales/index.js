import { createI18n } from 'vue-i18n'

import en_US from './en_US.json'
import pt_BR from './pt_BR.json'

export default createI18n({
  legacy: false,
  locale: 'pt_BR',
  fallbackLocale: 'pt_BR',
  messages: {
    pt_BR,
    en_US,
  },
})


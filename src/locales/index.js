import { createI18n } from 'vue-i18n'

import en from './en_US.json'
import pt from './pt_BR.json'

const numberFormats = {
  'en-US': {
    currency: {
      style: 'currency', currency: 'USD', notation: 'standard'
    },
    decimal: {
      style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2
    },
    percent: {
      style: 'percent', useGrouping: false
    }
  },
  'pt-BR': {
    currency: {
      style: 'currency', currency: 'BRL', useGrouping: true, currencyDisplay: 'symbol'
    },
    decimal: {
      style: 'decimal', minimumSignificantDigits: 2, maximumSignificantDigits: 2
    },
    percent: {
      style: 'percent', useGrouping: false
    }
  }
}

const datetimeFormats = {
  'en-US': {
    short: {
      year: 'numeric', month: 'numeric', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric'
    }
  },
  'pt-BR': {
    short: {
      year: 'numeric', month: 'numeric', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric'
    }
  }
}

export default createI18n({
  numberFormats: numberFormats,
  datetimeFormats: datetimeFormats,
  legacy: false,
  locale: 'pt-BR',
  fallbackLocale: 'pt-BR',
  messages: {
    pt,
    en,
  },
})


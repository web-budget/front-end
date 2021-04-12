import Vue from 'vue'
import i18n from '@/i18n'

import {
  required,
  confirmed,
  length,
  email,
  min,
  max
} from 'vee-validate/dist/rules'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  configure
} from 'vee-validate'

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

configure({
  defaultMessage: (field, values) => {
    if (values && values !== undefined) {
      values._field_ = `${field}`.toLowerCase()
    }
    return i18n.t(`validation.${values?._rule_}`, values)
  }
})

extend('min', { ...min })
extend('max', { ...max })
extend('email', { ...email })
extend('length', { ...length })
extend('required', { ...required })
extend('confirmed', { ...confirmed })

extend('matchPassword', {
  params: ['target'],
  validate(value, { target }) {
    return value === target
  }
})

extend('strongPassword', {
  validate(value) {
    return /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(value)
  }
})

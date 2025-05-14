import * as yup from 'yup'
import { reactive } from 'vue'

import i18n from '@/locales'

import { yupResolver } from '@primevue/forms/resolvers/yup'

const formDefaults = reactive({
  active: true,
  name: null,
  lastFourDigits: null,
  invoicePaymentDay: null,
  type: null,
  wallet: null,
  flag: null,
})

const validationSchema = yupResolver(
  yup.object().shape({
    name: yup.string().min(3).max(150).required(),
    lastFourDigits: yup.string().min(1).max(4).required(),
    type: yup.string().required(),
  }),
)

const cardTypes = [
  { label: i18n.global.t('card.type.debit'), value: 'DEBIT' },
  { label: i18n.global.t('card.type.credit'), value: 'CREDIT' },
]

class Card {
  constructor({ id, name, active, lastFourDigits, invoicePaymentDay, type, wallet, flag }) {
    this.id = id
    this.name = name
    this.active = active
    this.lastFourDigits = lastFourDigits
    this.invoicePaymentDay = invoicePaymentDay
    this.type = type
    this.wallet = wallet
    this.flag = flag
  }
}

export { formDefaults, validationSchema, cardTypes, Card }

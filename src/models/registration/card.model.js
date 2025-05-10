import * as yup from 'yup'
import { reactive } from 'vue'

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
  }),
)

export { formDefaults, validationSchema }

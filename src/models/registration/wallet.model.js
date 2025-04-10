import { reactive } from 'vue'
import * as yup from 'yup'

import { yupResolver } from '@primevue/forms/resolvers/yup'

const formDefaults = reactive({
  active: true,
  name: undefined,
  description: undefined,
  type: undefined,
  bank: undefined,
  agency: undefined,
  number: undefined,
})

const validationSchema = yupResolver(
  yup.object().shape({
    name: yup.string().min(2).max(150).required(),
    type: yup.string().required(),
    bank: yup.string().max(150),
    agency: yup.string().max(10).nullable(),
    number: yup.string().max(16).nullable(),
    description: yup.string().max(255),
  }),
)

export { formDefaults, validationSchema }

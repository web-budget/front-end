import * as yup from 'yup'
import { reactive } from 'vue'

import { yupResolver } from '@primevue/forms/resolvers/yup'

const formDefaults = reactive({
  active: true,
  name: null,
  description: null,
  incomeBudget: null,
  expenseBudget: null,
})

const validationSchema = yupResolver(
  yup.object().shape({
    name: yup.string().min(3).max(150).required(),
  }),
)

export { formDefaults, validationSchema }

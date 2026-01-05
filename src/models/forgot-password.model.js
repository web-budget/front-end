import { reactive } from 'vue'
import * as yup from 'yup'

import { yupResolver } from '@primevue/forms/resolvers/yup'

const formDefaults = reactive({
  email: ''
})

const validationSchema = yupResolver(
  yup.object().shape({
    email: yup.string().email().required()
  })
)

export { formDefaults, validationSchema }

import { reactive } from 'vue'
import * as yup from 'yup'

import { yupResolver } from '@primevue/forms/resolvers/yup'

const formDefaults = reactive({
  password: '',
  confirmation: ''
})

const validationSchema = yupResolver(
  yup.object().shape({
    password: yup.string().min(3).required(),
    confirmation: yup.string().oneOf([yup.ref('password'), null])
  })
)

export { formDefaults, validationSchema }

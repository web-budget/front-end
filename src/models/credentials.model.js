import { reactive } from 'vue'
import * as yup from 'yup'

import { yupResolver } from '@primevue/forms/resolvers/yup'

const formDefaults = reactive({
  username: '',
  password: '',
  remember: false,
})

const validationSchema = yupResolver(
  yup.object().shape({
    username: yup.string().email().required(),
    password: yup.string().required(),
  }),
)

export { formDefaults, validationSchema }

import { reactive } from 'vue'
import * as yup from 'yup'

import { yupResolver } from '@primevue/forms/resolvers/yup'

const formDefaults = reactive({
  username: ''
})

const validationSchema = yupResolver(
  yup.object().shape({
    username: yup.string().email().required(),
  }),
)

export { formDefaults, validationSchema }

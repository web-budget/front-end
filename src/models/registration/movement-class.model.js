import * as yup from 'yup'
import { reactive } from 'vue'

import { yupResolver } from '@primevue/forms/resolvers/yup'

const formDefaults = reactive({
  active: true,
  name: null,
  type: null,
})

const validationSchema = yupResolver(
  yup.object().shape({
    name: yup.string().min(3).max(150).required(),
  }),
)

class MovementClass {
  constructor({ id, name, active, type }) {
    this.id = id
    this.name = name
    this.active = active
    this.type = type
  }
}

export { formDefaults, validationSchema, MovementClass }

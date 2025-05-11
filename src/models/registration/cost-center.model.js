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

class CostCenter {
  constructor({ id, name, active, description, expenseBudget, incomeBudget }) {
    this.id = id
    this.name = name
    this.active = active
    this.description = description
    this.expenseBudget = expenseBudget
    this.incomeBudget = incomeBudget
  }
}

export { formDefaults, validationSchema, CostCenter }

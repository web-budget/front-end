import * as yup from 'yup'
import { reactive } from 'vue'

import { yupResolver } from '@primevue/forms/resolvers/yup'

const formDefaults = reactive({
  active: true,
  name: null,
  description: null,
  incomeBudget: null,
  expenseBudget: null
})

const validationSchema = yupResolver(
  yup.object().shape({
    name: yup.string().min(3).max(150).required()
  })
)

class CostCenter {
  constructor({ id, name, active, description, expenseBudget, incomeBudget, parentCostCenter }) {
    this.id = id
    this.name = name
    this.active = active
    this.description = description
    this.expenseBudget = expenseBudget
    this.incomeBudget = incomeBudget
    this.parentCostCenter = parentCostCenter
  }
}

class CostCenterCreateForm {
  constructor({ name, description, expenseBudget, incomeBudget, parentCostCenter }) {
    this.name = name
    this.description = description
    this.expenseBudget = expenseBudget
    this.incomeBudget = incomeBudget
    this.parentCostCenter = parentCostCenter ? parentCostCenter.id : null
  }
}

class CostCenterUpdateForm {
  constructor({ name, active, description, expenseBudget, incomeBudget, parentCostCenter }) {
    this.name = name
    this.description = description
    this.expenseBudget = expenseBudget
    this.incomeBudget = incomeBudget
    this.active = active
    this.parentCostCenter = parentCostCenter ? parentCostCenter.id : null
  }
}

export { formDefaults, validationSchema, CostCenter, CostCenterCreateForm, CostCenterUpdateForm }

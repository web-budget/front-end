import * as yup from 'yup'
import { reactive } from 'vue'

import i18n from '@/locales'

import { yupResolver } from '@primevue/forms/resolvers/yup'

const formDefaults = reactive({
  active: true,
  name: null,
  type: null,
  costCenter: null,
})

const validationSchema = yupResolver(
  yup.object().shape({
    name: yup.string().min(3).max(150).required(),
    type: yup.string().min(6).max(7).required(),
    costCenter: yup.object().required(),
  }),
)

const movementClassTypes = [
  { label: i18n.global.t('movement-class.type.income'), value: 'INCOME' },
  { label: i18n.global.t('movement-class.type.expense'), value: 'EXPENSE' },
]

class MovementClass {
  constructor({ id, name, active, type, costCenter, budget, description }) {
    this.id = id
    this.name = name
    this.active = active
    this.type = type
    this.costCenter = costCenter
    this.budget = budget
    this.description = description
  }
}

export { formDefaults, validationSchema, movementClassTypes, MovementClass }

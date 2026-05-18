import * as yup from 'yup'
import { reactive } from 'vue'

import i18n from '@/locales'

import { yupResolver } from '@primevue/forms/resolvers/yup'

const formDefaults = reactive({
  active: true,
  name: null,
  type: null
})

const validationSchema = yupResolver(
  yup.object().shape({
    name: yup.string().min(3).max(150).required(),
    type: yup.string().min(6).max(7).required()
  })
)

const classificationTypes = [
  { label: i18n.global.t('classification.type.income'), value: 'INCOME' },
  { label: i18n.global.t('classification.type.expense'), value: 'EXPENSE' }
]

class Classification {
  constructor({ id, name, active, type, budget, description }) {
    this.id = id
    this.name = name
    this.active = active
    this.type = type
    this.budget = budget
    this.description = description
  }
}

class ClassificationCreateForm {
  constructor({ name, type, budget, description }) {
    this.name = name
    this.type = type
    this.budget = budget
    this.description = description
  }
}

class ClassificationUpdateForm {
  constructor({ name, active, budget, description }) {
    this.name = name
    this.budget = budget
    this.description = description
    this.active = active
  }
}

export {
  formDefaults,
  validationSchema,
  classificationTypes,
  Classification,
  ClassificationCreateForm,
  ClassificationUpdateForm
}

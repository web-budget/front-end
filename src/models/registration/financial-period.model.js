import * as yup from 'yup'

import { reactive } from 'vue'

import { yupResolver } from '@primevue/forms/resolvers/yup'

const formDefaults = reactive({
  name: null,
  startingAt: null,
  endingAt: null,
  revenuesGoal: null,
  expensesGoal: null
})

const validationSchema = yupResolver(
  yup.object().shape({
    name: yup.string().min(3).max(150).required(),
    startingAt: yup.date().required(),
    endingAt: yup.date().required(),
  }),
)

class FinancialPeriod {
  constructor({ id, name, startingAt, endingAt, status, revenuesGoal, expensesGoal }) {
    this.id = id
    this.name = name
    this.startingAt = new Date(startingAt + 'T00:00:00')
    this.endingAt = new Date(endingAt + 'T00:00:00')
    this.status = status
    this.revenuesGoal = revenuesGoal
    this.expensesGoal = expensesGoal
  }
}

export { formDefaults, validationSchema, FinancialPeriod }

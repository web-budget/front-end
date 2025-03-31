import CrudClient from '@/http/crud.client'

export default class FinancialPeriodClient extends CrudClient {
  constructor() {
    super('api/registration/financial-periods', true)
  }
}

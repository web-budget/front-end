import BaseCrudClient from '@/clients/base-crud.client'

export default class CostCenterClient extends BaseCrudClient {
  constructor() {
    super('api/registration/cost-centers', true)
  }
}

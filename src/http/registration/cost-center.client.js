import CrudClient from '@/http/crud.client'

export default class CostCenterClient extends CrudClient {
  constructor() {
    super('api/registration/cost-centers', true)
  }
}

import BaseCrudClient from '@/clients/base-crud.client'

export default class UserClient extends BaseCrudClient {
  constructor() {
    super('api/administration/users', true)
  }
}

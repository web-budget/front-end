import BaseClient from '../base.client'

export default class AuthoritiesClient extends BaseClient {
  constructor() {
    super('api/authorities')
  }

  findAll() {
    return super.get()
  }
}

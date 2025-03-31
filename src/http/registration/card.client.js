import CrudClient from '@/http/crud.client'

export default class CardClient extends CrudClient {
  constructor() {
    super('api/registration/cards', true)
  }
}

import CrudClient from '@/http/crud.client'

export default class MovementClassClient extends CrudClient {
  constructor() {
    super('api/registration/movement-classes', true)
  }
}

import BaseClient from '../base.client'

export default class UserClient extends BaseClient {
  constructor() {
    super('api/users')
  }

  findAll(pageRequest) {
    let requestPath = `?page=${pageRequest.current}&size=${pageRequest.size}`

    if (pageRequest.isSortable()) {
      requestPath = `${requestPath}&sort=${pageRequest.sortFields},${pageRequest.direction}`
    }

    return super.get(requestPath, { params: { filter: pageRequest.filter } })
  }
}

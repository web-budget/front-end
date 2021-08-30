import BaseClient from '../base.client'

export default class UserClient extends BaseClient {
  constructor() {
    super('api/users')
  }

  findById(id) {
    return super.get(`/${id}`)
  }

  findAll(pageRequest) {
    let requestPath = `?page=${pageRequest.current}&size=${pageRequest.size}`

    if (pageRequest.isSortable()) {
      requestPath = `${requestPath}&sort=${pageRequest.sortFields},${pageRequest.direction}`
    }

    const requestParams = {
      filter: pageRequest.filter,
      state: pageRequest.state.toUpperCase()
    }

    return super.get(requestPath, { params: requestParams })
  }

  save(payload) {
    return super.post('/', payload)
  }

  update(id, payload) {
    return super.put(`/${id}`, payload)
  }

  delete(id) {
    return super.delete(`/${id}`)
  }
}

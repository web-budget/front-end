import ApiClient from '../api-client.js'

export default class CostCenterClient extends ApiClient {
  constructor() {
    super('api/cost-centers')
  }

  findAll(pageRequest) {
    const requestPath = `?page=${pageRequest.current}&size=${pageRequest.size}`

    // if (pageRequest.isSortable()) {
    //   requestPath = `${requestPath}&sort=${pageRequest.sortFields},${pageRequest.direction}`
    // }

    // const requestParams = {
    //   filter: pageRequest.filter,
    //   state: pageRequest.state.toUpperCase()
    // }

    // return super.get(requestPath, { params: requestParams })
    return super.get(requestPath)
  }
}

export default class PageRequest {
  constructor(
    filterText = '',
    status = 'ACTIVE',
    current = 0,
    size = 15,
    direction = 'asc',
    sortField = 'createdOn'
  ) {
    this.filterText = filterText
    this.status = status
    this.current = current
    this.size = size
    this.direction = direction
    this.sortField = sortField
  }

  getPageableParams() {
    return {
      page: this.current,
      size: this.size,
      sort: `${this.sortField},${this.direction}`,
    }
  }
}

export default class PageRequest {
  constructor(filter = '', state = 'active', current = 0, size = 25, direction = 'asc', sortFields) {
    this.filter = filter
    this.state = state
    this.current = current
    this.size = size
    this.direction = direction
    this.sortFields = sortFields
  }

  isSortable() {
    return Boolean(this.sortFields)
  }
}

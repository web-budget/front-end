export default class PageResponse {
  constructor(content = [], size = 15, number = 0, totalElements = 0, totalPages = 0) {
    this.content = content
    this.size = size
    this.number = number
    this.totalElements = totalElements
    this.totalPages = totalPages
  }
}

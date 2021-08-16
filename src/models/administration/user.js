import PersistentEntity from '../persistent-entity'

export default class User extends PersistentEntity {
  constructor(id, createdOn, updatedOn, active = true, name, email, password, authorities) {
    super(id, createdOn, updatedOn)
    this.active = active
    this.name = name
    this.email = email
    this.password = password
    this.authorities = authorities
  }

  static fromJson(json) {
    return Object.assign(new User(), json)
  }
}

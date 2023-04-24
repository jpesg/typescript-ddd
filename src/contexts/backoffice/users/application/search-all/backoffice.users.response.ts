import { type BackofficeUser } from '../../domain/backoffice.user'

interface BackOfficeUserResponse {
  id: string
  email: string
  password: string
}

export class BackofficeUsersResponse {
  public readonly users: BackOfficeUserResponse[]

  constructor(users: BackofficeUser[]) {
    this.users = users.map((user) => user.toPrimitives())
  }
}

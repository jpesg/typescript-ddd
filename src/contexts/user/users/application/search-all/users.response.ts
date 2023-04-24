import { type User } from '../../domain/user'

interface UserResponse {
  id: string
  email: string
  password: string
}

export class UsersResponse {
  public readonly users: UserResponse[]

  constructor(users: User[]) {
    this.users = users.map((user) => user.toPrimitives())
  }
}

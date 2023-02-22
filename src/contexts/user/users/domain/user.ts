import { type UserEmail } from './user.email'
import { type UserPassword } from './user.password'
import { type UserId } from '../../shared/domain/users/user.id'

export class User {
  readonly id: UserId
  readonly email: UserEmail
  readonly password: UserPassword

  constructor(params: { id: UserId; email: UserEmail; password: UserPassword }) {
    this.id = params.id
    this.email = params.email
    this.password = params.password
  }
}

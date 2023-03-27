import { UserEmail } from './user.email'
import { UserPassword } from './user.password'
import { UserId } from '../../shared/domain/users/user.id'
import { AggregateRoot } from '../../../shared/doman/aggregate.root'

export class User extends AggregateRoot {
  readonly id: UserId
  readonly email: UserEmail
  readonly password: UserPassword

  constructor(id: UserId, email: UserEmail, password: UserPassword) {
    super()
    this.id = id
    this.email = email
    this.password = password
  }

  static fromPrimitives(plainData: { id: string; email: string; password: string }): User {
    return new User(new UserId(plainData.id), new UserEmail(plainData.email), new UserPassword(plainData.password))
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      email: this.email.value,
      password: this.password.value,
    }
  }
}

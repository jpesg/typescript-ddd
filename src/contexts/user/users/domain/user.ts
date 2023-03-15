import { UserEmail } from './user.email'
import { UserPassword } from './user.password'
import { UserId } from '../../shared/domain/users/user.id'
import { AggregateRoot } from '../../../shared/doman/aggregate.root'

export class User extends AggregateRoot {
  readonly id: UserId
  readonly email: UserEmail
  readonly password: UserPassword

  constructor(params: { id: UserId; email: UserEmail; password: UserPassword }) {
    super()
    this.id = params.id
    this.email = params.email
    this.password = params.password
  }

  static fromPrimitives(plainData: { id: string; email: string; password: string }): User {
    return new User({
      id: new UserId(plainData.id),
      email: new UserEmail(plainData.email),
      password: new UserPassword(plainData.password),
    })
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      email: this.email.value,
      password: this.password.value,
    }
  }
}

import { UserEmail } from './user.email'
import { UserPassword } from './user.password'
import { UserId } from '../../shared/domain/users/user.id'
import { AggregateRoot } from '../../../shared/domain/aggregate.root'
import { UserCreatedDomainEvent } from './user.created.domain.event'

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

  static create(id: UserId, email: UserEmail, password: UserPassword): User {
    const user = new User(id, email, password)
    user.record(
      new UserCreatedDomainEvent({
        aggregateId: user.id.value,
        password: user.password.value,
        email: user.email.value,
      })
    )
    return user
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

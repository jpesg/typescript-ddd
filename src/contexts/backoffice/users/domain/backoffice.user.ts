import { AggregateRoot } from '../../../shared/domain/aggregate.root'
import { UserId } from '../../../user/shared/domain/users/user.id'

import { BackofficeUserEmail } from './backoffice.user.email'
import { BackofficeUserPassword } from './backoffice.user.password'

export class BackofficeUser extends AggregateRoot {
  readonly id: UserId
  readonly email: BackofficeUserEmail
  readonly password: BackofficeUserPassword

  constructor(id: UserId, email: BackofficeUserEmail, password: BackofficeUserPassword) {
    super()
    this.id = id
    this.email = email
    this.password = password
  }

  static create(id: UserId, email: BackofficeUserEmail, password: BackofficeUserPassword): BackofficeUser {
    const user = new BackofficeUser(id, email, password)

    return user
  }

  static fromPrimitives(plainData: { id: string; email: string; password: string }): BackofficeUser {
    return new BackofficeUser(
      new UserId(plainData.id),
      new BackofficeUserEmail(plainData.email),
      new BackofficeUserPassword(plainData.password)
    )
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      email: this.email.value,
      password: this.password.value,
    }
  }
}

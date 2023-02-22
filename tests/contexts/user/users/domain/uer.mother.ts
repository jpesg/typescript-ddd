import { type UserId } from '../../../../../src/contexts/user/shared/domain/users/user.id'
import { type UserEmail } from '../../../../../src/contexts/user/users/domain/user.email'
import { type UserPassword } from '../../../../../src/contexts/user/users/domain/user.password'
import { User } from '../../../../../src/contexts/user/users/domain/user'
import { type UserCreatorRequest } from '../../../../../src/contexts/user/users/application/user.creator.request'
import { UserEmailMother } from './user.email.mother'
import { UserPasswordMother } from './user.password.mother'
import { UserIdMother } from '../../shared/domain/users/user.id.mother'

export class UserMother {
  static create(args: { id: UserId; email: UserEmail; password: UserPassword }) {
    return new User(args)
  }

  static fromRequest(request: UserCreatorRequest): User {
    return this.create({
      id: UserIdMother.create(request.id),
      email: UserEmailMother.create(request.email),
      password: UserPasswordMother.create(request.password),
    })
  }
}

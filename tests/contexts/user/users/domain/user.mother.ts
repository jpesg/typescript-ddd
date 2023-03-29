import { type UserId } from '../../../../../src/contexts/user/shared/domain/users/user.id'
import { type UserEmail } from '../../../../../src/contexts/user/users/domain/user.email'
import { type UserPassword } from '../../../../../src/contexts/user/users/domain/user.password'
import { User } from '../../../../../src/contexts/user/users/domain/user'
import { type UserCreatorRequest } from '../../../../../src/contexts/user/users/application/user.creator.request'
import { UserEmailMother } from './user.email.mother'
import { UserPasswordMother } from './user.password.mother'
import { UserIdMother } from '../../shared/domain/users/user.id.mother'

export class UserMother {
  static create(id: UserId, email: UserEmail, password: UserPassword) {
    return new User(id, email, password)
  }

  static fromRequest(request: UserCreatorRequest): User {
    return this.create(
      UserIdMother.create(request.id),
      UserEmailMother.create(request.email),
      UserPasswordMother.create(request.password)
    )
  }

  static random(): User {
    return this.create(UserIdMother.random(), UserEmailMother.random(), UserPasswordMother.random())
  }
}

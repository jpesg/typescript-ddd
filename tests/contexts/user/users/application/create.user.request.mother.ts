import { type UserId } from '../../../../../src/contexts/user/shared/domain/users/user.id'
import { type UserEmail } from '../../../../../src/contexts/user/users/domain/user.email'
import { type UserPassword } from '../../../../../src/contexts/user/users/domain/user.password'
import { type UserCreatorRequest } from '../../../../../src/contexts/user/users/application/user.creator.request'
import { UserIdMother } from '../../shared/domain/users/user.id.mother'
import { UserEmailMother } from '../domain/user.email.mother'
import { UserPasswordMother } from '../domain/user.password.mother'

export class CreateUserRequestMother {
  static create(args: { id: UserId; email: UserEmail; password: UserPassword }) {
    return {
      id: args.id.value,
      email: args.email.value,
      password: args.password.value,
    }
  }

  static random(): UserCreatorRequest {
    return this.create({
      id: UserIdMother.random(),
      email: UserEmailMother.random(),
      password: UserPasswordMother.random(),
    })
  }

  static invalid(): UserCreatorRequest {
    return {
      id: UserIdMother.random().value,
      email: UserEmailMother.invalid(),
      password: UserPasswordMother.random().value,
    }
  }
}

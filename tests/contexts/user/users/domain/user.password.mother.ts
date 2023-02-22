import { UserPassword } from '../../../../../src/contexts/user/users/domain/user.password'
import { PasswordMother } from '../../../shared/domain/password.mother'

export class UserPasswordMother {
  static create(value: string): UserPassword {
    return new UserPassword(value)
  }

  static random(): UserPassword {
    return this.create(PasswordMother.random())
  }
}

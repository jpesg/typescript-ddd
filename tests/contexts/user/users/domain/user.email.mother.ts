import { UserEmail } from '../../../../../src/contexts/user/users/domain/user.email'
import { EmailMother } from '../../../shared/domain/email.mother'

export class UserEmailMother {
  static create(value: string): UserEmail {
    return new UserEmail(value)
  }

  static random(): UserEmail {
    return this.create(EmailMother.random())
  }

  static invalid(): string {
    return 'invalid'
  }
}

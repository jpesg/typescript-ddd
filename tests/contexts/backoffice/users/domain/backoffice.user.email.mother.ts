import { EmailMother } from '../../../shared/domain/email.mother'
import { BackofficeUserEmail } from '../../../../../src/contexts/backoffice/users/domain/backoffice.user.email'

export class BackofficeUserEmailMother {
  static create(value: string): BackofficeUserEmail {
    return new BackofficeUserEmail(value)
  }

  static random(): BackofficeUserEmail {
    return this.create(EmailMother.random())
  }

  static invalid(): string {
    return 'invalid'
  }
}

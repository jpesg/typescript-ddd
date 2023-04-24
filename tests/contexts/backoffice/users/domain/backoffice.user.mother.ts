import { BackofficeUser } from '../../../../../src/contexts/backoffice/users/domain/backoffice.user'
import { BackofficeUserEmailMother } from './backoffice.user.email.mother'
import { type UserId } from '../../../../../src/contexts/user/shared/domain/users/user.id'

import { type BackofficeUserEmail } from '../../../../../src/contexts/backoffice/users/domain/backoffice.user.email'
import { type BackofficeUserPassword } from '../../../../../src/contexts/backoffice/users/domain/backoffice.user.password'
import { UserIdMother } from '../../../user/shared/domain/users/user.id.mother'
import { BackofficeUserPasswordMother } from './backoffice.user.password.mother'

export class BackofficeUserMother {
  static create(id: UserId, email: BackofficeUserEmail, password: BackofficeUserPassword): BackofficeUser {
    return new BackofficeUser(id, email, password)
  }

  static withNameAndDuration(email: string, password: string): BackofficeUser {
    return this.create(
      UserIdMother.random(),
      BackofficeUserEmailMother.create(email),
      BackofficeUserPasswordMother.create(password)
    )
  }

  static random(): BackofficeUser {
    return this.create(UserIdMother.random(), BackofficeUserEmailMother.random(), BackofficeUserPasswordMother.random())
  }
}

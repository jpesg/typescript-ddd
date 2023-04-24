import { type BackofficeUserRepository } from '../../domain/backoffice.user.repository'
import { BackofficeUser } from '../../domain/backoffice.user'
import { BackofficeUserEmail } from '../../domain/backoffice.user.email'
import { UserId } from '../../../../user/shared/domain/users/user.id'
import { BackofficeUserPassword } from '../../domain/backoffice.user.password'

export class BackofficeUserCreator {
  constructor(private backofficeUserRepository: BackofficeUserRepository) {}

  async run(id: string, email: string, password: string) {
    const user = new BackofficeUser(
      new UserId(id),
      new BackofficeUserEmail(email),
      new BackofficeUserPassword(password)
    )

    await this.backofficeUserRepository.save(user)
  }
}

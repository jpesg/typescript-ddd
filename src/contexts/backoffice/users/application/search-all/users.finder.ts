import { type BackofficeUserRepository } from '../../domain/backoffice.user.repository'

export class UsersFinder {
  constructor(private usersRepository: BackofficeUserRepository) {}

  async run() {
    return await this.usersRepository.searchAll()
  }
}

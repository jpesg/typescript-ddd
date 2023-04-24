import { UsersResponse } from './users.response'
import { type UserRepository } from '../../domain/user.repository'

export class UsersFinder {
  constructor(private usersRepository: UserRepository) {}

  async run() {
    const courses = await this.usersRepository.searchAll()

    return new UsersResponse(courses)
  }
}

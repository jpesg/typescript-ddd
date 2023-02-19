import { type UserRepository } from '../domain/user.repository'
import { User } from '../domain/user'

export class UserCreator {
  constructor(private repository: UserRepository) {}
  async run(uuid: string, email: string, password: string) {
    const user = new User(uuid, email, password)
    await this.repository.save(user)
  }
}

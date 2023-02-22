import { type UserRepository } from '../domain/user.repository'
import { User } from '../domain/user'
import { type UserCreatorRequest } from './user.creator.request'
import { UserId } from '../../shared/domain/users/user.id'
import { UserPassword } from '../domain/user.password'
import { UserEmail } from '../domain/user.email'

export class UserCreator {
  constructor(private readonly userRepository: UserRepository) {}
  async run(request: UserCreatorRequest) {
    const user = new User({
      password: new UserPassword(request.password),
      email: new UserEmail(request.email),
      id: new UserId(request.id),
    })
    await this.userRepository.save(user)
  }
}

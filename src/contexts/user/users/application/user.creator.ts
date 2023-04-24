import { type UserRepository } from '../domain/user.repository'
import { User } from '../domain/user'
import { type UserCreatorRequest } from './user.creator.request'
import { UserId } from '../../shared/domain/users/user.id'
import { UserPassword } from '../domain/user.password'
import { UserEmail } from '../domain/user.email'
import { type EventBus } from '../../../shared/domain/event.bus'

export default class UserCreator {
  constructor(private userRepository: UserRepository, private eventBus: EventBus) {}
  async run(request: UserCreatorRequest) {
    const user = User.create(new UserId(request.id), new UserEmail(request.email), new UserPassword(request.password))
    await this.userRepository.save(user)
    await this.eventBus.publish(user.pullDomainEvents())
  }

  async runCommand(params: { id: UserId; email: UserEmail; password: UserPassword }) {
    const user = User.create(params.id, params.email, params.password)
    await this.userRepository.save(user)
    await this.eventBus.publish(user.pullDomainEvents())
  }
}

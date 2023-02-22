import { type UserRepository } from '../domain/user.repository'
import { User } from '../domain/user'
import { type UserCreatorRequest } from './user.creator.request'
import { Uuid } from '../../../shared/doman/value-objects/uuid'

export class UserCreator {
  constructor(private readonly userRepository: UserRepository) {}
  async run(request: UserCreatorRequest) {
    const user = new User({ ...request, id: new Uuid(request.id) })
    await this.userRepository.save(user)
  }
}

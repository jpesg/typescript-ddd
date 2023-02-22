import * as aw from 'awilix'
import { UserPutController, StatusGetController } from './apps/user'
import { UserCreator, FileUserRepository } from './users'

export const container = aw.createContainer({ injectionMode: 'CLASSIC' })
container.register({
  userRepository: aw.asClass(FileUserRepository).singleton(),
  userCreator: aw.asClass(UserCreator),
  statusGetController: aw.asClass(StatusGetController),
  userPutController: aw.asClass(UserPutController),
})

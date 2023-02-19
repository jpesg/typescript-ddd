/* eslint-disable @typescript-eslint/no-floating-promises */
import { ContainerBuilder } from 'node-dependency-injection'

import { StatusGetController, UserPutController } from './apps/user'
import { UserCreator } from '../../../../contexts/user/users/application/user.creator'
import { FileUserRespository } from '../../../../contexts/user/users/infrastructure/persistence/file.user.respository.test'

const container = new ContainerBuilder()

container.register('Apps.user.controllers.StatusGetController', StatusGetController)
container
  .register('Apps.user.controllers.UserPutController', UserPutController)
  .addArgument('Users.user.application.UserCreator')

container.register('Users.user.domain.UserRepository', FileUserRespository)
container.register('Users.user.application.UserCreator', UserCreator).addArgument('Users.user.domain.UserRepository')
export { container }

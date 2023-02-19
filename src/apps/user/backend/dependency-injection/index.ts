/* eslint-disable @typescript-eslint/no-floating-promises */
import { ContainerBuilder } from 'node-dependency-injection'

import { StatusGetController, UserPutController } from './apps/user'

const container = new ContainerBuilder()

container.register('Apps.user.controllers.StatusGetController', StatusGetController)
container.register('Apps.user.controllers.UserPutController', UserPutController)
export { container }

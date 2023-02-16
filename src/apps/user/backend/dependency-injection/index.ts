/* eslint-disable @typescript-eslint/no-floating-promises */
import { ContainerBuilder } from 'node-dependency-injection'

import { StatusGetController } from './apps/user'

const container = new ContainerBuilder()

container.register('Apps.user.controllers.StatusGetController', StatusGetController)
export { container }

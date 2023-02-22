import { type Router } from 'express'
import { container } from '../dependency-injection'
import { type UserPutController } from '../controllers/user.put.controller'

import { controllerFactory } from '../../../shared/backend/controller'

const userRoutes = (router: Router) => {
  const _controller: UserPutController = container.resolve<UserPutController>('userPutController')
  router.get('/', controllerFactory(_controller))
  router.put('/:uuid', controllerFactory(_controller))

  router.get('/:uuid', _controller.run)
  return router
}
export const register = (router: Router) => {
  router.use('/users', userRoutes(router))
}

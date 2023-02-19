import { type Router } from 'express'
import { container } from '../dependency-injection'
import { type UserPutController } from '../controllers/user.put.controller'

const userRoutes = (router: Router) => {
  const controller = container.get<UserPutController>('Apps.user.controllers.UserPutController')
  router.put('/:uuid', controller.run)

  router.get('/:uuid', controller.run)
  return router
}
export const register = (router: Router) => {
  router.use('/users', userRoutes(router))
}

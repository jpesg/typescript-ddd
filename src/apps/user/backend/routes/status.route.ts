import { type Router } from 'express'
import { type StatusGetController } from '../controllers/status.get.controller'
import { container } from '../dependency-injection'
export const register = (router: Router) => {
  const controller = container.get<StatusGetController>('Apps.user.controllers.StatusGetController')
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return router.get('/status', controller.run)
}

import { type Router } from 'express'
import { StatusGetController } from '../controllers/status.get.controller'

export const register = (router: Router) => {
  const controller = new StatusGetController()
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.get('/status', controller.run)
}

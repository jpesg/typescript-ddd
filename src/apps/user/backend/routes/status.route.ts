import { type Router } from 'express'
import type StatusGetController from '../controllers/status.get.controller'
import container from '../dependency-injection'
import { controllerFactory } from '../../../shared/backend/controller'
export const register = (router: Router) => {
  const controller: StatusGetController = container.get('Apps.user.controllers.StatusGetController')

  return router.get('/status', controllerFactory(controller))
}

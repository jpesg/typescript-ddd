import { type Express } from 'express'
import type StatusGetController from '../controllers/status.get.controller'
import container from '../dependency-injection'

export const register = (app: Express) => {
  const controller: StatusGetController = container.get('Apps.Backoffice.Backend.controllers.StatusGetController')
  app.get('/status', controller.run.bind(controller))
}

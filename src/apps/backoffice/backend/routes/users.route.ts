import { type Express } from 'express'
import container from '../dependency-injection'
import { type UsersPostController } from '../controllers/users.post.controller'

export const register = (app: Express) => {
  const usersPostController: UsersPostController = container.get(
    'Apps.Backoffice.Backend.controllers.UsersPostController'
  )

  app.post('/users', usersPostController.run.bind(usersPostController))
}

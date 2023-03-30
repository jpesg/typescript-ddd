import { type Request, type Response, type Router } from 'express'
import container from '../dependency-injection'

export const register = (router: Router) => {
  const usersCounterGetController = container.get('Apps.mooc.controllers.UsersCounterGetController')
  router.get('/users-counter', (req: Request, res: Response) => usersCounterGetController.run(req, res))
}

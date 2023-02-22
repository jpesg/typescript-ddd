import { type Controller } from '../domain/controllers/controller'
import { type Request, type Response } from 'express'

export const controllerFactory =
  <T extends Controller>(controller: T) =>
  async (req: Request, res: Response) => {
    await controller.run(req, res)
  }

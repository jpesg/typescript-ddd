import { type Controller } from './controller'
import httpStatus from 'http-status'
import { type Request, type Response } from 'express'

export class StatusGetController implements Controller {
  async run(req: Request, res: Response) {
    res.status(httpStatus.OK).send()
  }
}

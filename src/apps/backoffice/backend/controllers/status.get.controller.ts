import { type Controller } from '../../../shared/domain/controllers/controller'
import { type Request, type Response } from 'express'
import httpStatus from 'http-status'

export default class StatusGetController implements Controller {
  async run(req: Request, res: Response) {
    res.status(httpStatus.OK).send()
  }
}

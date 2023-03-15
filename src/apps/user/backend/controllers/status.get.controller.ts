import { type Controller } from '../../../shared/domain/controllers/controller'
import httpStatus from 'http-status'
import { type Request, type Response } from 'express'

export default class StatusGetController implements Controller {
  async run(req: Request, res: Response) {
    res.status(httpStatus.OK).send()
  }
}

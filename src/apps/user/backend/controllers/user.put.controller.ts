import { type Controller } from './controller'
import httpStatus from 'http-status'
import { type Response, type Request } from 'express'

export class UserPutController implements Controller {
  async run(req: Request, res: Response): Promise<void> {
    res.status(httpStatus.CREATED).send()
  }
}

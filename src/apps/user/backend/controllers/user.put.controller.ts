import { type Controller } from './controller'
import httpStatus from 'http-status'
import { type Response, type Request } from 'express'
import { type UserCreator } from '../../../../contexts/user/users/application/user.creator'
interface UserRequest extends Request {
  body: {
    uuid: string
    email: string
    password: string
  }
}

export class UserPutController implements Controller {
  constructor(private userCreator: UserCreator) {}

  async run(req: UserRequest, res: Response): Promise<void> {
    try {
      const { uuid, email, password } = req.body
      await this.userCreator.run(uuid, email, password)
      res.status(httpStatus.CREATED).send()
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send()
    }
  }
}

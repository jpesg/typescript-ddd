import { type Controller } from '../../../shared/domain/controllers/controller'
import { type CommandBus } from '../../../../contexts/shared/domain/command.bus'
import { type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { CreateUserCommand } from '../../../../contexts/user/users/domain/create.user.command'
/*
interface CreateUserRequest {
  id: string
  email: string
  password: string
}
*/
export class UsersPostController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}
  async run(req: Request, res: Response) {
    await this.createUser(req)
    res.status(httpStatus.OK).send()
  }

  private async createUser(req: Request) {
    const createUserCommand = new CreateUserCommand({
      id: req.body.id,
      email: req.body.email,
      password: req.body.password,
    })
    await this.commandBus.dispatch(createUserCommand)
  }
}

import { type Controller } from '../../../shared/domain/controllers/controller'
import httpStatus from 'http-status'
import { type Response, type Request } from 'express'
import { type UserCreator } from '../../../../contexts/user/users/application/user.creator'
import { requestParser } from '../../../shared/infrastructure/request.validator'
import { z } from 'zod'
import { ValidationError } from '../../../shared/domain/errors/validation.error'

const schema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'is required',
      })
      .email({
        message: 'invalid email',
      }),
    password: z.string({
      required_error: 'is required',
    }),
    id: z
      .string({
        required_error: 'is required',
      })
      .uuid({
        message: 'invalid uuid',
      }),
  }),
  params: z.object({
    uuid: z
      .string({
        required_error: 'is required',
      })
      .uuid({
        message: 'invalid uuid',
      }),
  }),
})
export class UserPutController implements Controller {
  constructor(private readonly userCreator: UserCreator) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { body } = await requestParser(schema, req)

      const { email, password, id } = body

      await this.userCreator.run({ id, email, password })
      res.status(httpStatus.CREATED).send()
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: error.message, errors: error.errors })
        return
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Error creating an user' })
    }
  }
}

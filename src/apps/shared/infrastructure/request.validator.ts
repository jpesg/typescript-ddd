import { z } from 'zod'
import { ValidationError } from '../domain/errors/validation.error'
import { type Request } from 'express'

export const requestParser = async <T extends z.AnyZodObject, R extends Request>(
  schema: T,
  req: R
): Promise<z.infer<T>> => {
  try {
    return await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.reduce((acc, error) => {
        const key = error.path.slice(1).join('.')
        return { ...acc, [key]: error.message }
      }, {})

      throw new ValidationError('Schema error', errors)
    }
    throw new Error(JSON.stringify(error))
  }
}

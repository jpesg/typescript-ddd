import { z } from 'zod'

import { StringValueObject } from '../../../shared/domain/value-objects/string.value.object'
import { InvalidEmail } from '../../../user/users/domain/errors/invalid.email'

export class BackofficeUserEmail extends StringValueObject {
  constructor(value: string) {
    super(value)
    BackofficeUserEmail.ensureIsValidEmail(value)
  }

  private static ensureIsValidEmail(value: string) {
    const schema = z.string().email()
    try {
      schema.parse(value)
    } catch (e) {
      throw new InvalidEmail(`Invalid value: ${value}`)
    }
  }
}

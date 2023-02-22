import { StringValueObject } from '../../../shared/doman/value-objects/string.value.object'
import { z } from 'zod'
import { InvalidEmail } from './errors/invalid.email'

export class UserEmail extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureIsValidEmail(value)
  }

  private ensureIsValidEmail(value: string) {
    const schema = z.string().email()
    try {
      schema.parse(value)
    } catch (e) {
      throw new InvalidEmail(`Invalid value: ${value}`)
    }
  }
}

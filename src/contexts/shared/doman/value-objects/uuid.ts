import { z } from 'zod'
import { InvalidArgumentError } from '../../../../apps/shared/domain/errors/invalid.argument.error'
import { uuidGenerator } from '../../../../apps/shared/infrastructure/uuid.generator'

export class Uuid {
  constructor(readonly value: string) {
    this.ensureIsValidUUID(value)
  }

  static random(): Uuid {
    return new Uuid(uuidGenerator())
  }

  private ensureIsValidUUID(value: string) {
    const schema = z.string().uuid()
    try {
      schema.parse(value)
    } catch (e) {
      throw new InvalidArgumentError()
    }
  }

  toString() {
    return this.value
  }
}

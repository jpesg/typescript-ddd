import { z } from 'zod'
import { InvalidArgumentError } from '../../../../apps/shared/domain/errors/invalid.argument.error'
import { uuidGenerator } from '../../../../apps/shared/infrastructure/uuid.generator'
import { ValueObject } from './value.object'

export class Uuid extends ValueObject<string> {
  constructor(readonly value: string) {
    super(value)
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

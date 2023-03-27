import { ValueObject } from './value.object'

export class StringValueObject extends ValueObject<string> {
  constructor(readonly value: string) {
    super(value)
  }

  toString(): string {
    return this.value
  }
}

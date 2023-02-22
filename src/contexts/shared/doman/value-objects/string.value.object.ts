export class StringValueObject {
  constructor(readonly value: string) {}

  toString(): string {
    return this.value
  }
}

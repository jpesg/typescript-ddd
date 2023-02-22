import { MotherCreator } from './mother.creator'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class UuidMother {
  static random(): string {
    return MotherCreator.random().datatype.uuid()
  }
}

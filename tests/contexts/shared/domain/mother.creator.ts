import { type Faker, faker } from '@faker-js/faker'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MotherCreator {
  static random(): Faker {
    return faker
  }
}

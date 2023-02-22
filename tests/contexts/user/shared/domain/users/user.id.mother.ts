import { UserId } from '../../../../../../src/contexts/user/shared/domain/users/user.id'
import { UuidMother } from '../../../../shared/domain/uuid.mother'

export class UserIdMother {
  static create(value: string): UserId {
    return new UserId(value)
  }

  static random(): UserId {
    return this.create(UuidMother.random())
  }
}

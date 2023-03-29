import { NumberValueObject } from '../../../shared/domain/value-objects/int.value.object'

export class UsersCounterTotal extends NumberValueObject {
  increment(): UsersCounterTotal {
    return new UsersCounterTotal(this.value + 1)
  }

  static initialize(): UsersCounterTotal {
    return new UsersCounterTotal(0)
  }
}

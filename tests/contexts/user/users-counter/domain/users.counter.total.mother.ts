import { IntegerMother } from '../../../shared/domain/integer.mother'
import { UsersCounterTotal } from '../../../../../src/contexts/user/users-counter/domain/users.counter.total'

export class UsersCounterTotalMother {
  static random() {
    return new UsersCounterTotal(IntegerMother.random())
  }
}

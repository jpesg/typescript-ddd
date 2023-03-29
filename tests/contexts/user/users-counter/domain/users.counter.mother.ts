import { UsersCounterTotalMother } from './users.counter.total.mother'

import { UsersCounter } from '../../../../../src/contexts/user/users-counter/domain/users.counter'
import { UsersCounterId } from '../../../../../src/contexts/user/users-counter/domain/users.counter.id'
import { UserIdMother } from '../../shared/domain/users/user.id.mother'
import { type UserId } from '../../../../../src/contexts/user/shared/domain/users/user.id'
import { UsersCounterTotal } from '../../../../../src/contexts/user/users-counter/domain/users.counter.total'
import { Repeater } from '../../../shared/domain/repeater'

export class UsersCounterMother {
  static random() {
    const total = UsersCounterTotalMother.random()
    return new UsersCounter(
      UsersCounterId.random(),
      total,
      Repeater.random(UserIdMother.random.bind(UserIdMother), total.value)
    )
  }

  static withOne(userId: UserId) {
    return new UsersCounter(UsersCounterId.random(), new UsersCounterTotal(1), [userId])
  }
}

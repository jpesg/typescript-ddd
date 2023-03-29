import { type UsersCounter } from '../../../../../src/contexts/user/users-counter/domain/users.counter'
import { UsersCounterIncrementeDomainEvent } from '../../../../../src/contexts/user/users-counter/domain/users.counter.incremente.domain.event'

export class UsersCounterIncrementedDomainEventMother {
  static fromUserCounter(counter: UsersCounter): UsersCounterIncrementeDomainEvent {
    return new UsersCounterIncrementeDomainEvent({
      aggregateId: counter.id.value,
      total: counter.total.value,
    })
  }
}

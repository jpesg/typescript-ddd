import { type UsersCounter } from '../../../../../src/contexts/user/users-counter/domain/users.counter'
import { UsersCounterIncrementeDomainEvent } from '../../../../../src/contexts/user/users-counter/domain/users.counter.incremente.domain.event'
import { type DomainEvent } from '../../../../../src/contexts/shared/domain/domain.event'
import { UsersCounterMother } from './users.counter.mother'

export class UsersCounterIncrementedDomainEventMother {
  static create(): DomainEvent {
    return UsersCounterIncrementedDomainEventMother.fromUserCounter(UsersCounterMother.random())
  }

  static fromUserCounter(counter: UsersCounter): UsersCounterIncrementeDomainEvent {
    return new UsersCounterIncrementeDomainEvent({
      aggregateId: counter.id.value,
      total: counter.total.value,
    })
  }
}

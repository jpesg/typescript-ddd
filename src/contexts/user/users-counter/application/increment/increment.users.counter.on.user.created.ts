import { type UsersCounterIncrementer } from './users.counter.incrementer'
import { type DomainEventSubscriber } from '../../../../shared/domain/domain.event.subscriber'
import { UserCreatedDomainEvent } from '../../../users/domain/user.created.domain.event'
import { type DomainEventClass } from '../../../../shared/domain/domain.event'
import { UserId } from '../../../shared/domain/users/user.id'

export class IncrementUsersCounterOnUserCreated implements DomainEventSubscriber<UserCreatedDomainEvent> {
  constructor(private incrementer: UsersCounterIncrementer) {}

  subscribedTo(): DomainEventClass[] {
    return [UserCreatedDomainEvent]
  }

  async on(domainEvent: UserCreatedDomainEvent) {
    await this.incrementer.run(new UserId(domainEvent.aggregateId))
  }
}

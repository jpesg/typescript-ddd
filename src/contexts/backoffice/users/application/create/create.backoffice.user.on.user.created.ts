import { type BackofficeUserCreator } from './backoffice.user.creator'
import { type DomainEventSubscriber } from '../../../../shared/domain/domain.event.subscriber'
import { UserCreatedDomainEvent } from '../../../../user/users/domain/user.created.domain.event'
import { type DomainEventClass } from '../../../../shared/domain/domain.event'

export class CreateBackofficeUserOnUserCreated implements DomainEventSubscriber<UserCreatedDomainEvent> {
  constructor(private creator: BackofficeUserCreator) {}

  subscribedTo(): DomainEventClass[] {
    return [UserCreatedDomainEvent]
  }

  async on(domainEvent: UserCreatedDomainEvent): Promise<void> {
    const { aggregateId, email, password } = domainEvent

    await this.creator.run(aggregateId, email, password)
  }
}

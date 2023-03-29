import { type DomainEvent, type DomainEventClass } from './domain.event'

export interface DomainEventSubscriber<T extends DomainEvent> {
  subscribedTo: () => DomainEventClass[]
  on: (domainEvent: T) => Promise<void>
}

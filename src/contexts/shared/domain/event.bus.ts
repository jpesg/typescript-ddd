import { type DomainEvent } from './domain.event'
import { type DomainEventSubscriber } from './domain.event.subscriber'

export interface EventBus {
  publish: (events: DomainEvent[]) => Promise<void>
  addSubscribers: (subscribers: Array<DomainEventSubscriber<DomainEvent>>) => void
}

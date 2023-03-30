import { type DomainEvent } from './domain.event'
import { type DomainEventSubscribers } from '../infrastructure/event-bus/domain.event.subscribers'

export interface EventBus {
  publish: (events: DomainEvent[]) => Promise<void>
  addSubscribers: (subscribers: DomainEventSubscribers) => void
}

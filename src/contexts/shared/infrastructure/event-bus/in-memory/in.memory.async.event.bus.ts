import { type DomainEvent } from '../../../domain/domain.event'
import { EventEmitter } from 'node:events'
import { type EventBus } from '../../../domain/event.bus'
import { type DomainEventSubscribers } from '../domain.event.subscribers'

export class InMemoryAsyncEventBus extends EventEmitter implements EventBus {
  async publish(events: DomainEvent[]): Promise<void> {
    events.map((event) => this.emit(event.eventName, event))
  }

  addSubscribers(subscribers: DomainEventSubscribers) {
    subscribers.items.forEach((subscriber) => {
      subscriber.subscribedTo().forEach((event) => {
        this.on(event.EVENT_NAME, subscriber.on.bind(subscriber))
      })
    })
  }
}

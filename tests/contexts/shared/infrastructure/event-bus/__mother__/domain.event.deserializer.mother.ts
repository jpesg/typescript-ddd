import { DomainEventSubscribers } from '../../../../../../src/contexts/shared/infrastructure/event-bus/domain.event.subscribers'
import { DomainEventDeserializer } from '../../../../../../src/contexts/shared/infrastructure/event-bus/domain.event.deserializer'
import { DomainEventSubscriberDummy } from '../__mocks__/domain.event.subscriber.dummy'

export class DomainEventDeserializerMother {
  static create() {
    const dummySubscriber = new DomainEventSubscriberDummy()
    const subscribers = new DomainEventSubscribers([dummySubscriber])
    return DomainEventDeserializer.configure(subscribers)
  }
}

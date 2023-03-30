import { type DomainEventSubscribers } from './domain.event.subscribers'
import { type DomainEventClass } from '../../domain/domain.event'

interface DomainEventJSON {
  type: string
  aggregateId: string
  attributes: string
  id: string
  occurred_on: string
}

export class DomainEventDeserializer extends Map<string, DomainEventClass> {
  static configure(subscribers: DomainEventSubscribers) {
    const mapping = new DomainEventDeserializer()
    subscribers.items.forEach((subscriber) => {
      subscriber.subscribedTo().forEach(mapping.registerEvent.bind(mapping))
    })

    return mapping
  }

  private registerEvent(domainEvent: DomainEventClass) {
    const eventName = domainEvent.EVENT_NAME
    this.set(eventName, domainEvent)
  }

  deserialize(event: string) {
    const eventData = JSON.parse(event).data as DomainEventJSON
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { type, aggregateId, attributes, id, occurred_on } = eventData
    const eventClass = super.get(type)

    if (eventClass == null) {
      throw Error(`DomainEvent mapping not found for event ${type}`)
    }

    return eventClass.fromPrimitives({
      aggregateId,
      attributes,
      occurredOn: new Date(occurred_on),
      eventId: id,
    })
  }
}

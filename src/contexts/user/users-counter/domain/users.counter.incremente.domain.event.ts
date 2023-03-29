import { DomainEvent } from '../../../shared/domain/domain.event'

interface UsersCounterIncrementedAttributes {
  total: number
}

export class UsersCounterIncrementeDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'users_counter.incremented'
  readonly total: number

  constructor(data: { aggregateId: string; total: number; eventId?: string; occurredOn?: Date }) {
    const { aggregateId, eventId, occurredOn } = data
    super({ eventName: UsersCounterIncrementeDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn })
    this.total = data.total
  }

  toPrimitives() {
    return {
      total: this.total,
    }
  }

  static fromPrimitives(params: {
    aggregateId: string
    attributes: UsersCounterIncrementedAttributes
    eventId: string
    occurredOn: Date
  }) {
    const { aggregateId, attributes, eventId, occurredOn } = params
    return new UsersCounterIncrementeDomainEvent({
      aggregateId,
      total: attributes.total,
      eventId,
      occurredOn,
    })
  }
}

import { DomainEvent } from '../../../shared/domain/domain.event'

interface CreateUserDomainEventAttributes {
  readonly email: string
  readonly password: string
}

export class UserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user.created'

  readonly email: string
  readonly password: string
  constructor({
    aggregateId,
    email,
    password,
    eventId,
    occurredOn,
  }: {
    aggregateId: string
    eventId?: string
    email: string
    password: string
    occurredOn?: Date
  }) {
    super({ eventName: UserCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn })
    this.email = email
    this.password = password
  }

  toPrimitives(): CreateUserDomainEventAttributes {
    const { email, password } = this
    return {
      email,
      password,
    }
  }

  static fromPrimitives(params: {
    aggregateId: string
    attributes: CreateUserDomainEventAttributes
    eventId: string
    occurredOn: Date
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params
    return new UserCreatedDomainEvent({
      aggregateId,
      email: attributes.email,
      password: attributes.password,
      eventId,
      occurredOn,
    })
  }
}

import { UserCreatedDomainEvent } from '../../../../../src/contexts/user/users/domain/user.created.domain.event'
import { type User } from '../../../../../src/contexts/user/users/domain/user'

export class UserCreatedDomainEventMother {
  static create({
    aggregateId,
    eventId,
    email,
    password,
    occurredOn,
  }: {
    aggregateId: string
    eventId?: string
    email: string
    password: string
    occurredOn?: Date
  }): UserCreatedDomainEvent {
    return new UserCreatedDomainEvent({
      aggregateId,
      eventId,
      email,
      password,
      occurredOn,
    })
  }

  static fromUser(user: User): UserCreatedDomainEvent {
    return new UserCreatedDomainEvent({
      aggregateId: user.id.value,
      password: user.password.value,
      email: user.email.value,
    })
  }
}

import { type DomainEvent } from './domain.event'

export abstract class AggregateRoot {
  private domainEvents: DomainEvent[]

  constructor() {
    this.domainEvents = []
  }

  record(event: DomainEvent) {
    this.domainEvents.push(event)
  }

  pullDomainEvents(): DomainEvent[] {
    const domainEvents = this.domainEvents.slice()
    this.domainEvents = []
    return domainEvents
  }
  abstract toPrimitives(): any
}

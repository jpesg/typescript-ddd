import { type DomainEventSubscriber } from '../../../domain/domain.event.subscriber'
import { type DomainEvent } from '../../../domain/domain.event'

export class RabbitMQQueueFormatter {
  constructor(private moduleName: string) {}

  private snakeCase(value: string) {
    const name = value
      .split(/(?=[A-Z])/)
      .join('_')
      .toLowerCase()
    return `${this.moduleName}.${name}`
  }

  // eslint-disable-next-line @typescript-eslint/no-dupe-class-members
  format(subscriber: DomainEventSubscriber<DomainEvent>) {
    return this.snakeCase(subscriber.constructor.name)
  }

  formatRetry(subscriber: DomainEventSubscriber<DomainEvent>) {
    const name = this.format(subscriber)
    return `retry.${name}`
  }

  formatDeadLetter(subscriber: DomainEventSubscriber<DomainEvent>) {
    const name = this.format(subscriber)
    return `dead_letter.${name}`
  }
}

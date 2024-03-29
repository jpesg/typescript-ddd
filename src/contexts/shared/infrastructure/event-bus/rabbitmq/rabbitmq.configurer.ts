import { type RabbitMQConnection } from './rabbitmq.connection'

import { type DomainEvent } from '../../../domain/domain.event'
import { type DomainEventSubscriber } from '../../../domain/domain.event.subscriber'
import { type RabbitMQQueueFormatter } from './rabbitmq.queue.formatter'
import { RabbitMQExchangeNameFormatter } from './rabbitmq.exchange.name.formatter'

export class RabbitMQConfigurer {
  constructor(
    private connection: RabbitMQConnection,
    private queueNameFormatter: RabbitMQQueueFormatter,
    private messageRetryTtl: number
  ) {}

  async configure(params: { exchange: string; subscribers: Array<DomainEventSubscriber<DomainEvent>> }) {
    await this.connection.exchange({ name: params.exchange })
    for (const subscriber of params.subscribers) {
      await this.addQueue(subscriber, params.exchange)
    }
  }

  private async addQueue(subscriber: DomainEventSubscriber<DomainEvent>, exchange: string) {
    const retryExchange = RabbitMQExchangeNameFormatter.retry(exchange)
    const deadLetterExchange = RabbitMQExchangeNameFormatter.deadLetter(exchange)

    // const routingKeys = subscriber.subscribedTo().map((event) => event.EVENT_NAME)
    const routingKeys = this.getRoutingKeysFor(subscriber)

    const queue = this.queueNameFormatter.format(subscriber)
    const deadLetterQueue = this.queueNameFormatter.formatDeadLetter(subscriber)
    const retryQueue = this.queueNameFormatter.formatRetry(subscriber)

    await this.connection.queue({
      routingKeys,
      name: queue,
      exchange,
    })

    await this.connection.queue({
      routingKeys: [queue],
      name: retryQueue,
      exchange: retryExchange,
      messageTtl: this.messageRetryTtl,
      deadLetterExchange: exchange,
      deadLetterQueue: queue,
    })

    await this.connection.queue({
      routingKeys: [queue],
      name: deadLetterQueue,
      exchange: deadLetterExchange,
    })
  }

  private getRoutingKeysFor(subscriber: DomainEventSubscriber<DomainEvent>) {
    const routingKeys = subscriber.subscribedTo().map((event) => event.EVENT_NAME)

    const queue = this.queueNameFormatter.format(subscriber)
    routingKeys.push(queue)

    return routingKeys
  }
}

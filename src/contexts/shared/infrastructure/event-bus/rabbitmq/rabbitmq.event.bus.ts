import { type EventBus } from '../../../domain/event.bus'
import { type RabbitMQConnection } from './rabbitmq.connection'
import { type DomainEventSubscribers } from '../domain.event.subscribers'
import { type DomainEvent } from '../../../domain/domain.event'
import { type DomainEventFailoverPublisher } from '../domain-event-failover-publisher/domain.event.failover.publisher'
import { DomainEventJsonSerializer } from '../domain.event.json.serializer'
import { DomainEventDeserializer } from '../domain.event.deserializer'
import { RabbitMQConsumerFactory } from './rabbitmq.consumer.factory'
import { type RabbitMQQueueFormatter } from './rabbitmq.queue.formatter'

export class RabbitMQEventBus implements EventBus {
  private failoverPublisher: DomainEventFailoverPublisher
  private readonly connection: RabbitMQConnection
  private readonly exchange: string
  private queueNameFormatter: RabbitMQQueueFormatter
  private maxRetries: number

  constructor(params: {
    failoverPublisher: DomainEventFailoverPublisher
    connection: RabbitMQConnection
    exchange: string
    queueNameFormatter: RabbitMQQueueFormatter
    maxRetries: number
  }) {
    this.failoverPublisher = params.failoverPublisher
    this.connection = params.connection
    this.exchange = params.exchange
    this.queueNameFormatter = params.queueNameFormatter
    this.maxRetries = params.maxRetries
  }

  async addSubscribers(subscribers: DomainEventSubscribers): Promise<void> {
    const deserializer = DomainEventDeserializer.configure(subscribers)
    const consumerFactory = new RabbitMQConsumerFactory(deserializer, this.connection, this.maxRetries)

    for (const subscriber of subscribers.items) {
      const queueName = this.queueNameFormatter.format(subscriber)
      const rabbitMQConsumer = consumerFactory.build(subscriber, this.exchange, queueName)

      await this.connection.consume(queueName, rabbitMQConsumer.onMessage.bind(rabbitMQConsumer))
    }
  }

  async publish(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      try {
        const routingKey = event.eventName
        const content = RabbitMQEventBus.serialize(event)
        const options = RabbitMQEventBus.options(event)
        await this.connection.publish({
          routingKey,
          content,
          options,
          exchange: this.exchange,
        })
      } catch (error: any) {
        await this.failoverPublisher.publish(event)
      }
    }
  }

  private static serialize(event: DomainEvent): Buffer {
    /* const primitives = {
      data: {
        id: event.eventId,
        type: event.eventName,
        occurred_on: event.occurredOn.toISOString(),
        attributes: event.toPrimitives(),
      },
    } */
    const primitives = DomainEventJsonSerializer.serialize(event)
    return Buffer.from(JSON.stringify(primitives))
  }

  private static options(event: DomainEvent) {
    return {
      messageId: event.eventId,
      contentType: 'application/json',
      contentEncoding: 'utf-8',
    }
  }
}

// routing key => topic
// businessName.Context.VersionNumber.Action
// jpg.users.1.user_created

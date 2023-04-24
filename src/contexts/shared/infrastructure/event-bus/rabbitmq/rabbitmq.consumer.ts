import { type DomainEventSubscriber } from '../../../domain/domain.event.subscriber'
import { type DomainEvent } from '../../../domain/domain.event'
import { type DomainEventDeserializer } from '../domain.event.deserializer'
import { type RabbitMQConnection } from './rabbitmq.connection'
import { type ConsumeMessage } from 'amqplib'

export class RabbitMQConsumer {
  private subscriber: DomainEventSubscriber<DomainEvent>
  private deserializer: DomainEventDeserializer
  private connection: RabbitMQConnection
  private readonly maxRetries: number
  private readonly queueName: string
  private readonly exchange: string
  constructor(params: {
    subscriber: DomainEventSubscriber<DomainEvent>
    deserializer: DomainEventDeserializer
    connection: RabbitMQConnection
    maxRetries: number
    queueName: string
    exchange: string
  }) {
    this.subscriber = params.subscriber
    this.deserializer = params.deserializer
    this.connection = params.connection
    this.maxRetries = params.maxRetries
    this.queueName = params.queueName
    this.exchange = params.exchange
  }

  async onMessage(message: ConsumeMessage) {
    const content = message.content.toString()
    const domainEvent = this.deserializer.deserialize(content)
    try {
      await this.subscriber.on(domainEvent)
      this.connection.ack(message)
    } catch (error) {
      await this.handleError(message)
    } finally {
      this.connection.ack(message)
    }
  }

  private async handleError(message: ConsumeMessage) {
    if (this.hasBeenRedeliveredTooMuch(message)) {
      await this.deadLetter(message)
      return
    }
    await this.retry(message)
  }

  private async retry(message: ConsumeMessage) {
    await this.connection.retry(message, this.queueName, this.exchange)
  }

  private async deadLetter(message: ConsumeMessage) {
    await this.connection.deadLetter(message, this.queueName, this.exchange)
  }

  private hasBeenRedeliveredTooMuch(message: ConsumeMessage) {
    if (RabbitMQConsumer.hasBeenRedelivered(message)) {
      const count = parseInt(message.properties.headers.redelivery_count)
      return count >= this.maxRetries
    }
    return false
  }

  private static hasBeenRedelivered(message: ConsumeMessage) {
    return message.properties.headers.redelivery_count !== undefined
  }
}

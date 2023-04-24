import { type DomainEventSubscriber } from '../../../domain/domain.event.subscriber'
import { type DomainEvent } from '../../../domain/domain.event'
import { type DomainEventDeserializer } from '../domain.event.deserializer'
import { type RabbitMQConnection } from './rabbitmq.connection'
import { RabbitMQConsumer } from './rabbitmq.consumer'

export class RabbitMQConsumerFactory {
  constructor(
    private deserializer: DomainEventDeserializer,
    private connection: RabbitMQConnection,
    private maxRetries: number
  ) {}

  build(subscriber: DomainEventSubscriber<DomainEvent>, exchange: string, queueName: string) {
    return new RabbitMQConsumer({
      subscriber,
      deserializer: this.deserializer,
      connection: this.connection,
      queueName,
      exchange,
      maxRetries: this.maxRetries,
    })
  }
}

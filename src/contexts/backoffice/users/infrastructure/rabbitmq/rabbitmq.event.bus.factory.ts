import { RabbitMQEventBus } from '../../../../shared/infrastructure/event-bus/rabbitmq/rabbitmq.event.bus'
import { type RabbitMQConfig } from './rabbitmq.config.factory'
import { type RabbitMQQueueFormatter } from '../../../../shared/infrastructure/event-bus/rabbitmq/rabbitmq.queue.formatter'
import { type RabbitMQConnection } from '../../../../shared/infrastructure/event-bus/rabbitmq/rabbitmq.connection'
import { type DomainEventFailoverPublisher } from '../../../../shared/infrastructure/event-bus/domain-event-failover-publisher/domain.event.failover.publisher'

export class RabbitMQEventBusFactory {
  static create(
    failoverPublisher: DomainEventFailoverPublisher,
    connection: RabbitMQConnection,
    queueNameFormatter: RabbitMQQueueFormatter,
    config: RabbitMQConfig
  ): RabbitMQEventBus {
    return new RabbitMQEventBus({
      failoverPublisher,
      connection,
      exchange: config.exchangeSettings.name,
      queueNameFormatter,
      maxRetries: config.maxRetries,
    })
  }
}

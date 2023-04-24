import container from '../dependency-injection'
import { type RabbitMQConnection } from '../../../../contexts/shared/infrastructure/event-bus/rabbitmq/rabbitmq.connection'
import { type RabbitMQConfigurer } from '../../../../contexts/shared/infrastructure/event-bus/rabbitmq/rabbitmq.configurer'
import { DomainEventSubscribers } from '../../../../contexts/shared/infrastructure/event-bus/domain.event.subscribers'
import { type RabbitMQConfig } from '../../../../contexts/user/shared/infrastructure/rabbitmq/rabbitmq.config.factory'

export class ConfigureRabbitMQCommand {
  static async run() {
    const connection = container.get<RabbitMQConnection>('User.Shared.RabbitMQConnection')

    const { name: exchange } = container.get<RabbitMQConfig>('User.Shared.RabbitMQConfig').exchangeSettings
    await connection.connect()

    const configurer = container.get<RabbitMQConfigurer>('User.Shared.RabbitMQConfigurer')
    const subscribers = DomainEventSubscribers.from(container).items

    await configurer.configure({ exchange, subscribers })
    await connection.close()
  }
}

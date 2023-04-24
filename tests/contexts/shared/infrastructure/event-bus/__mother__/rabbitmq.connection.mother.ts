import { RabbitMQConnectionConfigurationMother } from './rabbitmq.connection.configuration.mother'
import { RabbitMQConnection } from '../../../../../../src/contexts/shared/infrastructure/event-bus/rabbitmq/rabbitmq.connection'
import { RabbitMQConnectionDouble } from '../__mocks__/rabbitmq.connection.double'

export class RabbitMQConnectionMother {
  static async create() {
    const config = RabbitMQConnectionConfigurationMother.create()
    const connection = new RabbitMQConnection(config)
    await connection.connect()
    return connection
  }

  static failOnPublish() {
    return new RabbitMQConnectionDouble(RabbitMQConnectionConfigurationMother.create())
  }
}

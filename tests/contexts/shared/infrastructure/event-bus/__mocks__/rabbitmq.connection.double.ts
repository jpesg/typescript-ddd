import { RabbitMQConnection } from '../../../../../../src/contexts/shared/infrastructure/event-bus/rabbitmq/rabbitmq.connection'

export class RabbitMQConnectionDouble extends RabbitMQConnection {
  async publish(params: any): Promise<boolean> {
    throw new Error()
  }
}

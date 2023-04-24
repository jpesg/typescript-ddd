import { type ConnectionSettings } from '../../../../shared/infrastructure/event-bus/rabbitmq/connection.settings'
import { type ExchangeSettings } from '../../../../shared/infrastructure/event-bus/rabbitmq/exchange.settings'
import { userConfig as config } from '../config'

export interface RabbitMQConfig {
  exchangeSettings: ExchangeSettings
  connectionSettings: ConnectionSettings
}
export class RabbitMQConfigFactory {
  static createConfig(): RabbitMQConfig {
    return config.rabbitmq
  }
}

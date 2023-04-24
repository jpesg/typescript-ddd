import { type ConnectionSettings } from '../../../../shared/infrastructure/event-bus/rabbitmq/connection.settings'
import { type ExchangeSettings } from '../../../../shared/infrastructure/event-bus/rabbitmq/exchange.settings'
import { backofficeConfig as config } from '../../../shared/config'

export interface RabbitMQConfig {
  connectionSettings: ConnectionSettings
  exchangeSettings: ExchangeSettings
  maxRetries: number
  retryTtl: number
}

export class RabbitMQConfigFactory {
  static createConfig(): RabbitMQConfig {
    return config.rabbitmq
  }
}

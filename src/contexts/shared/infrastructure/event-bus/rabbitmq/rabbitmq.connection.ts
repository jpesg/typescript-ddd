import amqplib, { type ConsumeMessage } from 'amqplib'
import { type ConnectionSettings } from './connection.settings'
import { type ExchangeSettings } from './exchange.settings'
import { RabbitMQExchangeNameFormatter } from './rabbitmq.exchange.name.formatter'

export class RabbitMQConnection {
  protected connectionSettings: ConnectionSettings
  protected channel?: amqplib.ConfirmChannel
  protected connection?: amqplib.Connection

  constructor(params: { connectionSettings: ConnectionSettings; exchangeSettings: ExchangeSettings }) {
    this.connectionSettings = params.connectionSettings
  }

  async connect() {
    this.connection = await this.amqpConnect()
    this.channel = await this.amqpChannel()
  }

  private async amqpConnect() {
    const { port, secure, hostname } = this.connectionSettings.connection
    const { password, username, vhost } = this.connectionSettings
    const protocol = secure ? 'amqps' : 'amqp'

    const connection = await amqplib.connect({
      protocol,
      hostname,
      port,
      username,
      password,
      vhost,
    })

    connection.on('error', async (err: any) => {
      await Promise.reject(err)
    })
    return connection
  }

  private async amqpChannel() {
    const channel = await this.connection?.createConfirmChannel()
    if (channel == null) {
      throw new Error('Impossible to create a channel')
    }
    await channel.prefetch(1)
    return channel
  }

  async exchange(params: { name: string }) {
    await this.channel?.assertExchange(params.name, 'topic', { durable: true })
  }

  async publish(params: {
    exchange: string
    routingKey: string
    content: Buffer
    options: {
      messageId: string
      contentType: string
      contentEncoding: string
    }
  }) {
    const { exchange, content, options, routingKey } = params
    return await new Promise((resolve, reject) => {
      this.channel?.publish(exchange, routingKey, content, options, (err: any) => {
        if (err != null) {
          reject(err)
          return
        }
        resolve('')
      })
    })
  }

  async close() {
    await this.channel?.close()
    await this.connection?.close()
  }

  async queue(params: {
    exchange: string
    name: string
    routingKeys: string[]
    deadLetterExchange?: string
    deadLetterQueue?: string
    messageTtl?: number
  }) {
    const durable = true
    const exclusive = false
    const autoDelete = false
    const args = RabbitMQConnection.getQueueArguments(params)

    await this.channel?.assertQueue(params.name, {
      exclusive,
      durable,
      autoDelete,
      arguments: args,
    })

    for (const routingKey of params.routingKeys) {
      await this.channel?.bindQueue(params.name, params.exchange, routingKey)
    }
  }

  private static getQueueArguments(params: {
    exchange: string
    name: string
    routingKeys: string[]
    deadLetterExchange?: string
    deadLetterQueue?: string
    messageTtl?: number
  }) {
    let args: any = {}
    if (params.deadLetterExchange != null) {
      args = { ...args, 'x-dead-letter-exchange': params.deadLetterExchange }
    }
    if (params.deadLetterQueue != null) {
      args = { ...args, 'x-dead-letter-routing-key': params.deadLetterQueue }
    }
    if (params.messageTtl != null) {
      args = { ...args, 'x-message-ttl': params.messageTtl }
    }

    return args
  }

  async deleteQueue(queue: string) {
    await this.channel?.deleteQueue(queue)
  }

  async consume(queue: string, onMessage: (message: ConsumeMessage) => {}) {
    await this.channel?.consume(queue, (message: ConsumeMessage | null) => {
      if (message == null) {
        return
      }
      onMessage(message)
    })
  }

  ack(message: ConsumeMessage) {
    this.channel?.ack(message)
  }

  noAck(message: ConsumeMessage) {
    this.channel?.nack(message)
  }

  async retry(message: ConsumeMessage, queue: string, exchange: string) {
    const retryExchange = RabbitMQExchangeNameFormatter.retry(exchange)
    const options = RabbitMQConnection.getMessageOptions(message)
    await this.publish({
      exchange: retryExchange,
      routingKey: queue,
      content: message.content,
      options,
    })
  }

  async deadLetter(message: ConsumeMessage, queue: string, exchange: string) {
    const deadLetterExchange = RabbitMQExchangeNameFormatter.deadLetter(exchange)
    const options = RabbitMQConnection.getMessageOptions(message)
    await this.publish({
      exchange: deadLetterExchange,
      routingKey: queue,
      content: message.content,
      options,
    })
  }

  private static getMessageOptions(message: ConsumeMessage) {
    const { messageId, contentType, contentEncoding, priority } = message.properties
    return {
      messageId,
      headers: RabbitMQConnection.getHeaders(message),
      contentType,
      contentEncoding,
      priority,
    }
  }

  private static getHeaders(message: ConsumeMessage) {
    return RabbitMQConnection.incrementRedeliveryCount(message)
  }

  private static incrementRedeliveryCount(message: ConsumeMessage) {
    const headers = message.properties.headers
    if (RabbitMQConnection.hasBeenRedelivered(message)) {
      const count = parseInt(message.properties.headers.redelivery_count)
      headers.redelivery_count = count + 1
      return headers
    }
    headers.redelivery_count = 1
    return headers
  }

  private static hasBeenRedelivered(message: ConsumeMessage) {
    return message.properties.headers.redelivery_count !== undefined
  }
}

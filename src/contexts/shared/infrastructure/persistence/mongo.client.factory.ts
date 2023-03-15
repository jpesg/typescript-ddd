import { MongoClient } from 'mongodb'
import { type MongoConfig } from './mongo.config'

export default class MongoClientFactory {
  private static clients: Record<string, MongoClient> = {}
  static async createClient(contextName: string, config: MongoConfig): Promise<MongoClient> {
    let client = MongoClientFactory.getClient(contextName)
    if (client == null) {
      client = await MongoClientFactory.createAndConnectClient(config)
      MongoClientFactory.registerClient(client, contextName)
    }

    return client
  }

  private static getClient(contextName: string): MongoClient | null {
    return MongoClientFactory.clients[contextName]
  }

  private static async createAndConnectClient(config: MongoConfig): Promise<MongoClient> {
    const url = MongoClientFactory.createMongoUrl(config)
    const client = new MongoClient(url, { ignoreUndefined: true })

    await client.connect()

    return client
  }

  private static registerClient(client: MongoClient, contextName: string): void {
    MongoClientFactory.clients[contextName] = client
  }

  private static createMongoUrl(config: MongoConfig): string {
    const { user, password, server, database, authDb, port } = config
    return `mongodb://${user}:${password}@${server}:${port}/${database}?authSource=${authDb}`
  }
}

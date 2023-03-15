import { EnvironmentArranger } from '../arranger/environment.arranger'
import { type MongoClient } from 'mongodb'

export default class MongoEnvironmentArranger extends EnvironmentArranger {
  constructor(private _client: Promise<MongoClient>) {
    super()
  }

  async arranger(): Promise<void> {
    await this.cleanDatabase()
  }

  async close(): Promise<void> {
    await (await this.client()).close()
  }

  protected async cleanDatabase() {
    const collections = await this.collections()
    const client = await this.client()
    for (const collection of collections) {
      await client.db().collection(collection).deleteMany({})
    }
  }

  protected async collections() {
    const client = await this.client()
    const collections = await client.db().listCollections(undefined, { nameOnly: true }).toArray()
    return collections.map((collection) => collection.name)
  }

  protected async client() {
    return await this._client
  }
}

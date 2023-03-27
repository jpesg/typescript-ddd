import { type Collection, type MongoClient } from 'mongodb'
import { type AggregateRoot } from '../../../doman/aggregate.root'

export abstract class MongoRepository<T extends AggregateRoot> {
  constructor(private _client: Promise<MongoClient>) {}

  protected abstract collectionName(): string

  protected async client(): Promise<MongoClient> {
    return await this._client
  }

  protected async collection(): Promise<Collection> {
    return (await this._client).db().collection(this.collectionName())
  }

  protected async persist(id: string, aggregateRoot: T): Promise<void> {
    const collection = await this.collection()

    const document = { ...aggregateRoot.toPrimitives(), _id: id, id: undefined }

    // @ts-expect-error
    await collection.updateOne({ _id: id }, { $set: document }, { upsert: true })
  }
}

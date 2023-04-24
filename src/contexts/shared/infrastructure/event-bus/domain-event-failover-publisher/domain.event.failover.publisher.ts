import { type Collection, type MongoClient } from 'mongodb'
import { type DomainEventDeserializer } from '../domain.event.deserializer'
import { type DomainEvent } from '../../../domain/domain.event'
import { DomainEventJsonSerializer } from '../domain.event.json.serializer'

export class DomainEventFailoverPublisher {
  static collectionName = 'DomainEvents'

  constructor(private _client: Promise<MongoClient>, private deserialize: DomainEventDeserializer) {}

  protected async collection(): Promise<Collection> {
    return (await this._client).db().collection(DomainEventFailoverPublisher.collectionName)
  }

  async publish(event: DomainEvent): Promise<void> {
    const collection = await this.collection()
    const eventSerialized = DomainEventJsonSerializer.serialize(event)
    const options = { upsert: true }
    const update = {
      $set: { eventId: event.eventId, event: eventSerialized },
    }
    await collection.updateOne({ eventId: event.eventId }, update, options)
  }

  async consume(): Promise<DomainEvent[]> {
    const collection = await this.collection()
    const documents = await collection.find().limit(200).toArray()
    const events = documents.map((doc) => this.deserialize.deserialize(doc.event))
    return events.filter(Boolean)
  }
}

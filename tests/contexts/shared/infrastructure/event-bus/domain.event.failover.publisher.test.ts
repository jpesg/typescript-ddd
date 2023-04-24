import { DomainEventFailoverPublisher } from '../../../../../src/contexts/shared/infrastructure/event-bus/domain-event-failover-publisher/domain.event.failover.publisher'
import MongoEnvironmentArranger from '../mongo/mongo.environment.arranger'
import { RabbitMQMongoClientMother } from './__mother__/rabbitmq.mongo.client.mother'
import { DomainEventDeserializerMother } from './__mother__/domain.event.deserializer.mother'
import { DomainEventDummyMother } from './__mocks__/domain.event.dummy'

describe('DomainEventFailoverPublisher test', () => {
  let arranger: MongoEnvironmentArranger
  const mongoClient = RabbitMQMongoClientMother.create()
  const deserializer = DomainEventDeserializerMother.create()

  beforeAll(async () => {
    arranger = new MongoEnvironmentArranger(mongoClient)
  })

  beforeEach(async () => {
    await arranger.arranger()
  })

  it('should save the published events', async () => {
    const eventBus = new DomainEventFailoverPublisher(mongoClient, deserializer)
    const event = DomainEventDummyMother.random()

    await eventBus.publish(event)

    expect(await eventBus.consume()).toEqual([event])
  })
})

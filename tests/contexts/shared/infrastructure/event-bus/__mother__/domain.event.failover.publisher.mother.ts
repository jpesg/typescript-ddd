import { RabbitMQMongoClientMother } from './rabbitmq.mongo.client.mother'
import { DomainEventDeserializerMother } from './domain.event.deserializer.mother'
import { DomainEventFailoverPublisher } from '../../../../../../src/contexts/shared/infrastructure/event-bus/domain-event-failover-publisher/domain.event.failover.publisher'
import { DomainEventFailoverPublisherDouble } from '../__mocks__/domain.event.failover.publisher.double'

export class DomainEventFailoverPublisherMother {
  static create() {
    const mongoClient = RabbitMQMongoClientMother.create()
    return new DomainEventFailoverPublisher(mongoClient, DomainEventDeserializerMother.create())
  }

  static failOverDouble() {
    return new DomainEventFailoverPublisherDouble()
  }
}

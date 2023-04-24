import { DomainEventFailoverPublisher } from '../../../../../../src/contexts/shared/infrastructure/event-bus/domain-event-failover-publisher/domain.event.failover.publisher'
import { type DomainEvent } from '../../../../../../src/contexts/shared/domain/domain.event'
import { RabbitMQMongoClientMother } from '../__mother__/rabbitmq.mongo.client.mother'
import { DomainEventDeserializerMother } from '../__mother__/domain.event.deserializer.mother'

export class DomainEventFailoverPublisherDouble extends DomainEventFailoverPublisher {
  private publishMock: jest.Mock
  constructor() {
    super(RabbitMQMongoClientMother.create(), DomainEventDeserializerMother.create())
    this.publishMock = jest.fn()
  }

  async publish(event: DomainEvent): Promise<void> {
    this.publishMock(event)
  }

  assertEventHasBeenPublished(event: DomainEvent) {
    expect(this.publishMock).toHaveBeenCalledWith(event)
  }
}

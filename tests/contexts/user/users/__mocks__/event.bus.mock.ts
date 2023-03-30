import { type EventBus } from '../../../../../src/contexts/shared/domain/event.bus'
import { type DomainEvent } from '../../../../../src/contexts/shared/domain/domain.event'
import { type DomainEventSubscribers } from '../../../../../src/contexts/shared/infrastructure/event-bus/domain.event.subscribers'

export default class EventBusMock implements EventBus {
  private publishSpy = jest.fn()

  async publish(events: DomainEvent[]) {
    this.publishSpy(events)
  }

  addSubscribers(subscribers: DomainEventSubscribers): void {}

  assertLastPublishedEventIs(expectedEvent: DomainEvent) {
    const publishSpyCalls = this.publishSpy.mock.calls

    expect(publishSpyCalls.length).toBeGreaterThan(0)

    const lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1]
    const lastPublishedEvent = lastPublishSpyCall[0][0]

    const expected = this.getDataFromDomainEvent(expectedEvent)
    const published = this.getDataFromDomainEvent(lastPublishedEvent)

    expect(expected).toMatchObject(published)
  }

  private getDataFromDomainEvent(event: DomainEvent) {
    const { eventId, occurredOn, ...attributes } = event

    return attributes
  }
}

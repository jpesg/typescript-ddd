import { type DomainEventSubscriber } from '../../../../../../src/contexts/shared/domain/domain.event.subscriber'
import { DomainEventDummy } from './domain.event.dummy'
import { type DomainEvent, type DomainEventClass } from '../../../../../../src/contexts/shared/domain/domain.event'

export class DomainEventSubscriberDummy implements DomainEventSubscriber<DomainEventDummy> {
  private events: DomainEvent[]
  private failsFirstTime = false
  private alwaysFails = false
  private alreadyFailed = false

  constructor(params?: { failsFirstTime?: boolean; alwaysFails?: boolean }) {
    if (params?.failsFirstTime === true) {
      this.failsFirstTime = true
    }
    if (params?.alwaysFails === true) {
      this.alwaysFails = true
    }

    this.events = []
  }

  subscribedTo(): DomainEventClass[] {
    return [DomainEventDummy]
  }

  async on(domainEvent: DomainEventDummy): Promise<void> {
    if (this.alwaysFails) {
      throw new Error()
    }
    if (!this.alreadyFailed && this.failsFirstTime) {
      this.alreadyFailed = true
      throw new Error()
    }
    this.events.push(domainEvent)
  }

  async assertConsumedEvents(events: DomainEvent[]) {
    await new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        try {
          expect(this.events.length).toEqual(events.length)
          expect(this.events).toEqual(events)
          resolve()
        } catch (error: any) {
          reject(error)
        }
      }, 100)
    })
  }

  static failsFirstTime() {
    return new DomainEventSubscriberDummy({ failsFirstTime: true })
  }

  static alwaysFails() {
    return new DomainEventSubscriberDummy({ alwaysFails: true })
  }
}

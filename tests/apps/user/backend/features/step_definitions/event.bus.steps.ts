import { Given } from '@cucumber/cucumber'
import container from '../../../../../../src/apps/user/backend/dependency-injection'
import { DomainEventSubscribers } from '../../../../../../src/contexts/shared/infrastructure/event-bus/domain.event.subscribers'
import { DomainEventDeserializer } from '../../../../../../src/contexts/shared/infrastructure/event-bus/domain.event.deserializer'

const eventBus = container.get('Mooc.Shared.domain.EventBus')
const deserializer = buildDeserializer()

Given('I send an event to the event bus:', async (event: any) => {
  const domainEvent = deserializer.deserialize(event)

  await eventBus.publish([domainEvent])
  await wait(100)
})

function buildDeserializer() {
  const subscribers = DomainEventSubscribers.from(container)

  return DomainEventDeserializer.configure(subscribers)
}

async function wait(milliseconds: number) {
  return await new Promise((resolve) => setTimeout(resolve, milliseconds))
}

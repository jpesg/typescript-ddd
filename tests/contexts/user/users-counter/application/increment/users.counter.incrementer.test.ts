import { UsersCounterIncrementedDomainEventMother } from '../../domain/users.counter.incremented.domain.event.mother'
import { UsersCounterMother } from '../../domain/users.counter.mother'
import { UsersCounterRepositoryMock } from '../../__mocks__/users.counter.repository.mock'
import EventBusMock from '../../../users/__mocks__/event.bus.mock'
import { UsersCounterIncrementer } from '../../../../../../src/contexts/user/users-counter/application/increment/users.counter.incrementer'
import { UserIdMother } from '../../../shared/domain/users/user.id.mother'
import { UsersCounter } from '../../../../../../src/contexts/user/users-counter/domain/users.counter'

describe('UsersCounter Incrementer', () => {
  let incrementer: UsersCounterIncrementer
  let eventBus: EventBusMock
  let repository: UsersCounterRepositoryMock

  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new UsersCounterRepositoryMock()
    incrementer = new UsersCounterIncrementer(repository, eventBus)
  })

  it('should initialize a new counter', async () => {
    const userId = UserIdMother.random()
    const counter = UsersCounterMother.withOne(userId)

    await incrementer.run(userId)

    repository.assertLastUsersCounterSaved(counter)
  })

  it('should increment an existing counter', async () => {
    const existingCounter = UsersCounterMother.random()
    repository.returnOnSearch(existingCounter)
    const userId = UserIdMother.random()
    const expected = UsersCounter.fromPrimitives(existingCounter.toPrimitives())
    expected.increment(userId)
    const expectedEvent = UsersCounterIncrementedDomainEventMother.fromUserCounter(expected)

    await incrementer.run(userId)

    repository.assertLastUsersCounterSaved(expected)
    eventBus.assertLastPublishedEventIs(expectedEvent)
  })
})

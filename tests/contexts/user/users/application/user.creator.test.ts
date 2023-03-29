import UserCreator from '../../../../../src/contexts/user/users/application/user.creator'
import { UserRepositoryMock } from '../__mocks__/user.repository.mock'
import { InvalidEmail } from '../../../../../src/contexts/user/users/domain/errors/invalid.email'
import { CreateUserRequestMother } from './create.user.request.mother'
import { UserMother } from '../domain/uer.mother'
import EventBusMock from '../__mocks__/event.bus.mock'
import { UserCreatedDomainEventMother } from '../domain/user.created.domain.event.mother'

let repository: UserRepositoryMock
let creator: UserCreator
let eventBus: EventBusMock

beforeEach(() => {
  repository = new UserRepositoryMock()
  eventBus = new EventBusMock()
  creator = new UserCreator(repository, eventBus)
})

describe('UserCreator', () => {
  it('should create a valid user', async () => {
    const request = CreateUserRequestMother.random()
    const expectedUser = UserMother.fromRequest(request)
    const domainEvent = UserCreatedDomainEventMother.fromUser(expectedUser)

    await creator.run(request)

    repository.assertSaveHaveBeenCalledWith(expectedUser)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })
  it('should throw error if wrong email', async () => {
    expect(() => {
      const request = CreateUserRequestMother.invalid()
      const expectedUser = UserMother.fromRequest(request)
      void creator.run(request)

      repository.assertSaveHaveBeenCalledWith(expectedUser)
    }).toThrow(InvalidEmail)
  })
})

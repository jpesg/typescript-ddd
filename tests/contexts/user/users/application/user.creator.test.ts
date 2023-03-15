import UserCreator from '../../../../../src/contexts/user/users/application/user.creator'
import { UserRepositoryMock } from '../__mocks__/user.repository.mock'
import { InvalidEmail } from '../../../../../src/contexts/user/users/domain/errors/invalid.email'
import { CreateUserRequestMother } from './create.user.request.mother'
import { UserMother } from '../domain/uer.mother'

let repository: UserRepositoryMock
let creator: UserCreator

describe('UserCreator', () => {
  beforeEach(() => {
    repository = new UserRepositoryMock()
    creator = new UserCreator(repository)
  })

  it('should create a valid user', async () => {
    const request = CreateUserRequestMother.random()
    const expectedUser = UserMother.fromRequest(request)
    await creator.run(request)

    repository.assertSaveHaveBeenCalledWith(expectedUser)
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

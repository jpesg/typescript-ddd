import { User } from '../../../../../src/contexts/user/users/domain/user'
import { UserCreator } from '../../../../../src/contexts/user/users/application/user.creator'
import { UserRepositoryMock } from '../__mocks__/user.repository.mock'
import { Uuid } from '../../../../../src/contexts/shared/doman/value-objects/uuid'
import { UserEmail } from '../../../../../src/contexts/user/users/domain/user.email'
import { UserId } from '../../../../../src/contexts/user/shared/domain/users/user.id'
import { UserPassword } from '../../../../../src/contexts/user/users/domain/user.password'
import { InvalidEmail } from '../../../../../src/contexts/user/users/domain/errors/invalid.email'

describe('UserCreator', () => {
  let repository: UserRepositoryMock
  beforeEach(() => {
    repository = new UserRepositoryMock()
  })

  it('should create a valid user', async () => {
    const creator = new UserCreator(repository)

    const id = Uuid.random().value
    const email = 'test@test.com'
    const password = 'password'

    const expectedUser = new User({
      id: new UserId(id),
      email: new UserEmail(email),
      password: new UserPassword(password),
    })
    await creator.run({ id, email, password })

    repository.assertSaveHaveBeenCalledWith(expectedUser)
  })
  it.only('should throw error if wrong email', async () => {
    const creator = new UserCreator(repository)

    const id = Uuid.random().value
    const email = 'test'
    const password = 'password'

    expect(() => {
      const expectedUser = new User({
        id: new UserId(id),
        email: new UserEmail(email),
        password: new UserPassword(password),
      })
      void creator.run({ id, email, password })

      repository.assertSaveHaveBeenCalledWith(expectedUser)
    }).toThrow(InvalidEmail)
  })
})

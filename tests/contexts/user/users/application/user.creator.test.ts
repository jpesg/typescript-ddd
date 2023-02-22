import { User } from '../../../../../src/contexts/user/users/domain/user'
import { UserCreator } from '../../../../../src/contexts/user/users/application/user.creator'
import { UserRepositoryMock } from '../__mocks__/user.repository.mock'
import { Uuid } from '../../../../../src/contexts/shared/doman/value-objects/uuid'

describe('UserCreator', () => {
  let repository: UserRepositoryMock
  beforeEach(() => {
    repository = new UserRepositoryMock()
  })

  it('should create a valid user', async () => {
    const creator = new UserCreator(repository)
    const id = Uuid.random()
    const email = 'name'
    const password = 'pwd'
    const expectedUser = new User({ id, email, password })
    await creator.run({ id: id.value, email, password })

    repository.assertSaveHaveBeenCalledWith(expectedUser)
  })
})

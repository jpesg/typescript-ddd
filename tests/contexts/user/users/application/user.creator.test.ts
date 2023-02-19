import { type UserRepository } from '../../../../../src/contexts/user/users/domain/user.repository'
import { User } from '../../../../../src/contexts/user/users/domain/user'
import { UserCreator } from '../../../../../src/contexts/user/users/application/user.creator'

describe('UserCreator', () => {
  it('should create a valid user', async () => {
    const repository: UserRepository = {
      save: jest.fn(),
    }
    const creator = new UserCreator(repository)
    const uuid = 'uuid'
    const name = 'name'
    const password = 'pwd'
    const expectedUser = new User(uuid, name, password)

    await creator.run(uuid, name, password)

    expect(repository.save).toHaveBeenCalledWith(expectedUser)
  })
})

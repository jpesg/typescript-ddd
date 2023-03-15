import FileUserRepository from '../../../../../../src/contexts/user/users/infrastructure/persistence/file.user.repository'
import { User } from '../../../../../../src/contexts/user/users/domain/user'
import { Uuid } from '../../../../../../src/contexts/shared/doman/value-objects/uuid'
import { UserId } from '../../../../../../src/contexts/user/shared/domain/users/user.id'
import { UserEmail } from '../../../../../../src/contexts/user/users/domain/user.email'
import { UserPassword } from '../../../../../../src/contexts/user/users/domain/user.password'

describe('Save User', () => {
  it('should have an user', async () => {
    const repository = new FileUserRepository()
    const course = new User({
      id: new UserId(Uuid.random().value),
      email: new UserEmail('name@test.com'),
      password: new UserPassword('1234'),
    })

    await repository.save(course)
  })
})

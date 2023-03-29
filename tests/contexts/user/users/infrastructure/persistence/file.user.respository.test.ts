import FileUserRepository from '../../../../../../src/contexts/user/users/infrastructure/persistence/file.user.repository'
import { User } from '../../../../../../src/contexts/user/users/domain/user'

import { UserId } from '../../../../../../src/contexts/user/shared/domain/users/user.id'
import { UserEmail } from '../../../../../../src/contexts/user/users/domain/user.email'
import { UserPassword } from '../../../../../../src/contexts/user/users/domain/user.password'
import { Uuid } from '../../../../../../src/contexts/shared/domain/value-objects/uuid'

describe('Save User', () => {
  it('should have an user', async () => {
    const repository = new FileUserRepository()
    const user = new User(new UserId(Uuid.random().value), new UserEmail('name@test.com'), new UserPassword('1234'))

    await repository.save(user)
  })
})

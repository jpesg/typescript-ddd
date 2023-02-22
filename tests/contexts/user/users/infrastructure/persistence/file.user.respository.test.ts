import { FileUserRepository } from '../../../../../../src/contexts/user/users/infrastructure/persistence/file.user.repository'
import { User } from '../../../../../../src/contexts/user/users/domain/user'
import { Uuid } from '../../../../../../src/contexts/shared/doman/value-objects/uuid'

describe('Save User', () => {
  it('should have an user', async () => {
    const repository = new FileUserRepository()
    const course = new User({ id: Uuid.random(), email: 'name@test.com', password: '1234' })

    await repository.save(course)
  })
})

import { FileUserRespository } from '../../../../../../src/contexts/user/users/infrastructure/persistence/file.user.respository.test'
import { User } from '../../../../../../src/contexts/user/users/domain/user'

describe('Save User', () => {
  it('should have an user', async () => {
    const repository = new FileUserRespository()
    const course = new User({ uuid: 'id', email: 'name@test.com', password: '1234' })

    await repository.save(course)
  })
})

import container from '../../../../../../src/apps/user/backend/dependency-injection'
import { type UserRepository } from '../../../../../../src/contexts/user/users/domain/user.repository'
import { type EnvironmentArranger } from '../../../../shared/infrastructure/arranger/environment.arranger'
import { UserMother } from '../../domain/user.mother'

const repository: UserRepository = container.get('User.users.domain.UserRepository')
const environmentArranger: Promise<EnvironmentArranger> = container.get('User.EnvironmentArranger')

beforeEach(async () => {
  await (await environmentArranger).arranger()
})

afterAll(async () => {
  await (await environmentArranger).arranger()
  await (await environmentArranger).close()
})

describe('User Repository User', () => {
  describe('#save', () => {
    it('should save a course', async () => {
      const user = UserMother.random()
      await repository.save(user)
    })
  })
})

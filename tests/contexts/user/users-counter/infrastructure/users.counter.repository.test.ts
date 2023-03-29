import { UsersCounterMother } from '../domain/users.counter.mother'
import { type EnvironmentArranger } from '../../../shared/infrastructure/arranger/environment.arranger'
import container from '../../../../../src/apps/user/backend/dependency-injection'
import { type UsersCounterRepository } from '../../../../../src/contexts/user/users-counter/domain/users.counter.repository'

const environmentArranger: Promise<EnvironmentArranger> = container.get('User.EnvironmentArranger')
const repository: UsersCounterRepository = container.get('Mooc.UsersCounter.UsersCounterRepository')

beforeEach(async () => {
  await (await environmentArranger).arranger()
})

afterAll(async () => {
  await (await environmentArranger).arranger()
  await (await environmentArranger).close()
})

describe('usersCounterRepository', () => {
  describe('#save', () => {
    it('should save a users counter', async () => {
      const user = UsersCounterMother.random()

      await repository.save(user)
    })
  })

  describe('#search', () => {
    it('should return an existing user', async () => {
      const expectedCounter = UsersCounterMother.random()
      await repository.save(expectedCounter)

      const counter = await repository.search()

      expect(expectedCounter).toEqual(counter)
    })

    it('should not return null if there is no users counter', async () => {
      expect(await repository.search()).toBeFalsy()
    })
  })
})

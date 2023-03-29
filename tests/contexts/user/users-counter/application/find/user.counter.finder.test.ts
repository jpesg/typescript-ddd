import { UsersCounterMother } from '../../domain/users.counter.mother'
import { UsersCounterRepositoryMock } from '../../__mocks__/users.counter.repository.mock'
import { UsersCounterFinder } from '../../../../../../src/contexts/user/users-counter/application/find/users.counter.finder'
import { UsersCounterNotExist } from '../../../../../../src/contexts/user/users-counter/domain/users.counter.not.exist'

describe('UserCounterFinder', () => {
  let repository: UsersCounterRepositoryMock

  beforeEach(() => {
    repository = new UsersCounterRepositoryMock()
  })

  it('should find an existing users counter', async () => {
    const counter = UsersCounterMother.random()
    repository.returnOnSearch(counter)
    const finder = new UsersCounterFinder(repository)

    const response = await finder.run()

    repository.assertSearch()
    expect(counter.total.value).toEqual(response)
  })

  it('should throw an exception when users counter does not exists', async () => {
    const finder = new UsersCounterFinder(repository)

    await expect(finder.run()).rejects.toBeInstanceOf(UsersCounterNotExist)
  })
})

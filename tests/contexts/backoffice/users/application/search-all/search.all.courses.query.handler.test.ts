import { BackofficeUserRepositoryMock } from '../../__mocks__/backoffice.user.repository.mock'
import { BackofficeUserMother } from '../../domain/backoffice.user.mother'
import { SearchAllUsersQueryHandler } from '../../../../../../src/contexts/backoffice/users/application/search-all/search.all.users.query.handler'
import { UsersFinder } from '../../../../../../src/contexts/backoffice/users/application/search-all/users.finder'
import { SearchAllUsersQuery } from '../../../../../../src/contexts/backoffice/users/application/search-all/search.all.users.query'
import { SearchAllUsersUsersResponseMother } from '../../domain/search.all.users.response.mother'

describe('SearchAllUsers QueryHandler', () => {
  let repository: BackofficeUserRepositoryMock

  beforeEach(() => {
    repository = new BackofficeUserRepositoryMock()
  })

  it('should find an existing courses counter', async () => {
    const courses = [BackofficeUserMother.random(), BackofficeUserMother.random(), BackofficeUserMother.random()]
    repository.returnOnSearchAll(courses)

    const handler = new SearchAllUsersQueryHandler(new UsersFinder(repository))

    const query = new SearchAllUsersQuery()
    const response = await handler.handle(query)

    repository.assertSearchAll()

    const expected = SearchAllUsersUsersResponseMother.create(courses)
    expect(expected).toEqual(response)
  })
})

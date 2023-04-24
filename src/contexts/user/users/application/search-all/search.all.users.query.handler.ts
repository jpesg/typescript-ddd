import { type UsersResponse } from './users.response'
import { type UsersFinder } from './users.finder'
import { SearchAllUsersQuery } from './search.all.users.query'
import { type QueryHandler } from '../../../../shared/domain/query.handler'
import { type Query } from '../../../../shared/domain/query'

export class SearchAllUsersQueryHandler implements QueryHandler<SearchAllUsersQuery, UsersResponse> {
  constructor(private usersFinder: UsersFinder) {}

  subscribedTo(): Query {
    return SearchAllUsersQuery
  }

  async handle(_query: SearchAllUsersQuery): Promise<UsersResponse> {
    return await this.usersFinder.run()
  }
}

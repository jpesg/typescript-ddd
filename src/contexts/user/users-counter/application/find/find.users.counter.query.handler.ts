import { type QueryHandler } from '../../../../shared/domain/query.handler'
import { FindUsersCounterQuery } from './find.users.counter.query'
import { FindUsersCounterResponse } from './find.users.counter.response'
import { type Query } from '../../../../shared/domain/query'
import { type UsersCounterFinder } from './users.counter.finder'

export class FindUsersCounterQueryHandler implements QueryHandler<FindUsersCounterQuery, FindUsersCounterResponse> {
  constructor(private finder: UsersCounterFinder) {}

  async handle(_query: FindUsersCounterQuery): Promise<FindUsersCounterResponse> {
    const counter = await this.finder.run()
    return new FindUsersCounterResponse(counter)
  }

  subscribedTo(): Query {
    return FindUsersCounterQuery
  }
}

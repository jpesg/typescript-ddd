import { Filters } from '../../../../shared/domain/criteria/filters'
import { Order } from '../../../../shared/domain/criteria/order'

import { type UsersByCriteriaSearcher } from './users.by.criteria.searcher'
import { SearchUsersByCriteriaQuery } from './search.users.by.criteria.query'
import { type QueryHandler } from '../../../../shared/domain/query.handler'
import { type BackofficeUsersResponse } from '../search-all/backoffice.users.response'
import { type Query } from '../../../../shared/domain/query'

export class SearchUsersByCriteriaQueryHandler
  implements QueryHandler<SearchUsersByCriteriaQuery, BackofficeUsersResponse>
{
  constructor(private searcher: UsersByCriteriaSearcher) {}

  subscribedTo(): Query {
    return SearchUsersByCriteriaQuery
  }

  async handle(query: SearchUsersByCriteriaQuery): Promise<BackofficeUsersResponse> {
    const filters = Filters.fromValues(query.filters)
    const order = Order.fromValues(query.orderBy, query.orderType)

    return await this.searcher.run(filters, order, query.offset, query.limit)
  }
}

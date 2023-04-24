import { type BackofficeUserRepository } from '../../domain/backoffice.user.repository'
import { BackofficeUsersResponse } from '../search-all/backoffice.users.response'
import { type Filters } from '../../../../shared/domain/criteria/filters'
import { type Order } from '../../../../shared/domain/criteria/order'
import { Criteria } from '../../../../shared/domain/criteria/criteria'

export class UsersByCriteriaSearcher {
  constructor(private repository: BackofficeUserRepository) {}

  async run(filters: Filters, order: Order, limit?: number, offset?: number): Promise<BackofficeUsersResponse> {
    const criteria = new Criteria(filters, order, limit, offset)

    const courses = await this.repository.matching(criteria)

    return new BackofficeUsersResponse(courses)
  }
}

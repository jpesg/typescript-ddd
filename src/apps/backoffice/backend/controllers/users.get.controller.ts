import { type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { type Controller } from '../../../shared/domain/controllers/controller'
import { type QueryBus } from '../../../../contexts/shared/domain/query.bus'
import { type UsersResponse } from '../../../../contexts/user/users/application/search-all/users.response'
import { SearchAllUsersQuery } from '../../../../contexts/user/users/application/search-all/search.all.users.query'
import { SearchUsersByCriteriaQuery } from '../../../../contexts/backoffice/users/application/search-by-criteria/search.users.by.criteria.query'
import { type BackofficeUsersResponse } from '../../../../contexts/backoffice/users/application/search-all/backoffice.users.response'
/*
interface CreateUserRequest {
  id: string
  email: string
  password: string
}
*/
interface FilterType {
  value: string
  operator: string
  field: string
}
export class UsersGetController implements Controller {
  constructor(private readonly queryBus: QueryBus) {}

  async run(req: Request, res: Response) {
    const response = await this.searchAllCourses()
    res.status(httpStatus.OK).send(response.users)
  }

  private async searchAllCourses() {
    return await this.queryBus.ask<UsersResponse>(new SearchAllUsersQuery())
  }

  async runWithFilter(req: Request, res: Response) {
    const { query: queryParams } = req
    const { filters, orderBy, order, limit, offset } = queryParams
    const query = new SearchUsersByCriteriaQuery(
      this.parseFilters(filters as unknown as FilterType[]),
      orderBy as string,
      order as string,
      limit != null ? Number(limit) : undefined,
      offset != null ? Number(offset) : undefined
    )
    const response = await this.queryBus.ask<BackofficeUsersResponse>(query)

    res.status(httpStatus.OK).send(response.users)
  }

  private parseFilters(params: FilterType[]): Array<Map<string, string>> {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!params) {
      return new Array<Map<string, string>>()
    }

    return params.map((filter) => {
      const field = filter.field
      const value = filter.value
      const operator = filter.operator

      return new Map([
        ['field', field],
        ['operator', operator],
        ['value', value],
      ])
    })
  }
}

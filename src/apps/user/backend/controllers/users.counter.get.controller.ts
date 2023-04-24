import { type Request, type Response } from 'express'

import httpStatus from 'http-status'
import { type Controller } from '../../../shared/domain/controllers/controller'
// import { type UsersCounterFinder } from '../../../../contexts/user/users-counter/application/find/users.counter.finder'
import { UsersCounterNotExist } from '../../../../contexts/user/users-counter/domain/users.counter.not.exist'
import { type QueryBus } from '../../../../contexts/shared/domain/query.bus'
import { FindUsersCounterQuery } from '../../../../contexts/user/users-counter/application/find/find.users.counter.query'
import { type FindUsersCounterResponse } from '../../../../contexts/user/users-counter/application/find/find.users.counter.response'

export class UsersCounterGetController implements Controller {
  /* constructor(private usersCounterFinder: UsersCounterFinder) {}
  async run(req: Request, res: Response): Promise<void> {
    try {
      const count = await this.usersCounterFinder.run()

      res.json({ total: count })
    } catch (e) {
      console.log(e)
      if (e instanceof UsersCounterNotExist) {
        res.sendStatus(httpStatus.NOT_FOUND)
      } else {
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  } */
  constructor(private queryBus: QueryBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const query = new FindUsersCounterQuery()
      const count = await this.queryBus.ask<FindUsersCounterResponse>(query)

      res.json({ total: count.total })
    } catch (e) {
      console.log(e)
      if (e instanceof UsersCounterNotExist) {
        res.sendStatus(httpStatus.NOT_FOUND)
      } else {
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }
}

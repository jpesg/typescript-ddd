import { type Query } from '../../domain/query'
import { type Response } from '../../domain/response'
import { type QueryBus } from '../../domain/query.bus'
import { type QueryHandlers } from './query.handlers'

export class InMemoryQueryBus implements QueryBus {
  constructor(private queryHandlers: QueryHandlers) {}

  async ask<R extends Response>(query: Query): Promise<R> {
    const handler = this.queryHandlers.get(query)
    return await ((await handler.handle(query)) as Promise<R>)
  }
}

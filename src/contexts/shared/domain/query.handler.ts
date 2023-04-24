import { type Query } from './query'
import { type Response } from './response'

export interface QueryHandler<Q extends Query, R extends Response> {
  subscribedTo: () => Query
  handle: (query: Q) => Promise<R>
}

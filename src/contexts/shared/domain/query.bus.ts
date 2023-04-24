import { type Query } from './query'
import { type Response } from './response'

export interface QueryBus {
  ask: <R extends Response>(query: Query) => Promise<R>
}

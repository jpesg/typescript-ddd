import { type UsersCounter } from './users.counter'
import { type Nullable } from '../../../shared/domain/nullable'

export interface UsersCounterRepository {
  search: () => Promise<Nullable<UsersCounter>>
  save: (counter: UsersCounter) => Promise<void>
}

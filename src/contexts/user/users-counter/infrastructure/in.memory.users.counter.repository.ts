import { type UsersCounterRepository } from '../domain/users.counter.repository'
import { UsersCounter } from '../domain/users.counter'
import { UsersCounterId } from '../domain/users.counter.id'
import { UsersCounterTotal } from '../domain/users.counter.total'

export class InMemoryUsersCounterRepository implements UsersCounterRepository {
  private counter: UsersCounter
  constructor() {
    this.counter = new UsersCounter(UsersCounterId.random(), new UsersCounterTotal(0), [])
  }

  async search(): Promise<UsersCounter> {
    return this.counter
  }

  async save(counter: UsersCounter): Promise<void> {
    this.counter = counter
  }
}

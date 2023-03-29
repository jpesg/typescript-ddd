import { UsersCounterNotExist } from '../../domain/users.counter.not.exist'
import { type UsersCounterRepository } from '../../domain/users.counter.repository'

export class UsersCounterFinder {
  constructor(private repository: UsersCounterRepository) {}

  async run() {
    const counter = await this.repository.search()
    if (counter == null) {
      throw new UsersCounterNotExist()
    }

    return counter.total.value
  }
}

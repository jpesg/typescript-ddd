import { type UsersCounterRepository } from '../../domain/users.counter.repository'
import { UsersCounter } from '../../domain/users.counter'
import { UsersCounterId } from '../../domain/users.counter.id'
import { type UserId } from '../../../shared/domain/users/user.id'
import { type EventBus } from '../../../../shared/domain/event.bus'

export class UsersCounterIncrementer {
  constructor(private repository: UsersCounterRepository, private bus: EventBus) {}

  async run(userId: UserId) {
    const counter = (await this.repository.search()) ?? this.initializeCounter()

    counter.increment(userId)

    await this.repository.save(counter)
    await this.bus.publish(counter.pullDomainEvents())
  }

  private initializeCounter(): UsersCounter {
    return UsersCounter.initialize(UsersCounterId.random())
  }
}

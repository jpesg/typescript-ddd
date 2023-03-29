import { UsersCounterTotal } from './users.counter.total'
import { UsersCounterId } from './users.counter.id'
import { UsersCounterIncrementeDomainEvent } from './users.counter.incremente.domain.event'
import { AggregateRoot } from '../../../shared/domain/aggregate.root'
import { UserId } from '../../shared/domain/users/user.id'
import { type Uuid } from '../../../shared/domain/value-objects/uuid'

export class UsersCounter extends AggregateRoot {
  readonly id: UsersCounterId
  private _total: UsersCounterTotal
  readonly existingUsers: UserId[]

  constructor(id: UsersCounterId, total: UsersCounterTotal, existingUsers?: UserId[]) {
    super()
    this.id = id
    this._total = total
    this.existingUsers = existingUsers ?? []
  }

  public get total(): UsersCounterTotal {
    return this._total
  }

  static initialize(id: Uuid): UsersCounter {
    return new UsersCounter(id, UsersCounterTotal.initialize())
  }

  increment(userId: UserId) {
    this._total = this.total.increment()
    this.existingUsers.push(userId)
    this.record(new UsersCounterIncrementeDomainEvent({ aggregateId: this.id.value, total: this.total.value }))
  }

  hasIncremented(userId: UserId): boolean {
    const exists = this.existingUsers.find((entry) => entry.value === userId.value)
    return exists !== undefined
  }

  toPrimitives() {
    return {
      id: this.id.value,
      total: this.total.value,
      existingUsers: this.existingUsers.map((id) => id.value),
    }
  }

  static fromPrimitives(data: { id: string; total: number; existingUsers: string[] }): UsersCounter {
    return new UsersCounter(
      new UsersCounterId(data.id),
      new UsersCounterTotal(data.total),
      data.existingUsers.map((entry) => new UserId(entry))
    )
  }
}

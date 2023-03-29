import { type Nullable } from '../../../../../src/contexts/shared/domain/nullable'
import { type UsersCounterRepository } from '../../../../../src/contexts/user/users-counter/domain/users.counter.repository'
import { UsersCounter } from '../../../../../src/contexts/user/users-counter/domain/users.counter'

export class UsersCounterRepositoryMock implements UsersCounterRepository {
  private mockSave = jest.fn()
  private mockSearch = jest.fn()
  private usersCounter: Nullable<UsersCounter> = null

  async search(): Promise<Nullable<UsersCounter>> {
    this.mockSearch()
    return this.usersCounter
  }

  async save(counter: UsersCounter): Promise<void> {
    this.mockSave(counter)
  }

  returnOnSearch(counter: UsersCounter) {
    this.usersCounter = counter
  }

  assertSearch() {
    expect(this.mockSearch).toHaveBeenCalled()
  }

  assertNotSave() {
    expect(this.mockSave).toHaveBeenCalledTimes(0)
  }

  assertLastUsersCounterSaved(counter: UsersCounter) {
    const mock = this.mockSave.mock
    const lastUsersCounter = mock.calls[mock.calls.length - 1][0] as UsersCounter
    const { id: id1, ...counterPrimitives } = counter.toPrimitives()
    const { id: id2, ...lastSavedPrimitives } = lastUsersCounter.toPrimitives()

    expect(lastUsersCounter).toBeInstanceOf(UsersCounter)
    expect(lastSavedPrimitives).toEqual(counterPrimitives)
  }
}

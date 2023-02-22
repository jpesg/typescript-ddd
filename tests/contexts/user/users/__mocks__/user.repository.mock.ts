import { type UserRepository } from '../../../../../src/contexts/user/users/domain/user.repository'
import { type User } from '../../../../../src/contexts/user/users/domain/user'

export class UserRepositoryMock implements UserRepository {
  private readonly saveMock: jest.Mock

  constructor() {
    this.saveMock = jest.fn()
  }

  async save(user: User): Promise<void> {
    this.saveMock(user)
  }

  assertSaveHaveBeenCalledWith(expected: User): void {
    expect(this.saveMock).toHaveBeenCalledWith(expected)
  }
}

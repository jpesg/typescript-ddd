import { type BackofficeUserRepository } from '../../../../../src/contexts/backoffice/users/domain/backoffice.user.repository'
import { type BackofficeUser } from '../../../../../src/contexts/backoffice/users/domain/backoffice.user'

export class BackofficeUserRepositoryMock implements BackofficeUserRepository {
  private mockSearchAll = jest.fn()
  private mockSave = jest.fn()
  private courses: BackofficeUser[] = []

  returnOnSearchAll(courses: BackofficeUser[]) {
    this.courses = courses
  }

  async searchAll(): Promise<BackofficeUser[]> {
    this.mockSearchAll()
    return this.courses
  }

  assertSearchAll() {
    expect(this.mockSearchAll).toHaveBeenCalled()
  }

  async save(course: BackofficeUser): Promise<void> {
    this.mockSave(course)
  }

  assertSaveHasBeenCalledWith(course: BackofficeUser) {
    expect(this.mockSave).toHaveBeenCalledWith(course)
  }
}

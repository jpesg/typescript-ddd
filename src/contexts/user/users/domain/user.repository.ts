import { type User } from './user'

export interface UserRepository {
  save: (user: User) => Promise<void>
  searchAll: () => Promise<User[]>
}

import { type BackofficeUser } from './backoffice.user'
import { type Criteria } from '../../../shared/domain/criteria/criteria'

export interface BackofficeUserRepository {
  save: (course: BackofficeUser) => Promise<void>
  searchAll: () => Promise<BackofficeUser[]>
  matching: (criteria: Criteria) => Promise<BackofficeUser[]>
}

import { type BackofficeUser } from '../../../../../src/contexts/backoffice/users/domain/backoffice.user'
import { BackofficeUsersResponse } from '../../../../../src/contexts/backoffice/users/application/search-all/backoffice.users.response'

export class SearchAllUsersUsersResponseMother {
  static create(courses: BackofficeUser[]) {
    return new BackofficeUsersResponse(courses)
  }
}

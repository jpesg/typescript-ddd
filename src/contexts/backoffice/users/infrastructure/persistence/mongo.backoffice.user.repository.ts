// import { type MongoClient } from 'mongodb'
import { MongoRepository } from '../../../../shared/infrastructure/persistence/mongo/mongo.repository'
import { BackofficeUser } from '../../domain/backoffice.user'
import { type BackofficeUserRepository } from '../../domain/backoffice.user.repository'
// import { type QueryBus } from '../../../../shared/domain/query.bus'
// import { type UsersResponse } from '../../../../user/users/application/search-all/users.response'
// import { SearchAllUsersQuery } from '../../application/search-all/search.all.users.query'
interface UserDocument {
  _id: string
  email: string
  password: string
}
export class MongoBackofficeUserRepository extends MongoRepository<BackofficeUser> implements BackofficeUserRepository {
  /* constructor(client: Promise<MongoClient> , private readonly queryBus: QueryBus) {
    super(client)
  } */

  public async save(course: BackofficeUser): Promise<void> {
    await this.persist(course.id.value, course)
  }

  protected collectionName(): string {
    return 'backoffice_courses'
  }

  public async searchAll(): Promise<BackofficeUser[]> {
    const collection = await this.collection()
    const documents = await collection.find<UserDocument>({}).toArray()

    return documents.map((document) =>
      BackofficeUser.fromPrimitives({ email: document.email, password: document.password, id: document._id })
    )
    /* const users = await this.queryBus.ask<UsersResponse>(new SearchAllUsersQuery())

    return users.users.map((user) =>
      BackofficeUser.fromPrimitives({ email: user.email, password: user.password, id: user.id })
    ) */
  }
}

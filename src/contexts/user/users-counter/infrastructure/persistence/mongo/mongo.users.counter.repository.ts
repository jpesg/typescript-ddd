import { UsersCounter } from '../../../domain/users.counter'
import { type UsersCounterRepository } from '../../../domain/users.counter.repository'
import { MongoRepository } from '../../../../../shared/infrastructure/persistence/mongo/mongo.repository'
import { type Nullable } from '../../../../../shared/domain/nullable'

interface UsersCounterDocument {
  _id: string
  total: number
  existingUsers: string[]
}

export class MongoUsersCounterRepository extends MongoRepository<UsersCounter> implements UsersCounterRepository {
  protected collectionName(): string {
    return 'usersCounter'
  }

  public async save(counter: UsersCounter): Promise<void> {
    await this.persist(counter.id.value, counter)
  }

  public async search(): Promise<Nullable<UsersCounter>> {
    const collection = await this.collection()

    const document = await collection.findOne<UsersCounterDocument>({})
    return document != null ? UsersCounter.fromPrimitives({ ...document, id: document._id }) : null
  }
}

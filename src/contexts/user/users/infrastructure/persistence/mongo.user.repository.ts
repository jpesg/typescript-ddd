import { MongoRepository } from '../../../../shared/infrastructure/persistence/mongo.repository'
import { type UserRepository } from '../../domain/user.repository'
import { User } from '../../domain/user'
import { type UserId } from '../../../shared/domain/users/user.id'
import { type Nullable } from '../../../../shared/doman/nullable'

interface UserDocument {
  _id: string
  name: string
  duration: string
}

export default class MongoUserRepository extends MongoRepository<User> implements UserRepository {
  public async save(user: User): Promise<void> {
    await this.persist(user.id.value, user)
  }

  public async search(id: UserId): Promise<Nullable<User>> {
    const collection = await this.collection()
    // @ts-expect-error
    const document = await collection.findOne<UserDocument>({ _id: id.value })

    return document != null
      ? User.fromPrimitives({ email: document.email, password: document.password, id: id.value })
      : null
  }

  protected collectionName(): string {
    return 'users'
  }
}

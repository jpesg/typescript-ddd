import { type UserRepository } from '../../domain/user.repository'
import { type User } from '../../domain/user'
import { type UserId } from '../../../shared/domain/users/user.id'
import { type Nullable } from '../../../../shared/doman/nullable'
import { type EntitySchema } from 'typeorm'
import { UserEntity } from './typeorm/user.entity'
import { TypeormRepository } from '../../../../shared/infrastructure/persistence/typeorm/typeorm.repository'

export class TypeormUserRepository extends TypeormRepository<User> implements UserRepository {
  public async save(user: User): Promise<void> {
    await this.persist(user)
  }

  public async search(_id: UserId): Promise<Nullable<User>> {
    const repository = await this.repository()
    return await repository.findOneBy({ id: _id.value })
  }

  protected entitySchema(): EntitySchema<User> {
    return UserEntity
  }
}

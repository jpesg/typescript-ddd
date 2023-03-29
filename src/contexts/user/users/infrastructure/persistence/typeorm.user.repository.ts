import { type UserRepository } from '../../domain/user.repository'
import { type User } from '../../domain/user'
import { type UserId } from '../../../shared/domain/users/user.id'
import { type EntitySchema } from 'typeorm'
import { UserEntity } from './typeorm/user.entity'
import { TypeormRepository } from '../../../../shared/infrastructure/persistence/typeorm/typeorm.repository'
import { type Nullable } from '../../../../shared/domain/nullable'

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

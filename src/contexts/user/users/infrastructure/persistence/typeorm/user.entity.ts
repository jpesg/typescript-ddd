import { EntitySchema } from 'typeorm'
import { User } from '../../../domain/user'
import { ValueObjectTransformer } from '../../../../../shared/infrastructure/persistence/typeorm/value.object.transformer'
import { UserId } from '../../../../shared/domain/users/user.id'
import { UserEmail } from '../../../domain/user.email'
import { UserPassword } from '../../../domain/user.password'

export const UserEntity = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  target: User,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(UserId),
    },
    password: {
      type: String,
      transformer: ValueObjectTransformer(UserPassword),
    },
    email: {
      type: String,
      transformer: ValueObjectTransformer(UserEmail),
    },
  },
})

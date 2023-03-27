import { type TypeOrmConfig } from '../../../../../shared/infrastructure/persistence/typeorm/typeorm.config'
import { userConfig as config } from '../../config'
const typeOrmConfig = config.typeOrm
export class TypeOrmConfigFactory {
  static createConfig(): TypeOrmConfig {
    return typeOrmConfig
  }
}

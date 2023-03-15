import { userConfig as config } from '../../config'
import { type MongoConfig } from '../../../../../shared/infrastructure/persistence/mongo.config'

const mongoConfig = config.mongo

export default class MongoConfigFactory {
  static createConfig(): MongoConfig {
    return mongoConfig
  }
}

import { DataSource } from 'typeorm'
import { type TypeOrmConfig } from './typeorm.config'

export class TypeOrmClientFactory {
  static async createClient(contextName: string, config: TypeOrmConfig): Promise<DataSource> {
    try {
      const dataSource = new DataSource({
        name: contextName,
        type: 'postgres',
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.database,
        // eslint-disable-next-line n/no-path-concat
        entities: [__dirname + '/../../../../**/**/infrastructure/persistence/typeorm/*{.js,.ts}'],
        synchronize: true,
        logging: true,
      })
      return await dataSource.initialize()
    } catch (error) {
      console.log('error', error)
      throw new Error(String(error))
    }
  }
}

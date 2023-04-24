import MongoClientFactory from '../../../../../../src/contexts/shared/infrastructure/persistence/mongo/mongo.client.factory'

export class RabbitMQMongoClientMother {
  static async create() {
    return await MongoClientFactory.createClient('shared', {
      user: 'root',
      password: 'root',
      database: 'test',
      server: 'localhost',
      port: '27017',
      authDb: 'admin',
    })
  }
}

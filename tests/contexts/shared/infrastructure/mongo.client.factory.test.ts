import { MongoClient } from 'mongodb'
import MongoClientFactory from '../../../../src/contexts/shared/infrastructure/persistence/mongo.client.factory'
import { type MongoConfig } from '../../../../src/contexts/shared/infrastructure/persistence/mongo.config'
import { userConfig } from '../../../../src/contexts/user/shared/infrastructure/config'

const config: MongoConfig = userConfig.mongo
describe('MongoClientFactory', () => {
  const factory = MongoClientFactory
  let client: MongoClient

  beforeEach(async () => {
    client = await factory.createClient('test', config)
  })

  afterEach(async () => {
    await client.close()
  })

  it('creates a new client with the connection already established', () => {
    expect(client).toBeInstanceOf(MongoClient)
  })

  it('creates a new client if it does not exist a client with the given name', async () => {
    const newClient = await factory.createClient('test2', { ...config, database: 'test-2' })

    expect(newClient).not.toBe(client)

    await newClient.close()
  })

  it('returns a client if it already exists', async () => {
    const newClient = await factory.createClient('test', { ...config, database: 'test-3' })

    expect(newClient).toBe(client)

    await newClient.close()
  })
})

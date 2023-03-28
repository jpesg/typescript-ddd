import { DataSource } from 'typeorm'
import { TypeOrmClientFactory } from '../../../../src/contexts/shared/infrastructure/persistence/typeorm/typeorm.client.factory'

describe('TypeOrmClientFactory', () => {
  const factory = TypeOrmClientFactory
  let client: DataSource

  beforeEach(async () => {
    client = await factory.createClient('test', {
      host: 'localhost',
      port: 5432,
      username: 'test',
      password: 'test',
      database: 'users-backend-dev',
    })
  })

  afterEach(async () => {
    await client.destroy()
  })

  it('creates a new client with the connection already established', () => {
    expect(client).toBeInstanceOf(DataSource)
    expect(client.isInitialized).toBe(true)
  })

  it('creates a new client if it does not exist a client with the given name', async () => {
    const newClient = await factory.createClient('test2', {
      host: 'localhost',
      port: 5432,
      username: 'test',
      password: 'test',
      database: 'users-backend-dev',
    })

    expect(newClient).not.toBe(client)
    expect(newClient.isInitialized).toBeTruthy()

    await newClient.destroy()
  })

  it('returns a client if it already exists', async () => {
    const newClient = await factory.createClient('test', {
      host: 'localhost',
      port: 5432,
      username: 'test',
      password: 'test',
      database: 'users-backend-dev',
    })

    expect(newClient).toBe(client)
    expect(newClient.isInitialized).toBeTruthy()
  })
})

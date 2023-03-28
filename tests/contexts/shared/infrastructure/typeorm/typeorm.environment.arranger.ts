import { EnvironmentArranger } from '../arranger/environment.arranger'
import { type DataSource, type EntityMetadata } from 'typeorm'

export default class TypeormEnvironmentArranger extends EnvironmentArranger {
  constructor(private _client: Promise<DataSource>) {
    super()
  }

  async arranger(): Promise<void> {
    await this.cleanDatabase()
  }

  async close(): Promise<void> {
    await (await this.client()).destroy()
  }

  protected async cleanDatabase() {
    const entities = await this.entities()

    try {
      for (const entity of entities) {
        const repository = (await this._client).getRepository(entity.name)
        await repository.query(`TRUNCATE TABLE ${entity.tableName};`)
      }
    } catch (error) {
      throw new Error(`Unable to clean test database: ${String(error)}`)
    }
  }

  private async entities(): Promise<EntityMetadata[]> {
    return (await this._client).entityMetadatas
  }

  protected async client() {
    return await this._client
  }
}

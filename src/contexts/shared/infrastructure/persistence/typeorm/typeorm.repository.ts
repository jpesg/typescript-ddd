import { type DataSource, type EntitySchema, type Repository } from 'typeorm'
import { type AggregateRoot } from '../../../doman/aggregate.root'

export abstract class TypeormRepository<T extends AggregateRoot> {
  constructor(private _client: Promise<DataSource>) {}

  protected abstract entitySchema(): EntitySchema<T>

  protected async client(): Promise<DataSource> {
    return await this._client
  }

  protected async repository(): Promise<Repository<T>> {
    const entity = this.entitySchema()
    return (await this._client).getRepository(entity)
  }

  protected async persist(aggregateRoot: T): Promise<void> {
    const repository = await this.repository()
    await repository.save(aggregateRoot as any)
  }
}

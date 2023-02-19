import { type UserRepository } from '../../domain/user.repository'
import { type User } from '../../domain/user'
import { BSON } from 'bson'
import fs from 'node:fs'
import path from 'node:path'

export class FileUserRespository implements UserRepository {
  private FILE_PATH = path.join(__dirname, 'courses')
  async save(user: User): Promise<void> {
    await fs.promises.writeFile(this.filePath(user.uuid), BSON.serialize(user))
  }

  private filePath(uuid: string) {
    return `${this.FILE_PATH}.${uuid}.repo`
  }
}

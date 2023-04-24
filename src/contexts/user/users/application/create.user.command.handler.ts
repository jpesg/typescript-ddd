import { type CommandHandler } from '../../../shared/domain/command.handler'
import { CreateUserCommand } from '../domain/create.user.command'
import { type Command } from '../../../shared/domain/command'
import { UserEmail } from '../domain/user.email'
import { UserPassword } from '../domain/user.password'
import type UserCreator from './user.creator'
import { UserId } from '../../shared/domain/users/user.id'

export class CreateUserCommandHandler implements CommandHandler<CreateUserCommand> {
  constructor(private userCreator: UserCreator) {}

  async handle(command: CreateUserCommand): Promise<void> {
    const id = new UserId(command.id)
    const email = new UserEmail(command.email)
    const password = new UserPassword(command.password)
    await this.userCreator.runCommand({ id, email, password })
  }

  subscribedTo(): Command {
    return CreateUserCommand
  }
}

import { type Command } from './command'

export interface CommandBus {
  dispatch: (command: Command) => Promise<void>
}

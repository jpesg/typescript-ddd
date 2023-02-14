import { Server } from './server'
export class UserBackendApp {
  server?: Server
  async start() {
    const port = process.env.PORT ?? '5000'
    this.server = new Server(port)
    await this.server.listen()
  }

  async stop() {
    return await this.server?.stop()
  }
}

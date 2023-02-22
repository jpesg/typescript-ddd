import { Server } from '../../shared/backend/server'
export class UserBackendApp {
  server?: Server
  async start() {
    const port = process.env.PORT ?? '5000'
    this.server = new Server(port)
    await this.server.listen()
  }

  get httpServer() {
    return this.server?.getHTTPServer()
  }

  async stop() {
    await this.server?.stop()
  }
}

import { Server } from '../../shared/backend/server'
import container from './dependency-injection'
import { type EventBus } from '../../../contexts/shared/domain/event.bus'
import { DomainEventSubscribers } from '../../../contexts/shared/infrastructure/event-bus/domain.event.subscribers'
export class UserBackendApp {
  server?: Server
  async start() {
    const port = process.env.PORT ?? '5000'
    this.server = new Server(port)
    await UserBackendApp.configureEventBus()
    await this.server.listen()
  }

  get httpServer() {
    return this.server?.getHTTPServer()
  }

  async stop() {
    await this.server?.stop()
  }

  private static async configureEventBus() {
    const eventBus = container.get<EventBus>('Uses.Shared.domain.EventBus')
    const subscribers = DomainEventSubscribers.from(container)
    eventBus.addSubscribers(subscribers)
  }
}

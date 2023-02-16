import express from 'express'
import type * as http from 'http'
import helmet from 'helmet'
import httpStatus from 'http-status'
import compression from 'compression'
import { registerRoutes } from './routes'

export class Server {
  private express: express.Express
  private readonly port: string
  private httpServer?: http.Server

  constructor(port: string) {
    this.port = port
    this.express = express()
    this.express.use(express.json())
    this.express.use(helmet.xssFilter())
    this.express.use(helmet.noSniff())
    this.express.use(helmet.hidePoweredBy())
    this.express.use(helmet.frameguard({ action: 'deny' }))
    this.express.use(compression())
    const router = express.Router()
    this.express.use(router)
    registerRoutes(router)

    router.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.log(err)
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
    })
  }

  async listen(): Promise<void> {
    await new Promise<void>((resolve) => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(
          `  Mock Backend App is running at http://localhost:${this.port} in ${this.express.get('env') as string} mode`
        )
        console.log('  Press CTRL-C to stop\n')
        resolve()
      })
    })
  }

  getHTTPServer() {
    return this.httpServer
  }

  async stop(): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      if (this.httpServer != null) {
        this.httpServer.close((error) => {
          if (error != null) {
            reject(error)
            return
          }
          resolve()
        })
      }
      resolve()
    })
  }
}

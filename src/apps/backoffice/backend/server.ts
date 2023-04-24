import bodyParser from 'body-parser'
import compress from 'compression'
import errorHandler from 'errorhandler'
import express, { type Request, type Response } from 'express'
import Router from 'express-promise-router'
import helmet from 'helmet'
import type * as http from 'http'
import httpStatus from 'http-status'

import container from './dependency-injection'
import { registerRoutes } from './routes'
import type Logger from '../../../contexts/shared/domain/logger'

export class Server {
  private express: express.Express
  readonly port: string
  private logger: Logger
  httpServer?: http.Server

  constructor(port: string) {
    this.port = port
    this.logger = container.get('Shared.Logger')
    this.express = express()
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: true }))
    this.express.use(helmet.xssFilter())
    this.express.use(helmet.noSniff())
    this.express.use(helmet.hidePoweredBy())
    this.express.use(helmet.frameguard({ action: 'deny' }))
    this.express.use(compress())
    const router = Router()
    router.use(errorHandler())
    this.express.use(router)
    registerRoutes(router)

    // eslint-disable-next-line @typescript-eslint/ban-types
    router.use((err: Error, req: Request, res: Response, next: Function) => {
      this.logger.error(err)
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
    })
  }

  async listen(): Promise<void> {
    await new Promise<void>((resolve) => {
      this.httpServer = this.express.listen(this.port, () => {
        this.logger.info(
          `  Backoffice Backend App is running at http://localhost:${this.port} in ${this.express.get('env')} mode`
        )
        this.logger.info('  Press CTRL-C to stop\n')
        resolve()
      })
    })
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

import type { Request, Response } from 'express'

export interface Controller {
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  run: <T>(req: Request, res: Response) => Promise<T | void>
}

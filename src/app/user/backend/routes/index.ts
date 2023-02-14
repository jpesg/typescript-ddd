import { type Router } from 'express'
import glob from 'glob'
import path from 'node:path'
export const registerRoutes = (router: Router) => {
  const pathname = path.join(__dirname, '/**/*.route.*').replace(/\\/g, '/')
  const routes = glob.sync(pathname)
  routes.map(register(router))
}
const register = (router: Router) => (routePath: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const route = require(routePath)
  route.register(router)
}

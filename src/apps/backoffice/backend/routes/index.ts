import { type Router } from 'express'
import glob from 'glob'

export function registerRoutes(router: Router) {
  // eslint-disable-next-line n/no-path-concat
  const routes = glob.sync(__dirname + '/**/*.route.*')
  // eslint-disable-next-line array-callback-return
  routes.map((route) => {
    register(route, router)
  })
}
const register = (routePath: string, app: Router) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const route = require(routePath)
  route.register(app)
}

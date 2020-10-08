import { RouteRecordRaw } from 'vue-router'
import routes from './playground/src/.generated/routes.json'

/** Flatten all routes */
function flatten(routes, resolver: Function) {
  return routes
    .map((route: RouteRecordRaw) =>
      route.children ? flatten(route.children, resolver) : resolver(route)
    )
    .flat(Infinity)
}

const ChakraPlaygroundPlugin = ({ app }) => {
  const routePaths = flatten(routes, (route) => route.path)
  app.use(async (ctx, next) => {
    if (routePaths.includes(ctx.path)) {
      ctx.path = './index.html'
    }
    await next()
  })
}

export default {
  configureServer: [ChakraPlaygroundPlugin],
}

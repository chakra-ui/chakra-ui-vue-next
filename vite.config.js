/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const resolver = require('./playground/src/.generated/resolver')
const routes = require('./playground/src/.generated/routes.json')
const { createServer } = require('vite')

function flatten(routes, resolver) {
  return routes
    .map((route) =>
      route.children ? flatten(route.children, resolver) : resolver(route)
    )
    .flat(Infinity)
}

const ChakraPlaygroundPlugin = ({ app }) => {
  const routePaths = flatten(routes, (route) => route.path)
  app.use(async (ctx, next) => {
    console.log(ctx.path)
    if (routePaths.includes(ctx.path)) {
      ctx.path = './index.html'
    }
    await next()
  })
}

const __DEV__ = process.env.NODE_ENV !== 'production'

createServer({
  alias: {
    ...(!__DEV__ && { ['@chakra-ui']: path.resolve(__dirname, './packages') }),
    ...(__DEV__ && resolver),
  },
  configureServer: [ChakraPlaygroundPlugin],
}).listen(9000)

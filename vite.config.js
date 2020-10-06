/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
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

createServer({
  alias: {
    '@chakra-ui': path.resolve(__dirname, './packages'),
  },
  configureServer: [ChakraPlaygroundPlugin],
}).listen(9000)

const { startDevServer } = require('@cypress/vite-dev-server')

module.exports = (on, config) => {
  on('dev-server:start', (options) => {
    const viteConfig = require('../../vite.config')
    viteConfig.esbuild = viteConfig.default.esbuild || {}
    viteConfig.esbuild.jsxFactory = 'h'
    viteConfig.esbuild.jsxFragment = 'Fragment'
    viteConfig.logLevel = 'error'

    on('task', {
      readFileMaybe(filename) {
        if (fs.existsSync(filename)) {
          return fs.readFileSync(filename, 'utf8')
        }

        return null
      },
    })

    return startDevServer({ options, viteConfig })
  })
  return config
}

import { resolve } from 'path'
import { exec } from 'child_process'
import chokidar from 'chokidar'
import consola from 'consola'

const logger = consola.withScope('chakra')

exec('yarn playground:routes')

const watcher = chokidar.watch('**/packages/**/examples/*.vue', {
  ignored: (path: string) => ['node_modules'].some((s) => path.includes(s)),
  persistent: true,
})

const events = ['add', 'unlink']
events.forEach((event) =>
  watcher.on(event, (path) => {
    logger.info(`Rebuilding routes for file ${event}ed: ${path}`)
    exec('yarn playground:routes')
  })
)

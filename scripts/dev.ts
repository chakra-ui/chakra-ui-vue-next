import * as ChakraComponents from '@chakra-ui/vue-next'
import { writeFileSync } from 'fs'
import { ensureFileSync } from 'fs-extra'
import { resolve } from 'path'

async function main() {
  const components = {}
  for (const prop in ChakraComponents) {
    if (prop.startsWith('C')) {
      components[prop] = ChakraComponents[prop]
    }
  }

  const OUT_PATH = resolve(__dirname, '../dev/components.json')
  ensureFileSync(OUT_PATH)

  writeFileSync(OUT_PATH, JSON.stringify(components, null, 2), {
    encoding: 'utf8',
  })
}

main()
  .then(() => console.log('Successfully generated components build'))
  .catch((error) => console.error('Error generating components', error))

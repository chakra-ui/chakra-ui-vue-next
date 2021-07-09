import App from './App.vue'
import viteSSR from 'vite-ssr'
import { createHead } from '@vueuse/head'
import routes from 'virtual:generated-pages'
import Chakra, { chakra } from '@chakra-ui/vue-next'
import { hydrate } from '@emotion/css'
import { domElements } from '@chakra-ui/vue-system'
import { extractCritical } from '@emotion/server'

/**
 *
 * @param html Page HTML
 * @param ids Array of critical ids to hydrate
 * @param css Critical CSS string
 */
const injectCritical = (html: string, ids: string[], css: string) =>
  html
    .replace(
      '</title>\n',
      `</title>\n<script>window.$emotionSSRIds=${JSON.stringify(
        ids
      )}</script>\n`
    )
    .replace('</head>\n', `<style>${css}</style>\n</head>\n`)

export default viteSSR(App, { routes }, ({ app, isClient }) => {
  /* custom logic */
  /* const { app, router, initialState, ... } = context */
  if (isClient) {
    // @ts-expect-error Need to add $emotionSSRIds to global namespace
    const ssrIds = window?.$emotionSSRIds || []
    hydrate(ssrIds)
  }

  const head = createHead()
  app.use(head)
  console.log({ app })

  /** Extract critical styles */
  // const { ids, css } = extractCritical(html)
  // /** Append ssr ids to rendered HTML for hydration */
  // return injectCritical(html, ids, css)

  app.use(Chakra)

  domElements.forEach((tag) => {
    app.component(`chakra.${tag}`, chakra(tag))
  })
})

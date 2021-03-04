import { UserConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { extractCritical } from '@emotion/server'
import Pages from 'vite-plugin-pages'

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

// https://vitejs.dev/config/
const config: UserConfig = {
  plugins: [Vue(), Pages()],
  // @ts-expect-error
  ssgOptions: {
    script: 'async',
    formatting: 'prettify',
    onPageRendered: (_, html) => {
      /** Extract critical styles */
      const { ids, css } = extractCritical(html)
      /** Append ssr ids to rendered HTML for hydration */
      return injectCritical(html, ids, css)
    },
  },
}

export default config

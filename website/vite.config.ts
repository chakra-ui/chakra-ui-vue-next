import { UserConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { extractCritical } from '@emotion/server'
import Pages from 'vite-plugin-pages'
import Markdown from 'vite-plugin-md'
import prism from 'markdown-it-prism'
import Icons from 'vite-plugin-icons'

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
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Pages({
      extensions: ['vue', 'md'],
    }),
    Markdown({
      markdownItUses: [prism],
    }),
    Icons(),
  ],
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

import { UserConfig } from 'vite'
import path from 'path'
import Vue from '@vitejs/plugin-vue'
import { extractCritical } from '@emotion/server'
import Pages from 'vite-plugin-pages'
import Icons from 'vite-plugin-icons'
import ViteComponents from 'vite-plugin-components'
import VueMdx from 'vite-plugin-mdx-vue'
import { componentResolver } from '@chakra-ui/vue-auto-import'

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
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}`,
    },
  },
  plugins: [
    Vue({ include: [/\.vue$/, /\.mdx$/] }),
    VueMdx({
      wrapperComponent: 'mdx-layout-wrapper',
    }),
    Pages({
      extensions: ['vue', 'mdx'],
    }),
    ViteComponents({
      // directories
      dirs: ['src/components', 'src/docs-theme'],
      // allow auto load markdown components under `dirs` (above)
      extensions: ['vue', 'mdx'],
      // allow auto import and register components used in markdown
      customLoaderMatcher: (path: string) => path.endsWith('.mdx'),
      // import chakra-ui components
      customComponentResolvers: [componentResolver],
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

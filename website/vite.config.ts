import { UserConfig } from 'vite'
import path from 'path'
import Vue from '@vitejs/plugin-vue'
import { extractCritical } from '@emotion/server'
import Pages from 'vite-plugin-pages'
import Icons from 'vite-plugin-icons'
import ViteComponents from 'vite-plugin-components'
import VueMdx from 'vite-plugin-mdx-vue'
import { componentResolver } from '@chakra-ui/vue-auto-import'
import { MdxComponents } from './src/docs-theme/components/MdxComponents'
import VueJsx from '@vitejs/plugin-vue-jsx'
import remarkGfm from 'remark-gfm'
// @ts-ignore
import remarkAutolinkHeadings from 'remark-autolink-headings'
// @ts-ignore
import remarkSlug from 'remark-slug'
import { remarkMdxCodeMeta } from 'remark-mdx-code-meta'

const getEditPageUrl = (resourcePath: string) => {
  const EDIT_PAGE_PATH =
    'https://github.com/chakra-ui/chakra-ui-vue-next/edit/develop/website/'
  const editUrl = EDIT_PAGE_PATH + resourcePath
  return editUrl
}

const getPageSlug = (resourcePath: string) => {
  const { dir, name } = path.parse(resourcePath)
  const dirPath = dir.replace('src/pages', '')
  const fullPath = path.join(...[dirPath, name])
  return fullPath
}

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
      vue: 'vue/dist/vue.esm-browser.js', // for vue-live editor
      '@': `${path.resolve(__dirname, 'src')}`,
    },
  },
  plugins: [
    Vue({ include: [/\.vue$/, /\.mdx$/] }),
    VueJsx(),
    VueMdx({
      wrapperComponent: 'mdx-layout-wrapper',
      mdxComponents: MdxComponents,
      xdmOptions: (vFile, options) => {
        // our plugins
        const customRemarkPlugins = [
          remarkGfm,
          remarkAutolinkHeadings,
          remarkSlug,
          remarkMdxCodeMeta,
        ]

        // extend default plugins instead of replace (since we want to keep frontmatter plugin etc.)
        options.remarkPlugins = options.remarkPlugins?.concat(
          customRemarkPlugins
        )
        return options
      },
      extendFrontmatter: {
        process: (_mdxContent, frontmatter) => {
          const editUrl = getEditPageUrl(frontmatter.__resourcePath)
          const slug = getPageSlug(frontmatter.__resourcePath)

          return {
            ...frontmatter,
            editUrl,
            slug,
          }
        },
      },
    }),
    Pages({
      extensions: ['vue', 'mdx'],
    }),
    ViteComponents({
      // directories
      dirs: ['src/components', 'src/docs-theme'],
      // allow auto load markdown components under `dirs` (above)
      extensions: ['vue', 'mdx', 'tsx'],
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

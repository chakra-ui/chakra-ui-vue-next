import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ComponentsPlugin from 'vite-plugin-components'
import Pages from 'vite-plugin-pages'
import kebabCase from 'lodash.kebabcase'
import path from 'path'

export default defineConfig({
  optimizeDeps: {
    exclude: ['@popperjs/core'],
  },
  plugins: [
    vue(),
    Pages({
      pagesDir: path.relative(__dirname, '../packages'),
      extensions: ['vue'],
      extendRoute(route, parent) {
        if (route.path === '/') {
          // Index is unauthenticated.
          return route
        }

        const [groupRaw] = route.name.split('-examples-')
        const [_, group] = groupRaw.split('c-')

        return {
          ...route,
          groupRaw,
          groupPath: `/${group}`,
          group,
        }
      },
    }),
    ComponentsPlugin({
      customComponentResolvers: [
        /**
         * Handle auto-imports from @chakra-ui/vue-next
         */
        (name: string) => {
          if (kebabCase(name).startsWith('c-'))
            return {
              importName: name,
              path: `@chakra-ui/vue-next`,
            }
        },
      ],
    }),
  ],
})

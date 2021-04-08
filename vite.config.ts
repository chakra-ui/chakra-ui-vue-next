import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ComponentsPlugin from 'vite-plugin-components'
import Pages from 'vite-plugin-pages'
import { componentResolver } from '@chakra-ui/vue-auto-import'
import path from 'path'
import { kebabCase } from 'lodash'

const resolver = {
  CIconButton: 'c-button',
  CButtonGroup: 'c-button',
  CModalOverlay: 'c-modal',
  CModalFocusScope: 'c-modal',
}

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
        (name: string) => {
          if (kebabCase(name).startsWith('c-'))
            return {
              importName: name,
              path: path.join(
                path.resolve(__dirname, './packages'),
                `${resolver[name] || kebabCase(name)}/src`
              ),
            }
        },
      ],
    }),
  ],
})

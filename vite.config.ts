import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ComponentsPlugin from 'vite-plugin-components'
import Pages from 'vite-plugin-pages'
import { componentResolver } from '@chakra-ui/vue-auto-import'
import path from 'path'
import { kebabCase } from 'lodash'

const resolver = {
  CAlertTitle: 'c-alert',
  CAlertDescription: 'c-alert',
  CAlertIcon: 'c-alert',
  CIconButton: 'c-button',
  CButtonGroup: 'c-button',
  CModalOverlay: 'c-modal',
  CModalFocusScope: 'c-modal',
  CModalContent: 'c-modal',
  CModalHeader: 'c-modal',
  CModalBody: 'c-modal',
  CModalFooter: 'c-modal',
  CModalCloseButton: 'c-modal',
}

const __DEV__ = process.env.NODE_ENV !== 'production'

export default defineConfig({
  optimizeDeps: {
    exclude: ['@popperjs/core', '@vueuse/core', '@vueuse/motion'],
  },
  server: {
    watch: {
      ignored: ['**/*snapshots*'],
    }
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
        !__DEV__
          ? componentResolver
          : (name: string) => {
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

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
  CMotion: 'c-motion',
  CAnimatePresence: 'c-motion',
  CModalOverlay: 'c-modal',
  CModalFocusScope: 'c-modal',
  CModalContent: 'c-modal',
  CModalHeader: 'c-modal',
  CModalBody: 'c-modal',
  CModalFooter: 'c-modal',
  CModalCloseButton: 'c-modal',
  CDrawer: 'c-modal',
  CDrawerOverlay: 'c-modal',
  CDrawerFocusScope: 'c-modal',
  CDrawerContent: 'c-modal',
  CDrawerHeader: 'c-modal',
  CDrawerBody: 'c-modal',
  CDrawerFooter: 'c-modal',
  CDrawerCloseButton: 'c-modal',
  CAlertDialog: 'c-modal',
  CAlertDialogOverlay: 'c-modal',
  CAlertDialogFocusScope: 'c-modal',
  CAlertDialogContent: 'c-modal',
  CAlertDialogHeader: 'c-modal',
  CAlertDialogBody: 'c-modal',
  CAlertDialogFooter: 'c-modal',
  CAlertDialogCloseButton: 'c-modal',
  CAspectRatio: 'layout',
  CBadge: 'layout',
  CBox: 'layout',
  CSquare: 'layout',
  CCircle: 'layout',
  CCenter: 'layout',
  CContainer: 'layout',
  CDivider: 'layout',
  CGrid: 'layout',
  CGridItem: 'layout',
  CHeading: 'layout',
  CLink: 'layout',
  CLinkOverlay: 'layout',
  CLinkBox: 'layout',
  CList: 'layout',
  COrderedList: 'layout',
  CUnorderedList: 'layout',
  CListItem: 'layout',
  CListIcon: 'layout',
  CKbd: 'layout',
  CSimpleGrid: 'layout',
  CSpacer: 'layout',
  CStackDivider: 'layout',
  CStackItem: 'layout',
  CStack: 'layout',
  CHStack: 'layout',
  CVStack: 'layout',
  CText: 'layout',
}

const __DEV__ = process.env.NODE_ENV !== 'production'

export default defineConfig({
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  build: {
    target: 'modules',
  },
  optimizeDeps: {
    exclude: ['@popperjs/core', '@vueuse/core', '@vueuse/motion'],
  },
  server: {
    watch: {
      ignored: ['**/*snapshots*'],
    },
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
                    !(process.env.NODE_ENV === 'production')
                      ? `${resolver[name] || kebabCase(name)}/src`
                      : '@chakra-ui/vue-next'
                  ),
                }
            },
      ],
    }),
  ],
})

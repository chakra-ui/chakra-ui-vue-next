import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ComponentsPlugin from 'vite-plugin-components'
import Pages from 'vite-plugin-pages'
import { componentResolver } from '@chakra-ui/vue-auto-import'
import path from 'path'

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
      customComponentResolvers: [componentResolver],
    }),
  ],
})

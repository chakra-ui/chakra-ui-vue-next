import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteSSR from 'vite-ssr/plugin.js'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components'
import { componentResolver } from '@chakra-ui/vue-auto-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteSSR(),
    Pages({
      pagesDir: 'src/pages',
      extensions: ['vue', 'ts', 'tsx'],
    }),
    Components({
      customComponentResolvers: [componentResolver],
    }),
  ],
})

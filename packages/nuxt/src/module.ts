import { fileURLToPath } from 'url'
import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addServerPlugin
} from '@nuxt/kit'

declare global {
  interface Window {
    /** Serialized SSR IDs for emotion */
    $emotionSSRIds: string[];
  }
}

export default defineNuxtModule({
  meta: {
    name: '@nuxtjs/emotion',
    configKey: 'emotion',
    compatibilty: '>=3.0.0'
  },
  setup (_, nuxt) {
    // ensure `nitro.plugins` is initialized
    nuxt.options.nitro.plugins = nuxt.options.nitro.plugins || []

    nuxt.hook('nitro:config', (config) => {
      // Prevent inlining emotion (+ the crucial css cache!) in dev mode
      if (nuxt.options.dev) {
        if (config.externals) {
          config.externals.external ||= []
          config.externals.external.push('@emotion/server')
        }
      }
    })

    /**
     * Register emotion plugin
     */
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = resolve('./runtime')
    nuxt.options.build.transpile.push(runtimeDir)
    addServerPlugin(resolve(runtimeDir, 'emotion.server'))
    addPlugin(resolve(runtimeDir, 'emotion.client'))
  }
})

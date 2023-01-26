import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addServerPlugin,
  installModule,
} from "@nuxt/kit"
import type * as NuxtSchema from "@nuxt/schema"

export default defineNuxtModule({
  meta: {
    name: "@chakra-ui/nuxt-nect",
    configKey: "chakra",
    compatibilty: ">=3.0.0",
  },
  setup(_, nuxt) {
    console.log("chakra-ui-nuxt:module")
    /**
     * Register emotion plugin
     */

    installModule("@nuxtjs/emotion")
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = resolve("./runtime")
    nuxt.options.build.transpile.push(runtimeDir)
    addServerPlugin(resolve(runtimeDir, "chakra.server"))
    addPlugin(resolve(runtimeDir, "chakra.client"))
  },
})

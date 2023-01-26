import type { NitroApp } from "nitropack"

/**
 * Why are we declaring types for  `defineNitroPlugin`?
 *
 * It appears that there is no way to import `defineNitroPlugin` from #imports
 * without TypeScript screaming. It might be that the `#imports` types are not
 * exported at project generation phase with `nuxi` CLI
 *
 * If this issue can be resolved, then this code can of course be deleted
 * and changed to the following:
 *
 * ```ts
 * import { defineNitroPlugin } from '#imports'
 * ```
 */

export type NitroAppPlugin = (nitro: NitroApp) => void

export function defineNitroPlugin(def: NitroAppPlugin): NitroAppPlugin {
  return def
}

export default defineNitroPlugin((nitroApp) => {
  console.log("chakra-ui-nuxt:server_runtime")
})
